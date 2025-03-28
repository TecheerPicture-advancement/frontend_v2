interface AuthData {
  accessToken: string;
  userId: string;
  issuedAt: number;
}

// 토큰 저장 
export const saveAuthData = (accessToken: string, userId: string): void => {
  const issuedAt = Date.now();
  sessionStorage.setItem("ig_access_token", accessToken);
  sessionStorage.setItem("ig_user_id", userId);
  sessionStorage.setItem("ig_issued_at", issuedAt.toString());
};

// 토큰 가져오기
export const getAuthData = (): AuthData | null => {
  const accessToken = sessionStorage.getItem("ig_access_token");
  const userId = sessionStorage.getItem("ig_user_id");
  const issuedAt = sessionStorage.getItem("ig_issued_at");

  if (!accessToken || !userId || !issuedAt) {
    clearAuthData();
    return null;
  }

  const issuedTime = parseInt(issuedAt, 10);
  const currentTime = Date.now();
  const oneHour = 60 * 60 * 1000;

  if (currentTime - issuedTime >= oneHour) {
    console.log("토큰 만료됨, 재로그인 필요");
    clearAuthData();
    return null;
  }

  return { accessToken, userId, issuedAt: issuedTime };
};

// 초기화
export const clearAuthData = (): void => {
  sessionStorage.removeItem("ig_access_token");
  sessionStorage.removeItem("ig_user_id");
  sessionStorage.removeItem("ig_issued_at");
};
