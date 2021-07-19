import * as React from 'react';
import Header from '../components/Header';
import { range } from '../util/Numbers';
import { BlockTransactionString } from 'web3-eth';
import BlockGrid from '../components/BlockGrid';
import { SkeletonCard } from '../components/LoadingSkeletons';
import { batchBlocks } from '../util/Web3BatchRequest';
const Web3 = require('web3');

const web3 = new Web3(
    new Web3.providers.WebsocketProvider(
        'wss://mainnet.infura.io/ws/v3/509e73fa03f342508dc48f829747cf7f'
    )
);

interface HomepageState {
    currentBlock: number;
    gasPrice: number;
    blocks: BlockTransactionString[];
    loading: boolean;
}

export default class Homepage extends React.Component<{}, HomepageState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            currentBlock: 0,
            gasPrice: 0,
            blocks: [],
            loading: true,
        };
    }

    async componentDidMount() {
        const getGasAverage = async () => {
            const gas = await web3.eth.getGasPrice();
            const gwei = web3.utils.fromWei(gas, 'gwei');
            return parseInt(gwei, 10);
        };

        const subscription = web3.eth.subscribe('newBlockHeaders');
        subscription.on('data', async (data: any) => {
            this.setState({ currentBlock: data.number, gasPrice: await getGasAverage() });
        });

        // Get information on first load, rather than waiting for WebSocket message to be received
        const currentBlock = await web3.eth.getBlockNumber();
        const gasInGwei = await getGasAverage();
        const blockRange = range(12, currentBlock - 12);
        const blocks = await batchBlocks(blockRange);
        this.setState({ currentBlock, gasPrice: gasInGwei, blocks: blocks, loading: false });
    }

    render() {
        return (
            <div className="l-page">
                <Header blockNumber={this.state.currentBlock} gasPrice={this.state.gasPrice} />
                {this.state.blocks.length < 1 ? (
                    <div className="grid is-3-col ml-3 mr-3 mb-3">
                        {Array.from({ length: 12 }, (_, i) => (
                            <SkeletonCard />
                        ))}
                    </div>
                ) : (
                    <BlockGrid blocks={this.state.blocks} />
                )}
            </div>
        );
    }
}
