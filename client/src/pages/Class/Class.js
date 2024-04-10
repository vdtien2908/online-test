import clsx from 'clsx';
import { FaPlus } from 'react-icons/fa6';
// Style css
import style from './Class.module.scss';

// Component
import Search from '~/components/Search';
import Button from '~/components/Button';
import Module from './Module';

function Class() {
    return (
        <div className={clsx(style.wrapper)}>
            {/* Start Head  */}
            <div className={style.head}>
                <div className={clsx(style.head_top)}>
                    <h1 className={style.head_title}>Danh sách lớp</h1>
                    <Button primary leftIcon={<FaPlus />}>
                        Tạo lớp học
                    </Button>
                </div>
                <div className={style.head_body}>
                    <Search
                        placeholder="Tìm kiếm lớp..."
                        className={clsx(style.search)}
                        onChange={(e) => {
                            console.log(e.target.value);
                        }}
                    />
                </div>
            </div>
            {/* End Head  */}

            {/* Start body */}
            <div className={style.body}>
                <Module />
            </div>
            {/* End body */}
        </div>
    );
}

export default Class;
