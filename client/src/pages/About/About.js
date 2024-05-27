import React, { useRef } from 'react';
import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';
import {
    FaRightToBracket,
    FaRightLong,
    FaDownLong,
    FaDiceD6,
    FaRegSun,
    FaRightLeft,
    FaFacebook,
    FaFacebookMessenger,
} from 'react-icons/fa6';
import { Carousel } from 'primereact/carousel';

// Assets
import style from './About.module.scss';
import logo from '~/assets/images/icon.svg';
import banner from '~/assets/images/banner.png';
import landing_1 from '~/assets/images/landing_1.png';
import landing_2 from '~/assets/images/landing_2.png';
import landing_3 from '~/assets/images/landing_3.png';
import userVdt from '~/assets/images/userVdt.jpg';

// Component
import Image from '~/components/Image';
import Button from '~/components/Button';

function About() {
    const comments = [
        {
            content:
                'Nhờ có online test mà tôi đã tiết kiệm được rất nhiều thời gian trong việc quản lý lớp học của mình. Việc soạn bài, tạo các đề thi để cho học sinh thi chưa bao giờ đơn giản đến thế. Đặc biệt các bạn tư vấn và hỗ trợ rất nhiệt tình khi mình gặp vướng mắc.',
            author: {
                fullName: 'Vũ Đức Tiến',
                roleName: 'Sinh viên',
            },
        },
        {
            content:
                'Online test là một hệ thống tạo đề thi trắc nghiệm rất tiện lợi và hiệu quả cho giáo viên và học sinh. Giao diện trực quan và dễ sử dụng, tính năng tuỳ chỉnh linh hoạt, kết quả đánh giá chi tiết, tính năng lưu lại và tiếp tục làm bài kiểm tra là những điểm nổi bật của hệ thống này. Ngoài ra, hệ thống còn đảm bảo an toàn và bảo mật thông tin của người dùng. Tôi rất hài lòng với trải nghiệm của mình khi sử dụng hệ thống này.',
            author: {
                fullName: 'Nguyễn Văn A',
                roleName: 'Sinh viên',
            },
        },
    ];

    const commentTemplate = (comment) => {
        return (
            <div className={clsx(style.comment_box)}>
                <p className={clsx(style.comment_content)}>{comment.content}</p>
            </div>
        );
    };

    const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [ref4, inView4] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [ref5, inView5] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [ref6, inView6] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [ref7, inView7] = useInView({ triggerOnce: true, threshold: 0.1 });

    const utilSectionRef = useRef(null);

    const handleLearnMoreClick = () => {
        if (utilSectionRef.current) {
            utilSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={clsx(style.wrapper)}>
            {/* Header */}
            <div className={clsx(style.header)}>
                <div className={clsx(style.container)}>
                    <div className={clsx(style.header_container)}>
                        <div className={clsx(style.logo)}>
                            <Image src={logo} />
                            <p>
                                Online
                                <sup style={{ fontSize: 14 }}>TEST</sup>
                            </p>
                        </div>
                        <div>
                            <Button
                                leftIcon={<FaRightToBracket />}
                                primary
                                to={'/login'}
                            >
                                Đăng nhập
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Header */}

            {/* Banner */}
            <section className={clsx(style.banner)}>
                <div className={clsx(style.container)}>
                    <div
                        className={clsx(style.banner_container, style.fadeIn, {
                            [style.visible]: inView1,
                        })}
                        ref={ref1}
                    >
                        <div className={clsx(style.content)}>
                            <h1>
                                Hệ thống thi và tạo đề thi trắc nghiệm online
                                tốt nhất.
                            </h1>
                            <p>
                                Hỗ trợ bạn các chức năng tốt nhất để dễ dàng tạo
                                và quản lý ngân hàng câu hỏi, đề thi trắc
                                nghiệm, bài giảng. Tổ chức các kỳ thi online,
                                giao bài tập về nhà trên mọi nền tảng Web,
                                Mobile...
                            </p>
                            <div>
                                <Button
                                    leftIcon={<FaRightLong />}
                                    primary
                                    to="/login"
                                >
                                    Tham gia ngay
                                </Button>
                                <Button
                                    leftIcon={<FaDownLong />}
                                    outline
                                    onClick={handleLearnMoreClick}
                                >
                                    Tìm hiểu thêm
                                </Button>
                            </div>
                        </div>
                        <div className={clsx(style.img)}>
                            <Image src={banner} />
                        </div>
                    </div>
                </div>
            </section>
            {/* /Banner */}

            {/* Util section */}
            <section className={clsx(style.util)} ref={utilSectionRef}>
                <div className={clsx(style.container)}>
                    <div
                        className={clsx(style.util_container, style.fadeIn, {
                            [style.visible]: inView2,
                        })}
                        ref={ref2}
                    >
                        <div className={clsx(style.util_item)}>
                            <div className={style.img}>
                                <FaDiceD6 />
                            </div>
                            <h2>Lưu trạng thái khi gặp sự cố</h2>
                            <p>
                                Tính năng Lưu đáp án khi gặp sự cố giúp người
                                dùng bảo vệ kết quả bài kiểm tra trắc nghiệm một
                                cách dễ dàng và tiện lợi.
                            </p>
                        </div>
                        <div className={clsx(style.util_item)}>
                            <div className={style.img}>
                                <FaRegSun />
                            </div>
                            <h2>Tạo đề thi tự động</h2>
                            <p>
                                Giúp nâng cao chính xác và hiệu quả của quá
                                trình tạo đề thi, đồng thời tiết kiệm thời gian
                                và công sức cho người dùng.
                            </p>
                        </div>
                        <div className={clsx(style.util_item)}>
                            <div className={style.img}>
                                <FaRightLeft />
                            </div>
                            <h2>Phân loại câu hỏi</h2>
                            <p>
                                Đưa ra các câu hỏi phù hợp với nhu cầu của người
                                dùng, giúp tạo ra bài kiểm tra trắc nghiệm chất
                                lượng và hiệu quả.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* /Util section */}

            {/* Convenient section  */}
            <section className={clsx(style.convenient)}>
                <div className={clsx(style.container)}>
                    <div
                        className={clsx(
                            style.convenient_container,
                            style.fadeIn,
                            {
                                [style.visible]: inView3,
                            }
                        )}
                        ref={ref3}
                    >
                        <div className={clsx(style.content)}>
                            <h2>Dễ dàng tạo bài thi online</h2>
                            <p>
                                Hệ thống dễ dàng tạo đề thi với nhiều tuỳ chọn,
                                giúp giảng viên tạo đề thi nhanh chóng.
                            </p>
                            <ul>
                                <li>Tạo bài kiểm tra với nhiều dạng câu hỏi</li>
                                <li>Câu hỏi chọn 1 kết quả</li>
                                <li>Trả lời đoạn văn ngắn</li>
                                <li>
                                    Trả lời bằng cách upload file (Hình ảnh,
                                    word, video)
                                </li>
                            </ul>
                        </div>
                        <div className={clsx(style.img)}>
                            <Image src={landing_1} />
                        </div>
                    </div>
                </div>
            </section>
            {/* /Convenient section  */}

            {/* Convenient section reverse  */}
            <section className={clsx(style.convenient)}>
                <div className={clsx(style.container)}>
                    <div
                        className={clsx(
                            style.convenient_container,
                            style.reverse,
                            style.fadeIn,
                            {
                                [style.visible]: inView4,
                            }
                        )}
                        ref={ref4}
                    >
                        <div className={clsx(style.content)}>
                            <h2>
                                Lên trước lịch làm bài hoặc giới hạn thời gian
                                làm bài thi
                            </h2>
                            <p>
                                Bạn có thể cài đặt thời gian để học sinh chỉ làm
                                bài trong khung thời gian qui định:
                            </p>
                            <ul>
                                <li>Qui định thời gian cho bài làm</li>
                                <li>
                                    Qui định thời gian có thể bắt đầu làm bài
                                </li>
                                <li>
                                    Qui định thời gian kết thúc hiệu lực làm bài
                                </li>
                            </ul>
                        </div>
                        <div className={clsx(style.img)}>
                            <Image src={landing_2} />
                        </div>
                    </div>
                </div>
            </section>
            {/* /Convenient section  */}

            {/* Convenient section  */}
            <section className={clsx(style.convenient)}>
                <div className={clsx(style.container)}>
                    <div
                        className={clsx(
                            style.convenient_container,
                            style.fadeIn,
                            {
                                [style.visible]: inView5,
                            }
                        )}
                        ref={ref5}
                    >
                        <div className={clsx(style.content)}>
                            <h2>
                                Học sinh làm bài không cần cài đặt thêm ứng dụng
                            </h2>
                            <p>
                                Hệ thống tạo đề thi trắc nghiệm của chúng tôi
                                cho phép học sinh làm bài kiểm tra trực tuyến dễ
                                dàng mà không cần cài đặt thêm ứng dụng.
                            </p>
                            <ul>
                                <li>Bảo mật thông tin</li>
                                <li>
                                    Giao diện làm bài kiểm tra trực quan và dễ
                                    tương tác
                                </li>
                                <li>
                                    Giao diện tuỳ biến theo kích thước màn hình
                                </li>
                            </ul>
                        </div>
                        <div className={clsx(style.img)}>
                            <Image src={landing_3} />
                        </div>
                    </div>
                </div>
            </section>
            {/* /Convenient section  */}

            {/* Developer section */}
            <section className={clsx(style.developers)}>
                <div className={clsx(style.container)}>
                    <div
                        className={clsx(
                            style.developers_container,
                            style.fadeIn,
                            {
                                [style.visible]: inView6,
                            }
                        )}
                        ref={ref6}
                    >
                        <div className={clsx(style.developers_title)}>
                            <b>Đội ngũ</b> phát triển
                        </div>
                        <div className={clsx(style.developers_desc)}>
                            Tập trung vào chất lượng sản phẩm, cam kết hỗ trợ
                            khách hàng chuyên nghiệp và nhiệt tình.
                        </div>
                        <div className={clsx(style.developers_list)}>
                            <div className={clsx(style.developer)}>
                                <div className={clsx(style.img)}>
                                    <Image src={userVdt} />
                                </div>
                                <div className={clsx(style.content)}>
                                    <b>Vũ Đức Tiến</b>
                                    <p>2001024</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* /Developer section */}

            {/* Comments Section */}
            <section className={clsx(style.comment)}>
                <div className={clsx(style.container)}>
                    <div
                        className={clsx(style.comment_container, style.fadeIn, {
                            [style.visible]: inView7,
                        })}
                        ref={ref7}
                    >
                        <h2 className={clsx(style.comment_title)}>
                            Mọi người nói gì <b>về chúng tôi</b>
                        </h2>
                        <p className={clsx(style.comment_desc)}>
                            Luôn đồng hành và mang lại các trải nghiệm tốt nhất
                            cho người dùng.
                        </p>
                        <div className={clsx(style.comment_slider)}>
                            <div className="card">
                                <Carousel
                                    value={comments}
                                    numVisible={1}
                                    numScroll={1}
                                    itemTemplate={commentTemplate}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* /Comments Section */}

            {/* Footer */}
            <footer className={clsx(style.footer)}>
                <div className={clsx(style.container)}>
                    <div className={clsx(style.footer_container)}>
                        <div className={clsx(style.box)}>
                            <h2 className={clsx(style.title)}>Thông tin</h2>
                            <ul>
                                <li>
                                    <b>Chỉnh sách bảo mật</b>
                                </li>
                                <li>
                                    <b>Điều Khoản sử dụng</b>
                                </li>
                                <li>
                                    <b>Hướng dẫn</b>
                                </li>
                            </ul>
                        </div>
                        <div className={clsx(style.box)}>
                            <h2 className={clsx(style.title)}>Địa chỉ</h2>
                            <ul>
                                <li>
                                    Trường Đại học Kĩ Thuật - Công Nghệ Cần Thơ
                                </li>
                                <li>
                                    Đường Nguyễn Văn Cừ - Ninh Kiều - Cần Thơ
                                </li>
                            </ul>
                        </div>
                        <div className={clsx(style.box)}>
                            <h2 className={clsx(style.title)}>Kết nối</h2>
                            <ul>
                                <li>
                                    <FaFacebookMessenger />
                                    <FaFacebook />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={clsx(style.copyright)}>
                    Copyright © 2024 OnTestVN. All rights reserved.
                </div>
            </footer>
            {/* /Footer */}
        </div>
    );
}

export default About;
