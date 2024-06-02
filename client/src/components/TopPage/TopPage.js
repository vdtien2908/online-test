import { FaPlus } from 'react-icons/fa6';
import clsx from 'clsx';

// Style css
import style from './TopPage.module.scss';

// Component
import Button from '~/components/Button';

function TopPage({ title, textButton, onClick }) {
    return (
        <div className={clsx(style.wrapper)}>
            <h1 className={style.title}>{title}</h1>
            <Button primary leftIcon={<FaPlus />} onClick={onClick}>
                {textButton}
            </Button>
        </div>
    );
}

export default TopPage;
