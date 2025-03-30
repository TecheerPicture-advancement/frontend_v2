import { toPng } from "html-to-image";

export const captureElementAsPng = async (elementId: string): Promise<string | null> => {
  try {
    const node = document.getElementById(elementId);
    if (!node) throw new Error("캡처 대상 요소를 찾을 수 없음");

    return await toPng(node, {
      quality: 1,
      pixelRatio: 5,
      cacheBust: true,
    });
  } catch (error) {
    console.error("캡처 실패", error);
    return null;
  }
};

export const dataURItoBlob = (dataURI: string): Blob => {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
};
