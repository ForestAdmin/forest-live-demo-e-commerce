import { pool } from './database';
import { faker } from '@faker-js/faker';

faker.setLocale('en_US');

/**
 * Populate sylius_address
 * @param string[]
 * @returns Promise<string[]>
 */
export async function populateWarehouses(): Promise<string[]> {
    const warehouseIds = [];

    return new Promise<string[]>((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }

            const deleteQuery = 'DELETE FROM warehouse';
            connection.query(deleteQuery, (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }

                const resetQuery = 'ALTER TABLE warehouse AUTO_INCREMENT = 1';
                connection.query(resetQuery, (error, results, fields) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    const warehousesInsertQueries = new Array<Promise<void>>();

                    for (let i = 0; i < 20; i++) {
                        const warehouse = {
                            name: faker.company.name(),
                            location: faker.address.cityName(),
                            surface: faker.random.numeric(8),
                            updated_at: faker.date.recent(60),
                        };

                        const insertWarehouseQuery = 'INSERT INTO warehouse SET ?';
                        const insertWarehousePromise = new Promise<void>((resolve, reject) => {
                            connection.query(insertWarehouseQuery, warehouse, (error, results, fields) => {
                                if (error) {
                                    reject(error);
                                    return;
                                }
                                warehouseIds.push((results as unknown as any).insertId.toString());
                                resolve();
                            });
                        });
                        warehousesInsertQueries.push(insertWarehousePromise);
                    }

                    Promise.all(warehousesInsertQueries)
                        .then(() => {
                            connection.release();
                            resolve(warehouseIds);
                        })
                        .catch((error) => {
                            connection.release();
                            reject(error);
                        });
                });
            });
        });
    });
}
