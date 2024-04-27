import clsx from 'clsx';
import { FaSistrix } from 'react-icons/fa6';
// Style css
import style from './Search.module.scss';

function Search({ placeholder, onChange, className }) {
    return (
        <div className={clsx(style.wrapper, className)}>
            {/* <DropDown /> */}
            <input placeholder={placeholder} onChange={onChange} />
            <FaSistrix className={clsx(style.icon)} />
        </div>
    );
}

export default Search;
