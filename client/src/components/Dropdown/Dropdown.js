import * as primereact from 'primereact/dropdown';

import './Dropdown.scss';

function Dropdown({
    value,
    onChange,
    options,
    optionLabel,
    placeholder,
    className,
}) {
    return (
        <primereact.Dropdown
            value={value}
            onChange={onChange}
            options={options}
            optionLabel={optionLabel}
            placeholder={placeholder}
            className={className}
        />
    );
}

export default Dropdown;
