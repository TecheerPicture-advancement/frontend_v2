import React, { useState } from 'react';
import Uploadcloud from '../assets/uploadcloud.svg?react';

interface UploadImageModalProps {
  onClose: () => void;
  onUpload: (file: File) => void;
}

const UploadImageModal: React.FC<UploadImageModalProps> = ({ onClose, onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];

      const isValid = ['image/jpg', 'image/png', 'image/jpeg'].includes(selectedFile.type);
      if (!isValid) {
        setUploadError('JPG, PNG가 아닙니다.');
        setFile(null);
        setPreview(null);
        return;
      }

      setUploadError(null);
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    setUploadError(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-7/12 h-auto flex flex-col items-center">
        <h2 className="text-2xl flex items-center justify-center font-PR_BL m-6">변경하고 싶은 이미지를 업로드 해주세요</h2>
        
        {!preview ? (
          <div className="mb-4 flex flex-col items-center justify-center rounded-lg border border-dashed p-4 w-5/6 h-4/6 text-center">
            <Uploadcloud className="mx-auto mt-10 mb-6" />
            <p className="text-black font-PR_BO text-xl mb-2">파일을 선택하거나 여기로 드래그 앤 드롭합니다.</p>
            <p className="text-gray-300 font-PR_M text-base">JPG, PNG 크기는 10MB 이하입니다.</p>
            <input 
              type="file" 
              onChange={handleFileChange} 
              className="hidden" 
              id="fileInput"
            />
            {uploadError && (
              <p className="text-red font-PR_BL text- mt-2">{uploadError}</p>
            )}
            <label 
              htmlFor="fileInput" 
              className="font-PR_BO rounded-lg cursor-pointer px-4 py-3 my-8 inline-block text-green-Dark border-2 border-solid border-green-Dark hover:bg-green-Normal hover:text-black"
            >
              파일 선택하기
            </label>
          </div>
        ) : (
          <div className="relative flex flex-col items-center mb-4">
            <img src={preview} alt="미리보기" className="w-64 h-64 object-contain mb-2" />
            <div className="mt-2 text-gray-400 font-PR_M">
              {file?.name}
            </div>
            <button onClick={handleRemoveFile} className="flex text-gray-300 px-2 py-1 rounded">
              삭제
            </button>
          </div>
        )}
        
        <div className="flex justify-end items-end space-x-4 mt-4 w-full">
          <button onClick={onClose} className="bg-gray-500 text-black font-PR_BO px-8 py-2 rounded hover:bg-gray-100">
            닫기
          </button>
          {preview && (
            <button 
              onClick={handleUpload} 
              className="bg-blue-500 text-black px-6 py-2 font-PR_BO rounded hover:bg-green-Normal"
              disabled={uploadError !== null}
            >
              업로드
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadImageModal;
