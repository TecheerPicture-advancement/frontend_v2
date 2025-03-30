const Onboarding6: React.FC = () => {
    return (
      <section className="flex justify-center items-center relative gap-32 mx-auto">
        <article className="flex flex-col justify-start items-start h-[530px] relative gap-12">
          <header>
            <h1 className="text-5xl font-PR_BL text-left text-black dark:text-white">
              사진을 영상으로
            </h1>
          </header>
          <div className="flex flex-col text-xl font-PR_M text-left">
            <p className="text-gray-400 dark:text-gray-100">
              제품 이미지는 있지만
            </p>
            <p className="text-gray-400 dark:text-gray-100">
              영상을 제작하기 어렵다면 걱정하지 마세요.
            </p>
            <p className="text-black dark:text-green-Light">
              이미지를 업로드하면
            </p>
            <p className="text-black dark:text-green-Light">
              AI가 자동으로 멋진 광고 영상을 만들어줍니다.
            </p>
          </div>
          <div className="flex flex-col text-xl font-PR_M text-left">
            <p className="text-gray-400 dark:text-gray-100">
              복잡한 편집 없이 원하는 이미지를 기반으로
            </p>
            <p className="text-gray-400 dark:text-gray-100">
              손쉽게 영상 콘텐츠를 생성할 수 있어
            </p>
            <p className="text-black dark:text-green-Light">
              효과적인 광고 영상을 빠르고
            </p>
            <p className="text-black dark:text-green-Light">
              간편하게 완성할 수 있습니다.
            </p>
          </div>
        </article>
        <figure className="w-[400px] h-[770px]">
          <video src="/assets/onboarding/soda.mp4" autoPlay muted loop className="rounded-3xl" />
        </figure>
      </section>
    );
  };
  
  export default Onboarding6;
  