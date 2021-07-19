import { Transaction } from 'web3-core';
import { BlockTransactionString } from 'web3-eth';
const Web3 = require('web3');

export const batchTransactions = async (txnHashes: string[]) => {
    const web3 = new Web3(
        new Web3.providers.WebsocketProvider(
            'wss://mainnet.infura.io/ws/v3/509e73fa03f342508dc48f829747cf7f'
        )
    );
    const batch = new web3.BatchRequest();
    const txns: Transaction[] = [];
    await new Promise<void>((resolve, reject) => {
        txnHashes.forEach((hash) => {
            batch.add(
                web3.eth.getTransaction.request(hash, (error: Error, data: Transaction) => {
                    if (error) return reject(error);
                    txns.push(data);
                    resolve();
                })
            );
        });
        batch.execute();
    });
    return txns;
};

export async function batchBlocks(blockNumbers: number[]) {
    const web3 = new Web3(
        new Web3.providers.WebsocketProvider(
            'wss://mainnet.infura.io/ws/v3/509e73fa03f342508dc48f829747cf7f'
        )
    );
    const blocks: BlockTransactionString[] = [];
    const batch = new web3.BatchRequest();
    await new Promise<void>((resolve, reject) => {
        blockNumbers.forEach((blockNumber) => {
            batch.add(
                web3.eth.getBlock.request(
                    blockNumber,
                    (error: Error, data: BlockTransactionString) => {
                        if (error) return reject(error);
                        blocks.push(data);
                        resolve();
                    }
                )
            );
        });
        batch.execute();
    });
    return blocks;
}
