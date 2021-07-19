import * as React from 'react';
import HeaderStatistic from './HeaderStatistic';

interface HeaderProps {
    blockNumber: number;
    gasPrice: number;
}

const Header: React.FC<HeaderProps> = ({ blockNumber, gasPrice }) => {
    return (
        <header className="c-header mb-3 grid is-4-col p-3">
            <HeaderStatistic label="Current Block" value={blockNumber} unit="" />
            <HeaderStatistic label="Average Gas Price" value={gasPrice} unit="gwei" />
            <HeaderStatistic label="Average Block Size" value={''} unit="mgas" />
            <HeaderStatistic label="Average Block Height" value={''} unit="mgas" />
        </header>
    );
};
export default Header;
