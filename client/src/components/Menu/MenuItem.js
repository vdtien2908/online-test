import Button from '~/components/Button';

function MenuItem({ data, onClick }) {
    return (
        <li>
            <Button leftIcon={data.icon} to={data.to} onClick={onClick}>
                {data.title}
            </Button>
        </li>
    );
}

export default MenuItem;
