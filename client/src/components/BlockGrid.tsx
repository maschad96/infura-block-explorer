import * as React from 'react';
import { BlockTransactionString } from 'web3-eth';
import { BlockCard } from './BlockCard';

export default class BlockGrid extends React.Component<{ blocks: BlockTransactionString[] }> {
    render(): JSX.Element {
        return (
            <div className="grid is-3-col ml-3 mr-3 mb-3">
                {this.props.blocks.map((block, index) => {
                    return (
                        <BlockCard
                            key={`block-${index}`}
                            blockNumber={block.number}
                            transactions={block.transactions}
                            timestamp={block.timestamp}
                        />
                    );
                })}
            </div>
        );
    }
}
