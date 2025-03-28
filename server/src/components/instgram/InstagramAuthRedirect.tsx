import { useEffect } from "react";

const InstagramAuthRedirect = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    const userId = urlParams.get("user_id");

    if (accessToken && userId) {
      window.opener?.postMessage(
        { accessToken, userId },
        window.opener?.location.origin || "*" 
      );

      window.close();
    } else {
      alert("로그인한 정보가 없습니다. 다시 시도해주세요요");
      window.close();
    }
  }, []);

  return <div>Instagram 인증 중...</div>;
};

export default InstagramAuthRedirect;
