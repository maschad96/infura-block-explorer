import React from 'react';
import { useEffect } from 'react';
import { Transaction } from 'web3-core';
import { batchTransactions } from '../util/Web3BatchRequest';
import { LoadingSkeleton } from './LoadingSkeletons';
import { TransactionGridItem } from './TransactionGridItem';

interface TransactionGridProps {
    transactions: string[];
}

export const TransactionGrid: React.FC<TransactionGridProps> = ({ transactions }) => {
    const [txns, setTxns] = React.useState<Transaction[]>([]);
    useEffect(() => {
        (async () => {
            const txns = await batchTransactions(transactions);
            setTxns(txns);
        })();
    }, [transactions]);
    return (
        <>
            {txns.length < 1 ? (
                <LoadingSkeleton count={10} />
            ) : (
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
            )}
        </>
    );
};

export default TransactionGrid;
