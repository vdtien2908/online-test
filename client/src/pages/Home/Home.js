import './Home.scss';

function Home() {
    return (
        <div className="card">
            <div className="card-item">
                <div className="card-item__icon"></div>
                <div className="card-item__desc">
                    <p className="desc__name">Môn học</p>
                    <p className="desc__price">0</p>
                </div>
            </div>
            <div className="card-item">
                <div className="card-item__icon">
                    <i className="fa-solid fa-user"></i>
                </div>
                <div className="card-item__desc">
                    <p className="desc__name">Câu hỏi</p>
                    <p className="desc__price">0</p>
                </div>
            </div>
            <div className="card-item">
                <div className="card-item__icon">
                    <i className="fa-solid fa-shop"></i>
                </div>
                <div className="card-item__desc">
                    <p className="desc__name">Sinh viên</p>
                    <p className="desc__price">0</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
