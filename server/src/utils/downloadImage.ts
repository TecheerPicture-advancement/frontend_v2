import { toPng } from "html-to-image";

export const handleCaptureDownload = async () => {
  try {
    const captureElement = document.getElementById("thumbnail-capture");
    if (!captureElement) {
      console.error("캡처할 요소를 찾을 수 없습니다.");
      return;
    }

    const dataUrl = await toPng(captureElement, { 
      quality: 1,
      pixelRatio: 5,
      cacheBust: true
    });

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "thumbnail.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("다운로드 실패", error);
  }
};


export const handleDownload = async (selectedPhoto: string | null) => {
    if (!selectedPhoto) return;
  
    try {
      const response = await fetch(selectedPhoto, { mode: "cors" });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = url;
      link.download = "downloaded_image.png"; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("이미지 다운로드 실패:", error);
    }
  };
  
