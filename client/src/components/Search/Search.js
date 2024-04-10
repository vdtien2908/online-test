import clsx from 'clsx';

// Style css
import style from './Search.module.scss';

function Search({ placeholder, onChange, className }) {
    return (
        <div className={clsx(style.wrapper, className)}>
            <input placeholder={placeholder} onChange={onChange} />
        </div>
    );
}

export default Search;
