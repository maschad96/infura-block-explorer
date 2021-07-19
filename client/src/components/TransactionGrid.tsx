import React from 'react';
import { useEffect } from 'react';
import { Transaction } from 'web3-core';
import { TransactionGridItem } from './TransactionGridItem';
const Web3 = require('web3');
const web3 = new Web3(
    new Web3.providers.WebsocketProvider(
        'wss://mainnet.infura.io/ws/v3/509e73fa03f342508dc48f829747cf7f'
    )
);

interface TransactionGridProps {
    transactions: string[];
}

export const TransactionGrid: React.FC<TransactionGridProps> = ({ transactions }) => {
    const [txns, setTxns] = React.useState<Transaction[]>([]);
    useEffect(() => {
        async function getTransactionData(transactions: string[]) {
            const batch = new web3.BatchRequest();
            const txns: Transaction[] = [];
            await new Promise<void>((resolve, reject) => {
                transactions.forEach((transaction) => {
                    batch.add(
                        web3.eth.getTransaction.request(
                            transaction,
                            (error: Error, data: Transaction) => {
                                if (error) return reject(error);
                                txns.push(data);
                                resolve();
                            }
                        )
                    );
                });
                batch.execute();
            });
            setTxns(txns);
            debugger;
        }
        getTransactionData(transactions);
    }, [transactions]);
    return (
        <div className="c-transaction-grid grid is-10-col">
            {txns.slice(0, 100).map((txn) => {
                return (
                    <TransactionGridItem
                        key={txn.hash}
                        from={txn.from}
                        to={txn.from}
                        value={txn.value}
                    />
                );
            })}
        </div>
    );
};

export default TransactionGrid;
