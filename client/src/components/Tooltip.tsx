import React, { useState } from 'react';

interface TooltipProps {
    delay: number;
    direction: 'top' | 'right' | 'bottom' | 'left';
    content: JSX.Element;
}

const Tooltip: React.FC<TooltipProps> = (props) => {
    let timeout: ReturnType<typeof setTimeout>;
    const [active, setActive] = useState(false);

    const showTip = () => {
        timeout = setTimeout(() => {
            setActive(true);
        }, props.delay || 400);
    };

    const hideTip = () => {
        clearInterval(timeout);
        setActive(false);
    };

    return (
        <div className="tooltip__wrapper" onMouseOver={showTip} onMouseOut={hideTip}>
            {props.children}
            {active && <div className={`tooltip ${props.direction || 'top'}`}>{props.content}</div>}
        </div>
    );
};

export default Tooltip;
