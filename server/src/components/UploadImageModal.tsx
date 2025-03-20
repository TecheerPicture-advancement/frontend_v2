import React, { useState, DragEvent } from 'react';
import axios from 'axios';
import Uploadcloud from '../assets/uploadcloud.svg?react';
import Loading from './Loading';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ImageUploadModalProps {
  onClose: (uploadedImageId: number | null) => void;
}

interface UploadResponse {
  imageId: number;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post<UploadResponse>(`${BASE_URL}/images`, formData);
      const imageId = response.data.imageId;
      console.log('이미지 업로드 성공:', imageId);
      onClose(imageId);
    } catch (error) {
      console.error('업로드 실패:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div 
      className="z-10 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {uploading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center w-6/12 p-6 bg-white rounded-lg shadow-lg min-h-3/4">
          <h2 className="flex items-center justify-center m-6 text-2xl font-PR_BL">
            변경하고 싶은 이미지를 업로드 해주세요
          </h2>
          {!preview ? (
            <div className="mb-4 flex flex-col items-center justify-center rounded-lg border border-dashed p-4 w-5/6 h-4/6 text-center">
              <Uploadcloud className="mx-auto mt-10 mb-6" />
              <p className="mb-2 text-xl text-black font-PR_BO">파일을 선택하거나 여기로 드래그 앤 드롭하세요.</p>
              <p className="text-base text-gray-300 font-PR_M">JPG, PNG 크기는 10MB 이하입니다.</p>
              <input 
                type="file" 
                onChange={handleFileChange} 
                className="hidden" 
                id="fileInput"
                accept=".jpg,.jpeg,.png"
              />
              <label htmlFor="fileInput" className="inline-block px-4 py-3 my-8 bg-white border-2 border-solid rounded-lg cursor-pointer font-PR_BO text-green-Dark border-green-Dark hover:bg-green-Normal hover:text-black">
                파일 선택하기
              </label>
            </div>
          ) : (
            <div className="relative flex flex-col items-center mb-4">
              <img src={preview} alt="미리보기" className="object-contain w-64 h-64 mb-2" />
              <div className="mt-2 text-gray-400 font-PR_M mb-3">{file?.name ?? 'No file selected'}</div>
              <button onClick={handleRemoveFile} className="px-4 py-2 text-sm text-black" disabled={!file}>
                삭제
              </button>
            </div>
          )}
          <div className="flex items-end justify-end w-full mt-4 space-x-4">
            <button onClick={() => onClose(null)} className="px-6 py-2 text-black rounded font-PR_BO hover:bg-gray-100">
              닫기
            </button>
            {file && !uploading && (
              <button onClick={handleUpload} className="px-4 py-2 text-black bg-blue-500 rounded font-PR_BO hover:bg-green-Normal">
                업로드
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadModal;
