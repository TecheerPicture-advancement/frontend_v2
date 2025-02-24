// 이미지 ID 저장
export const setSessionImageId = (id: number | null) => {
    if (id !== null) {
      sessionStorage.setItem('imageId', id.toString());
    } else {
      sessionStorage.removeItem('imageId');
    }
  };
  
  export const getSessionImageId = (): number | null => {
    const storedId = sessionStorage.getItem('imageId');
    return storedId ? parseInt(storedId, 10) : null;
  };
  