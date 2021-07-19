import React from 'react';
import { LoadingSkeleton } from './LoadingSkeletons';
import { formatThreeDigitNumber } from '../util/Numbers';
interface HeaderStatisticProps {
    label: string;
    value: number | string;
    unit: string;
}

const HeaderStatistic: React.FC<HeaderStatisticProps> = ({
    label,
    value,
    unit,
}: HeaderStatisticProps) => {
    value = formatThreeDigitNumber(value);
    return (
        <div className="c-header__statistic">
            <span className="c-header__statistic__label">{label}</span>
            <span className="c-header__statistic__value">
                {value.length > 1 ? value : <LoadingSkeleton />}
            </span>
            {value.length > 1 && unit && <span className="c-header__statistic__unit">{unit}</span>}
        </div>
    );
};

export default HeaderStatistic;
