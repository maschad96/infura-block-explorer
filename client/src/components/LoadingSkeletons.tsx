import { faPlay } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

interface SkeletonProps {
    count?: number;
    width?: number;
}

const [color, highlightColor] = ['#6f689b', '#7b74a2'];

export const LoadingSkeleton = (props: SkeletonProps) => (
    <SkeletonTheme color={color} highlightColor={highlightColor}>
        <Skeleton {...props} />
    </SkeletonTheme>
);

export const SkeletonCard = () => (
    <div className="c-block-card p-1">
        <div className="c-block-card__header">
            <span className="c-block-card__header__block-number">
                <LoadingSkeleton width={40} />
            </span>
            <div className="c-block-card__header__time">
                <LoadingSkeleton width={50} />
            </div>
            <span className="c-block-card__header__transaction-count">
                <LoadingSkeleton width={10} />
            </span>
        </div>
        <div className="c-block-card__content">
            <LoadingSkeleton count={10} />
        </div>
        <div className="c-block-card__footer">
            <span className="c-block-card__footer__text">
                <LoadingSkeleton width={70} />
            </span>
            <FontAwesomeIcon icon={faPlay} />
        </div>
    </div>
);

export const SkeletonTransactions = () => {
    Array.from({ length: 10 }).map((_) => <LoadingSkeleton />);
};
