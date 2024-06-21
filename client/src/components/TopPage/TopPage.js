import { FaPlus } from 'react-icons/fa6';
import clsx from 'clsx';

import { useState } from 'react';

// Style css
import style from './TopPage.module.scss';

// Component
import Button from '~/components/Button';

function TopPage({ title, textButton, onClick }) {
    const [user, setUser] = useState(() =>
        JSON.parse(localStorage.getItem('user'))
    );

    return (
        <div className={clsx(style.wrapper)}>
            <h1 className={style.title}>{title}</h1>
            {user.RoleModel.id !== 2 && (
                <Button primary leftIcon={<FaPlus />} onClick={onClick}>
                    {textButton}
                </Button>
            )}
        </div>
    );
}

export default TopPage;
