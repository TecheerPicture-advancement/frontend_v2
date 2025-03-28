interface AuthData {
    accessToken: string;
    userId: string;
  }
  
  export const saveAuthData = (accessToken: string, userId: string): void => {
    sessionStorage.setItem("ig_access_token", accessToken);
    sessionStorage.setItem("ig_user_id", userId);
  };
  
  export const getAuthData = (): AuthData | null => {
    const accessToken = sessionStorage.getItem("ig_access_token");
    const userId = sessionStorage.getItem("ig_user_id");
  
    if (!accessToken || !userId) return null;
  
    return { accessToken, userId };
  };
  
  export const clearAuthData = (): void => {
    sessionStorage.removeItem("ig_access_token");
    sessionStorage.removeItem("ig_user_id");
  };
  