import { create } from 'zustand';
import { setSessionImageId, getSessionImageId } from '../utils/storage';

interface ImageStore {
  imageId: number | null;
  setImageId: (id: number | null) => void;
}

const useImageStore = create<ImageStore>((set) => ({
  imageId: getSessionImageId(), // sessionStorage에서 초기값 가져오기
  setImageId: (id) => {
    setSessionImageId(id); // sessionStorage에 저장
    set({ imageId: id });   // 상태 업데이트
  },
}));

export default useImageStore;
