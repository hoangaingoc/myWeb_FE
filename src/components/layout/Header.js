import React, { useContext } from 'react';
import { MyContext } from '../../MyContext';

export default function Header() {
    const { currentUser } = useContext(MyContext); // Get the user from context

    const defaultAvatar = 'https://res.cloudinary.com/hoangaingoc/image/upload/v1727143704/co-4-la-may-man-avatar-dep-18_pddawy.jpg';

    const getCurrentGreeting = (username) => {
        const currentHour = new Date().getHours();
        const nameToUse = username ? username : 'bạn';

        if (currentHour < 12) {
            return (
                <p style={{fontFamily:"Sofia"}}>
                    Chào {nameToUse} buổi sáng!<br />
                    Chúc bạn một ngày mới tràn đầy năng lượng.
                </p>
            );
        } else if (currentHour < 18) {
            return (
                <p style={{fontFamily:"Cursive"}}>
                    Chào {nameToUse} buổi chiều!<br />
                    Hy vọng bạn có một buổi chiều thật tuyệt vời.
                </p>
            );
        } else {
            return (
                <p style={{fontFamily:"Whisper"}}>
                    Chào {nameToUse} buổi tối!<br />
                    Chúc bạn một buổi tối thư giãn và yên bình.
                </p>
            );
        }
    };

    return (
        <header
            className="py-5 bg-light border-bottom mb-4"
            style={{
                backgroundImage: `url(https://res.cloudinary.com/hoangaingoc/image/upload/v1727588818/header_m3e8q5.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="container d-flex justify-content-between align-items-center">
                {currentUser && currentUser.data ? (
                    <div className="d-flex align-items-center">
                        <img
                            src={currentUser.data.image || defaultAvatar}
                            alt="Avatar"
                            className="rounded-circle"
                            style={{ width: '100px', height: '100px' }}
                        />
                        <h3 className="ms-3 fw-bold">
                            {getCurrentGreeting(currentUser.data.username)}
                        </h3>
                    </div>
                ) : (
                    <div className="d-flex align-items-center">
                        <img
                            src={defaultAvatar}
                            alt="Default Avatar"
                            className="rounded-circle"
                            style={{ width: '100px', height: '100px' }}
                        />
                        <h3 className="ms-3 fw-bold">
                            {getCurrentGreeting(null)}
                        </h3>
                    </div>
                )}
            </div>
        </header>
    );
}
