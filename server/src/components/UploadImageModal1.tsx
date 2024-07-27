import axios from 'axios';
import React, { useState, useEffect, DragEvent } from 'react';
import { useUser } from '../api/Usercontext';
import Uploadcloud from '../assets/uploadcloud.svg?react';
import { useNavigate } from 'react-router-dom';


interface ImageUploadModalProps {
  onClose: (uploadedImageId: number | null) => void;
}

interface UploadResponse {
  image_id: number;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const { userid } = useUser();
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const navigate = useNavigate();


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('파일을 선택해주세요');
      return;
    }

    const formData = new FormData();
    if (userid) {
      formData.append('user_id', userid.toString());
    } else {
      console.error('닉네임을 생성하지 않았습니다.');
      alert('오류: 닉네임을 생성하지 않았습니다.');
      navigate('/nickname');
      return;
    }
    formData.append('file', file);

    try {
      const response = await axios.post<UploadResponse>('http://localhost:8000/api/v1/images/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload response:', response.data);
      onClose(response.data.image_id); // 부모 컴포넌트에 image_id 보내기
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('이미지 업로드 중 에러가 발생하였습니다.');
      onClose(null);
    }
    
  };

  useEffect(() => {
    // 모달이 열릴 때 스크롤을 막습니다.
    document.body.style.overflow = 'hidden';
    return () => {
      // 모달이 닫힐 때 스크롤을 다시 활성화합니다.
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);

    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);

    if (droppedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(droppedFile);
    }
  };

  return (
    <div className="z-10 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center w-7/12 p-6 bg-white rounded-lg shadow-lg min-h-3/4">
        <h2 className="flex items-center justify-center m-6 text-2xl font-PR_BL">변경하고 싶은 이미지를 업로드 해주세요</h2>
        {!preview ? (
          <div
            className={`mb-4 flex flex-col items-center justify-center rounded-lg border border-dashed p-4 w-5/6 h-4/6 text-center ${dragging ? 'bg-green-Light' : ''}`}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Uploadcloud className="mx-auto mt-10 mb-6" />
            <p className="mb-2 text-xl text-black font-PR_BO">파일을 선택하거나 여기로 드래그 앤 드롭합니다.</p>
            <p className="text-base text-gray-300 font-PR_M">JPG, PNG 크기는 10MB 이하입니다.</p>
            <input 
              type="file" 
              onChange={handleFileChange} 
              className="hidden" 
              id="fileInput"
            />
            <label 
              htmlFor="fileInput" 
              className="inline-block px-4 py-3 my-8 bg-white border-2 border-solid rounded-lg cursor-pointer font-PR_BO text-green-Dark border-green-Dark hover:bg-green-Normal hover:text-black"
            >
              파일 선택하기
            </label>
          </div>
        ) : (          
          <div className="relative flex flex-col items-center mb-4">
            <img src={preview} alt="미리보기" className="object-contain w-64 h-64 mb-2" />
            <div className="mt-2 text-gray-400 font-PR_M mb-3">
              {file?.name ?? 'No file selected'}
            </div>
              <button 
                onClick={handleRemoveFile} 
                className="flex px-4 py-2 text-sm text-black "
                disabled={!file} // Disable button when file is null
              >
                삭제
              </button>
          </div>
        )}
        <div className="flex items-end justify-end w-full mt-4 space-x-4">
          <button onClick={() => onClose(null)} className="px-6 py-2 text-black rounded font-PR_BO hover:bg-gray-100">
            닫기
          </button>
          {file && (
            <button 
              onClick={handleUpload}
              className="px-4 py-2 text-black bg-blue-500 rounded font-PR_BO hover:bg-green-Normal"
            >
              업로드
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
