import { pool } from './database';
import { faker } from '@faker-js/faker';

faker.setLocale('en_US');

/**
 * Populate sylius_order
 * @returns Promise<string[]>
 */
export async function populateOrders(customerIds: string[]): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }

            const orderIds = new Array<string>();

            const deleteQuery = 'DELETE FROM sylius_order';
            connection.query(deleteQuery, (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }

                const resetQuery = 'ALTER TABLE sylius_order AUTO_INCREMENT = 1';
                connection.query(resetQuery, (error, results, fields) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    const orderInsertQueries = new Array<Promise<void>>();

                    const state = ['New', 'Fulfilled'];
                    const owner = ['lionel.bouzonville@forestadmin.com', 'louis@forestadmin.com', 'steveb@forestadmin.com'];
                    for (let i = 0; i < 100; i++) {
                        const order = {
                            number: "3",
                            total: faker.commerce.price(),
                            state: faker.helpers.arrayElement(state),
                            owner: faker.helpers.arrayElement(owner),
                            customer_id: faker.helpers.arrayElement(customerIds),
                            created_at: faker.date.recent(60),
                            updated_at: faker.date.recent(60),
                        };

                        const insertOrderQuery = 'INSERT INTO sylius_order SET ?';
                        const insertOrderPromise = new Promise<void>((resolve, reject) => {
                            connection.query(insertOrderQuery, order, (error, results, fields) => {
                                if (error) {
                                    reject(error);
                                    return;
                                }
                                orderIds.push((results as unknown as any).insertId.toString());
                                resolve();
                            });
                        });
                        orderInsertQueries.push(insertOrderPromise);
                    }

                    Promise.all(orderInsertQueries)
                        .then(() => {
                            connection.release();
                            resolve(orderIds);
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
