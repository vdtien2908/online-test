import TopPage from '~/components/TopPage';

// Component
import Wrapper from '~/components/Wrapper/Wrapper';

function User() {
    return (
        <Wrapper>
            <TopPage
                title="Danh sách người dùng"
                textButton="Thêm người dùng"
            />
        </Wrapper>
    );
}

export default User;
