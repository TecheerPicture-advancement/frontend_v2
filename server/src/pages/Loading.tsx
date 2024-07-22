import { useEffect, useState } from 'react';

const Loading = () => {
  const [loading, setLoading] = useState(true);
  const [tipIndex, setTipIndex] = useState(0);

  const tips = [
    "Tip. 설명이 자세할 수록 원하는 사진이 나올 확률이 올라갑니다!",
    "Tip. 누끼 사진 생성 후 배경을 바로 만들 수 있습니다!",
    "Tip. AI생성으로 더 멋진사진을 만들어보세요!",
    "Tip. 배너 생성시 매력적인 문장을 직접 만들어보세요!",
    "Tip. 심플 이미지 생성시 누끼 이미지가 함께 생성됩니다.",
    "Tip. 원하는 테마가 없다면 직접입력 테마에서 새로운 이미지를 생성하세요!"
  ];

  // Function to shuffle the tips array
  const shuffleTips = (tipsArray: string[]) => {
    let shuffled = [...tipsArray];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const shuffledTips = shuffleTips(tips);

  useEffect(() => {
    // Simulate a loading delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 10000);

    // Change tip every 5 seconds
    const interval = setInterval(() => {
      setTipIndex((prevIndex) => (prevIndex + 1) % shuffledTips.length);
    }, 4000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [shuffledTips.length]);

  const Loader = () => {
    return (
      <div className="loader">
        <div className="blade"></div>
        <div className="blade"></div>
        <div className="blade"></div>
        <div className="blade"></div>
        <div className="blade"></div>
        <div className="blade"></div>
        <div className="blade"></div>
        <div className="blade"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center text-white">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center mb-[25px] bg-opacity-0">
          <Loader />
        </div>
      )}
      <svg
        width={265}
        height={202}
        viewBox="0 0 265 202"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[230px] h-[174px]"
        preserveAspectRatio="none"
      >
       <path
      d="M249.226 37.875H201.905C189.746 37.875 189.298 26.5314 189.286 25.25V18.9375C189.286 10.9964 180.515 0 164.048 0H101.148C82.6295 0 75.9099 11.3246 75.9099 18.9375V25.2121C75.9036 25.7297 75.607 37.875 63.0952 37.875H15.7738C11.5919 37.88 7.58265 39.5443 4.62557 42.5028C1.6685 45.4612 0.00500931 49.4723 0 53.6562L0 167.281C0 175.98 7.07298 183.062 15.7738 183.062H53.631C54.4676 183.062 55.2701 182.73 55.8617 182.138C56.4533 181.546 56.7857 180.743 56.7857 179.906C56.7857 179.069 56.4533 178.266 55.8617 177.674C55.2701 177.083 54.4676 176.75 53.631 176.75H15.7738C10.5558 176.75 6.30952 172.502 6.30952 167.281V88.375H56.7857C52.6093 98.3725 50.4645 109.102 50.4762 119.938C50.4762 165.186 87.2733 202 132.5 202C177.727 202 214.524 165.186 214.524 119.938C214.524 108.758 212.259 98.0963 208.195 88.375H258.69V167.281C258.69 172.502 254.444 176.75 249.226 176.75H205.06C204.223 176.75 203.42 177.083 202.829 177.674C202.237 178.266 201.905 179.069 201.905 179.906C201.905 180.743 202.237 181.546 202.829 182.138C203.42 182.73 204.223 183.062 205.06 183.062H249.226C257.927 183.062 265 175.98 265 167.281V53.6562C265 44.9576 257.927 37.875 249.226 37.875ZM132.5 195.688C90.7499 195.688 56.7857 161.707 56.7857 119.938C56.7857 78.1677 90.7499 44.1875 132.5 44.1875C174.25 44.1875 208.214 78.1677 208.214 119.938C208.214 161.707 174.25 195.688 132.5 195.688ZM206.637 82.0625C206.187 82.0657 205.744 82.1669 205.337 82.3592C191.683 55.9792 164.186 37.875 132.5 37.875C100.814 37.875 73.3167 55.9792 59.6629 82.3592C59.2563 82.1669 58.8128 82.0657 58.3631 82.0625H6.30952V53.6562C6.30952 48.4358 10.5558 44.1875 15.7738 44.1875H63.0952C78.0362 44.1875 82.1437 31.8276 82.2194 25.25V18.9375C82.2194 13.8622 87.2607 6.3125 101.148 6.3125H164.048C177.26 6.3125 182.976 14.6702 182.976 18.9375V25.25C182.976 31.8024 186.932 44.1875 201.905 44.1875H249.226C254.444 44.1875 258.69 48.4358 258.69 53.6562V82.0625H206.637Z"
      fill="white"
    />
    <path
      d="M59.9404 31.5625C60.7771 31.5625 61.5795 31.23 62.1711 30.6381C62.7628 30.0461 63.0951 29.2433 63.0951 28.4062V22.0938C63.0951 16.8733 58.8488 12.625 53.6308 12.625H28.3928C23.1748 12.625 18.9285 16.8733 18.9285 22.0938V28.4062C18.9285 29.2433 19.2608 30.0461 19.8525 30.6381C20.4441 31.23 21.2465 31.5625 22.0832 31.5625C22.9199 31.5625 23.7223 31.23 24.314 30.6381C24.9056 30.0461 25.238 29.2433 25.238 28.4062V22.0938C25.238 21.2567 25.5704 20.4539 26.162 19.8619C26.7536 19.27 27.5561 18.9375 28.3928 18.9375H53.6308C54.4675 18.9375 55.27 19.27 55.8616 19.8619C56.4532 20.4539 56.7856 21.2567 56.7856 22.0938V28.4062C56.7856 29.2433 57.118 30.0461 57.7096 30.6381C58.3013 31.23 59.1037 31.5625 59.9404 31.5625ZM132.5 63.125C101.186 63.125 75.7142 88.6149 75.7142 119.938C75.7142 151.26 101.186 176.75 132.5 176.75C163.814 176.75 189.286 151.26 189.286 119.938C189.286 88.6149 163.814 63.125 132.5 63.125ZM132.5 170.438C104.669 170.438 82.0237 147.782 82.0237 119.938C82.0237 92.0931 104.669 69.4375 132.5 69.4375C160.331 69.4375 182.976 92.0931 182.976 119.938C182.976 147.782 160.331 170.438 132.5 170.438Z"
      fill="white"
    />
      </svg>
      <p className="mt-[30px] text-center text-lg font-bold">생성중</p>
      <p className="absolute bottom-28 text-sm font-medium text-center w-full">
        {shuffledTips[tipIndex]}
      </p>
    </div>
  );
};

export default Loading;
