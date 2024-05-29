import Button from '~/components/Button';

function MenuItem({ data }) {
    return (
        <li>
            <Button leftIcon={data.icon} to={data.to} onClick={data.onClick}>
                {data.title}
            </Button>
        </li>
    );
}

export default MenuItem;
