import React from 'react';
import logo from '../asset/img/infura-logo-white.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuItem } from '../types';
import {
    faTachometer,
    faFolder,
    faTh,
    faCog,
    faPowerOff,
    faBars,
} from '@fortawesome/pro-solid-svg-icons';

const topMenuItems: MenuItem[] = [
    { title: 'Dashboard', href: '#', icon: faTachometer },
    { title: 'Projects', href: '#', icon: faFolder },
    { title: 'Explorer', href: '/', icon: faTh },
];

const bottomMenuItems: MenuItem[] = [
    { title: 'Settings', href: '#', icon: faCog },
    { title: 'Logout', href: '#', icon: faPowerOff },
];

const renderSidebarMenuItems = (menuItems: MenuItem[]): React.ReactNode => (
    <ul className="c-sidebar__menu__list">
        {menuItems.map((item, index) => (
            <li className="c-sidebar__menu__list__item" key={index}>
                <a className="c-sidebar__menu__list__item__link" href={item.href}>
                    <FontAwesomeIcon icon={item.icon} />
                    <span className="c-sidebar__menu__list__item__title">{item.title}</span>
                </a>
            </li>
        ))}
    </ul>
);

const Sidebar: React.FunctionComponent = () => {
    const [isMobileMenuOpen, setOpen] = React.useState(false);

    return (
        <aside className="c-sidebar">
            <img className="c-sidebar__logo" src={logo} alt="Infura Logo" />
            <button
                className="c-sidebar__menu__toggle"
                type="button"
                aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                onClick={() => setOpen(!isMobileMenuOpen)}
            >
                <FontAwesomeIcon icon={faBars} />
            </button>
            <nav className={`c-sidebar__menu ${isMobileMenuOpen ? 'c-sidebar__menu--open' : ''}`}>
                {renderSidebarMenuItems(topMenuItems)}
                {renderSidebarMenuItems(bottomMenuItems)}
            </nav>
        </aside>
    );
};

export default Sidebar;
