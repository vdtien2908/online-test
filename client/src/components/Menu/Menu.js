import clsx from 'clsx';
import Tippy from '@tippyjs/react/headless'; // different import path!
import 'tippy.js/dist/tippy.css'; // optional

// Style css
import style from './Menu.module.scss';

// Component
import MenuItem from './MenuItem';

function Menu({ children, items = [], placement = 'bottom-end', offset }) {
    const renderItem = () => {
        return items.map((item, key) => {
            return <MenuItem key={key} data={item} />;
        });
    };

    return (
        <Tippy
            trigger={'click'}
            placement={placement}
            interactive
            popperOptions={
                offset && {
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [8, -6],
                            },
                        },
                    ],
                }
            }
            render={(attrs) => (
                <div tabIndex="-1" className={clsx(style.menu)}>
                    <ul>{renderItem()}</ul>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
