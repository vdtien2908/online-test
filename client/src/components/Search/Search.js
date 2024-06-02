import clsx from 'clsx';
import { FaSistrix, FaX } from 'react-icons/fa6';

// Style css
import style from './Search.module.scss';

function Search({ placeholder, onChange, className, value, onClear }) {
    return (
        <div className={clsx(style.wrapper, className)}>
            {/* <DropDown /> */}
            <input
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
            {value === '' && <FaSistrix className={clsx(style.icon)} />}

            {value && (
                <FaX onClick={onClear} className={clsx(style.icon_clear)} />
            )}
        </div>
    );
}

export default Search;
