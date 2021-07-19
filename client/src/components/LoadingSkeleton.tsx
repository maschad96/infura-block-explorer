import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

interface SkeletonProps {
    count?: number;
}

const LoadingSkeleton = ({ count }: SkeletonProps) => (
    <SkeletonTheme color="#6f689b" highlightColor="#7b74a2">
        <Skeleton count={count} />
    </SkeletonTheme>
);

export default LoadingSkeleton;
