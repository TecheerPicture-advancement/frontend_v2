import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../api/Usercontext';

interface ImageUploadModalProps {
  onClose: (uploadedImageId: number | null) => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const { userid } = useUser();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }

    const formData = new FormData();
    if (userid) {
      formData.append('user_id', userid.toString()); // Ensure userid is a string
    } else {
      console.error('userid is undefined');
      alert('Error: userid is undefined');
      return;
    }
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/images/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload response:', response.data);
      onClose(response.data.image_id); // Pass the image_id to parent component
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
      onClose(null);
    }
  };

  return (
    <div className="modal">
      <h2>Upload Image</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={() => onClose(null)}>Cancel</button>
    </div>
  );
};

export default ImageUploadModal;
