import React from 'react';

const ProfileSection: React.FC = () => {
    return (
        <section className="flex flex-col justify-start items-start h-[507px] w-[380px] relative">
            <div className="flex justify-start items-center absolute gap-2.5 pl-[30px] pr-10 py-[30px] z-10">
                <img
                    className="w-10 h-10 rounded-full object-cover"
                    src="../../public/assets/logo.png"
                    alt="profile"
                />
                <span className="text-base font-bold text-white">TecheerPicture</span>
            </div>
            <div className="relative w-full h-full">
                <div
                    className="absolute w-full h-full mix-blend-multiply"
                    style={{
                        background: "linear-gradient(179.88deg, #111 0.23%, #fff 42.79%)",
                    }}
                />
                <img
                    src="../../public/assets/fan.jpg"
                    className="object-cover w-full h-full"
                    alt="result image"
                />
            </div>
        </section>
    );
};

export default ProfileSection;
