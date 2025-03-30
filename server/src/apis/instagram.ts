import axios from "axios";
import { getAuthData, clearAuthData, AuthData } from "../utils/instaAuth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const loginToInstagram = async (): Promise<AuthData | null> => {
  try {
    const authData = getAuthData();
    if (authData) {
      console.log("저장된 Instagram 인증 정보 사용", authData);
      return authData;
    }

    const { data: loginUrl } = await axios.get(`${BASE_URL}/instagram/login`);
    if (!loginUrl) throw new Error("Instagram 로그인 URL 가져오기 실패");

    const loginWindow = window.open(String(loginUrl), "_blank", "width=600,height=700");
    if (!loginWindow) {
      console.error("팝업 창 열기 실패");
      return null;
    }

    return null;
  } catch (error) {
    console.error("Instagram 로그인 실패", error);
    return null;
  }
};

export const checkInstagramToken = () => {
  const authData = getAuthData();
  if (!authData) {
    console.log("Instagram 토큰 만료됨. 버튼을 눌러 재로그인하세요.");
    return;
  }

  const timeLeft = authData.issuedAt + 60 * 60 * 1000 - Date.now();
  console.log(`토큰 만료까지 남은 시간: ${Math.floor(timeLeft / 1000)}초`);

  setTimeout(() => {
    console.log("Instagram 토큰 만료됨. 다시 로그인하세요.");
    clearAuthData();
  }, timeLeft);
};
