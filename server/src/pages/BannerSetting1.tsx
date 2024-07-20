import React, { useState } from 'react';
import axios from 'axios';
import ImageUploadModal from '../components/UploadImageModal1';
import NavBar from '../components/NavBar';
import { useUser } from '../api/Usercontext';
interface FormData {
  item_name: string;
  item_concept: string;
  item_category: string;
  add_information: string;
  output_w: string;
  output_h: string;
}
const BannerSetting: React.FC = () => {
  const { userid } = useUser();
  const [formData, setFormData] = useState<FormData>({
    item_name: '',
    item_concept: '',
    item_category: '',
    add_information: '',
    output_w: '',
    output_h: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [imageId, setImageId] = useState<number | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleModalClose = async (uploadedImageId: number | null) => {
    setShowModal(false);
    if (uploadedImageId && userid) {
      setImageId(uploadedImageId);
      try {
        const bannerData = {
          item_name: formData.item_name,
          item_concept: formData.item_concept,
          item_category: formData.item_category,
          add_information: formData.add_information,
          image_id: uploadedImageId,
          user_id: userid,
        };
        const backgroundData = {
          user_id: userid,
          image_id: uploadedImageId,
          gen_type: 'concept',
          output_w: formData.output_w,
          output_h: formData.output_h,
          concept_option: {
            category: "car",
            theme: formData.item_concept,
            num_results: 4,
          },
        };
        console.log('Banner Data:', bannerData);
        console.log('Background Data:', backgroundData);
        const bannerRequest = axios.post('http://localhost:8000/api/v1/banners', bannerData);
        const backgroundRequest = axios.post('http://localhost:8000/api/v1/backgrounds', backgroundData);
        await Promise.all([bannerRequest, backgroundRequest]);
        alert('Data submitted successfully');
      } catch (error) {
        console.error('Error submitting data:', error);
        alert('Error submitting data');
      }
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(true);
  };
  if (!userid) {
    console.error('userid is undefined');
    return <div>Error: userid is undefined</div>;
  }
  return (
    <div>
      <NavBar />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="item_name"
          value={formData.item_name}
          onChange={handleChange}
          placeholder="Item Name"
          required
        />
        <input
          type="text"
          name="item_concept"
          value={formData.item_concept}
          onChange={handleChange}
          placeholder="Item Concept"
          required
        />
        <input
          type="text"
          name="item_category"
          value={formData.item_category}
          onChange={handleChange}
          placeholder="Item Category"
          required
        />
        <input
          type="text"
          name="add_information"
          value={formData.add_information}
          onChange={handleChange}
          placeholder="Add Information"
        />
        <input
          type="text"
          name="output_w"
          value={formData.output_w}
          onChange={handleChange}
          placeholder="Output Width"
          required
        />
        <input
          type="text"
          name="output_h"
          value={formData.output_h}
          onChange={handleChange}
          placeholder="Output Height"
          required
        />
        <button type="submit">Submit</button>
      </form>
      {showModal && (
        <ImageUploadModal onClose={handleModalClose} />
      )}
    </div>
  );
};
export default BannerSetting;