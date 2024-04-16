import TopPage from '~/components/TopPage';

// Component
import Wrapper from '~/components/Wrapper/Wrapper';

function Assignment() {
    return (
        <Wrapper>
            <TopPage
                title="Danh sách để phân công"
                textButton="Thêm phân công"
            />
        </Wrapper>
    );
}

export default Assignment;
