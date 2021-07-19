import * as React from 'react';
import Tooltip from './Tooltip';
const Web3 = require('web3');

interface TransactionProps {
    from: string;
    to: string;
    value: string;
}

export const TransactionGridItem: React.FC<TransactionProps> = ({ from, to, value }) => {
    const trimAddress = (address: string) => {
        const beginning = address.substr(0, 6);
        const end = address.substr(address.length - 4);
        return `${beginning}...${end}`;
    };
    return (
        <Tooltip
            delay={0}
            direction="right"
            content={
                <>
                    <div className="tooltip__top grid is-2-col mb-1">
                        <div>
                            <span className="tooltip__label">From</span>
                            <span className="tooltip__text">{trimAddress(from)}</span>
                        </div>
                        <div>
                            <span className="tooltip__label">To</span>
                            <span className="tooltip__text">{trimAddress(to)}</span>
                        </div>
                    </div>
                    <div className="tooltip__bottom">
                        <span className="tooltip__label">Value</span>
                        <span className="tooltip__text">
                            {Web3.utils.fromWei(value, 'ether')} ETH
                        </span>
                    </div>
                </>
            }
        >
            <div className="c-transaction-grid__square"></div>
        </Tooltip>
    );
};
