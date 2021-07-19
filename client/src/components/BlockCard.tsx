import { faPlay } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { timeDifferenceInMinutesAndSeconds } from '../util/DateTime';
import { formatThreeDigitNumber } from '../util/Numbers';
import { TransactionGrid } from './TransactionGrid';

interface BlockProps {
    blockNumber: number;
    transactions: string[];
    timestamp: number | string;
}

// function component called BlockCard
export const BlockCard: React.FC<BlockProps> = React.memo(
    ({ blockNumber, transactions, timestamp }) => {
        const { minutes, seconds } = timeDifferenceInMinutesAndSeconds(timestamp as number);
        return (
            <div className="c-block-card p-1">
                <div className="c-block-card__header">
                    <span className="c-block-card__header__block-number">
                        #{formatThreeDigitNumber(blockNumber)}
                    </span>
                    <div className="c-block-card__header__time">
                        mined {minutes}m {seconds}s ago
                    </div>
                    <span className="c-block-card__header__transaction-count">
                        {transactions.length} TXs
                    </span>
                </div>
                <div className="c-block-card__content">
                    <TransactionGrid transactions={transactions} />
                </div>
                {transactions.length > 100 ? (
                    <div className="c-block-card__footer">
                        <span className="c-block-card__footer__text">
                            {transactions.length - 100} more tx
                        </span>
                        <Link to={`/blocks/${blockNumber}`} className="c-block-card__footer__link">
                            <FontAwesomeIcon icon={faPlay} />
                        </Link>
                    </div>
                ) : (
                    ''
                )}
            </div>
        );
    }
);

export default BlockCard;
