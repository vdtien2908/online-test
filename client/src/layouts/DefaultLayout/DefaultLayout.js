import { useState } from 'react';

import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import style from './DefaultLayout.module.scss';

import { clsx } from 'clsx';

function DefaultLayout({ children }) {
    const [isActiveSidebar, setIsActiveSidebar] = useState(false);

    const handleOpenSidebar = () => {
        setIsActiveSidebar(!isActiveSidebar);
    };

    return (
        // Wrapper
        <div className={clsx(style.wrapper)}>
            {/* Header */}
            <Header onClick={handleOpenSidebar} />
            {/* /Header */}

            <div className={clsx(style.container)}>
                {/* Left container */}
                <div className={clsx(style.leftContainer)}>
                    {/* Sidebar */}
                    <Sidebar isActive={isActiveSidebar} />
                    {/* Sidebar */}
                </div>
                {/* /Left container */}

                {/* Right container */}
                <div className={clsx(style.rightContainer)}>
                    {/* Content */}
                    <div
                        className={clsx(style.content, {
                            [style.active]: isActiveSidebar,
                        })}
                    >
                        <div className={clsx(style.content_container)}>
                            {children}
                        </div>
                    </div>
                    {/* /Content */}
                </div>
                {/* /Right container */}
            </div>
        </div>
        // /Wrapper
    );
}

export default DefaultLayout;
