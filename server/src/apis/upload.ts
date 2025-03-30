import axios from "axios";
import { dataURItoBlob } from "../utils/captureUtils";

interface UploadResponse {
  imageId: string;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const uploadImage = async (dataUrl: string): Promise<string | null> => {
  try {
    const blob = dataURItoBlob(dataUrl);

    const formData = new FormData();
    formData.append("file", blob, "screenshot.png");

    const response = await axios.post<UploadResponse>(`${BASE_URL}/images`, formData, {
      withCredentials: true,
    });

    console.log("업로드 성공:", response.data);
    return response.data.imageId;
  } catch (error) {
    console.error("업로드 실패:", error);
    return null;
  }
};
