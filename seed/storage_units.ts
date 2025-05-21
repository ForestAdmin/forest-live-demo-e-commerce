import { pool } from './database';
import { faker } from '@faker-js/faker';

faker.setLocale('en_US');

/**
 * Populate sylius_address
 * @param string[]
 * @returns Promise<string[]>
 */
export async function populateStorageUnits(warehouseIds, productIds): Promise<string[]> {
    const storageUnitIds = [];

    return new Promise<string[]>((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }

            const deleteQuery = 'DELETE FROM storage_unit';
            connection.query(deleteQuery, (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }

                const resetQuery = 'ALTER TABLE storage_unit AUTO_INCREMENT = 1';
                connection.query(resetQuery, (error, results, fields) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    const storageUnitsInsertQueries = new Array<Promise<void>>();

                    for (let i = 0; i < 150; i++) {
                        const storageUnit = {
                            warehouse_id: faker.helpers.arrayElement(warehouseIds),
                            aisle: faker.random.alphaNumeric(1),
                            row: faker.random.alphaNumeric(1),
                            box: faker.random.alphaNumeric(1),
                            product_id: faker.helpers.arrayElement(productIds),
                            quantity: faker.random.numeric(3),
                            is_flagged: faker.helpers.arrayElement([true, false]),
                            storage_type: faker.helpers.arrayElement(['free', 'bags', 'boxes', 'palets']),
                            updated_at: faker.date.recent(60),
                        };

                        const insertWarehouseQuery = 'INSERT INTO storage_unit SET ?';
                        const insertWarehousePromise = new Promise<void>((resolve, reject) => {
                            connection.query(insertWarehouseQuery, storageUnit, (error, results, fields) => {
                                if (error) {
                                    reject(error);
                                    return;
                                }
                                storageUnitIds.push((results as unknown as any).insertId.toString());
                                resolve();
                            });
                        });
                        storageUnitsInsertQueries.push(insertWarehousePromise);
                    }

                    Promise.all(storageUnitsInsertQueries)
                        .then(() => {
                            connection.release();
                            resolve(storageUnitIds);
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
