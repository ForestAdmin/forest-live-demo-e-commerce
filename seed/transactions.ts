import { pool } from './database';
import { faker } from '@faker-js/faker';

faker.setLocale('en_US');

/**
 * Populate sylius_address
 * @param string[]
 * @returns Promise<string[]>
 */
export async function populateTransactions(orderIds, customerIssueIds): Promise<string[]> {
    const transactionIds = [];

    return new Promise<string[]>((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }

            const deleteQuery = 'DELETE FROM transaction';
            connection.query(deleteQuery, (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }

                const resetQuery = 'ALTER TABLE transaction AUTO_INCREMENT = 1';
                connection.query(resetQuery, (error, results, fields) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    const transactionsInsertQueries = new Array<Promise<void>>();

                    orderIds.forEach(orderId => {
                        const transaction = {
                            amount: faker.commerce.price(),
                            type: 'payment',
                            status: faker.helpers.arrayElement(['completed', 'pending', 'errored']),
                            order_id: orderId,
                            updated_at: faker.date.recent(60),
                        };

                        const insertTransactionQuery = 'INSERT INTO transaction SET ?';
                        const insertTransactionPromise = new Promise<void>((resolve, reject) => {
                            connection.query(insertTransactionQuery, transaction, (error, results, fields) => {
                                if (error) {
                                    reject(error);
                                    return;
                                }
                                transactionIds.push((results as unknown as any).insertId.toString());
                                resolve();
                            });
                        });
                        transactionsInsertQueries.push(insertTransactionPromise);
                    });

                    customerIssueIds.forEach(customerIssueId => {
                        const transaction = {
                            amount: faker.commerce.price(),
                            type: 'refund',
                            status: faker.helpers.arrayElement(['completed', 'pending', 'errored']),
                            customer_issue_id: customerIssueId,
                        };

                        const insertTransactionQuery = 'INSERT INTO transaction SET ?';
                        const insertTransactionPromise = new Promise<void>((resolve, reject) => {
                            connection.query(insertTransactionQuery, transaction, (error, results, fields) => {
                                if (error) {
                                    reject(error);
                                    return;
                                }
                                transactionIds.push((results as unknown as any).insertId.toString());
                                resolve();
                            });
                        });
                        transactionsInsertQueries.push(insertTransactionPromise);
                    })

                    Promise.all(transactionsInsertQueries)
                        .then(() => {
                            connection.release();
                            resolve(transactionIds);
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
