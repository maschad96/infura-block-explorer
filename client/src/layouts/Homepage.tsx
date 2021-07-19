import * as React from 'react';
import Header from '../components/Header';
import Web3 from 'web3';
import { range } from '../util/Numbers';
import { BlockTransactionString } from 'web3-eth';
import BlockGrid from '../components/BlockGrid';

const web3 = new Web3(
    new Web3.providers.WebsocketProvider(
        'wss://mainnet.infura.io/ws/v3/509e73fa03f342508dc48f829747cf7f'
    )
);

interface HomepageState {
    currentBlock: number;
    gasPrice: number;
    blocks: BlockTransactionString[];
}

async function getBlocks(blockNumbers: number[]) {
    const blocks: BlockTransactionString[] = [];
    blockNumbers.forEach(async (blockNumber) => {
        const block = await web3.eth.getBlock(blockNumber);
        blocks.push(block);
    });
    return blocks;
}

export default class Homepage extends React.Component<{}, HomepageState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            currentBlock: 0,
            gasPrice: 0,
            blocks: [],
        };
    }

    async componentDidMount() {
        const subscription = web3.eth.subscribe('newBlockHeaders', (error, result) => {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
            }
        });

        const getGasAverage = async () => {
            const gas = await web3.eth.getGasPrice();
            const gwei = web3.utils.fromWei(gas, 'gwei');
            return parseInt(gwei, 10);
        };

        subscription.on('data', async (data) => {
            this.setState({ currentBlock: data.number, gasPrice: await getGasAverage() });
        });

        // Get information on first load, rather than waiting for WebSocket message to be received
        const currentBlock = await web3.eth.getBlockNumber();
        const gasInGwei = await getGasAverage();
        const blockRange = range(12, currentBlock - 12);
        const blocks = await getBlocks(blockRange);
        this.setState({ currentBlock, gasPrice: gasInGwei, blocks });
    }

    render() {
        return (
            <div className="l-page">
                <Header blockNumber={this.state.currentBlock} gasPrice={this.state.gasPrice} />
                <BlockGrid blocks={this.state.blocks} />
            </div>
        );
    }
}
