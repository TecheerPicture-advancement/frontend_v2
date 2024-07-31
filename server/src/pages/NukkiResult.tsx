import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import ResultButton from '../components/ResultButton3';
import { useUser } from '../api/Usercontext';

interface BackgroundData {
  image_url: string;
  background_id: number;
}

interface PostData {
  user_id: string;
  image_id: number;
  output_w: number;
  output_h: number;
  gen_type?: string;
  concept_option: {
    category: string;
    theme: string;
    num_results: number;
  };
}

const NukkiResult: React.FC = () => {
  const location = useLocation();
  const { userid } = useUser();
  const { removeBgBackgroundId, imageId } = location.state as { removeBgBackgroundId: number; imageId: number; };
  const [backgroundData, setBackgroundData] = useState<BackgroundData | null>(null);
  const [tempConceptBackgroundIds, setTempConceptBackgroundIds] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBackgroundData = async () => {
      try {
        const response = await axios.get<BackgroundData>(`/api/v1/backgrounds/${removeBgBackgroundId}/`);
        setBackgroundData(response.data);
      } catch (error) {
        console.error('Error fetching background data:', error);
      }
    };

    if (removeBgBackgroundId) {
      fetchBackgroundData();
    } else {
      console.error('No removeBgBackgroundId provided in state');
    }
  }, [removeBgBackgroundId]);

  useEffect(() => {
    const generateConceptBackgroundIds = async () => {
      if (imageId && userid) {
        const postDataBase: PostData = {
          user_id: userid,
          image_id: imageId,
          output_w: 1000,
          output_h: 1000,
          concept_option: {
            category: 'others',
            theme: 'clean',
            num_results: 1,
          },
        };

        const genTypes = ['color_bg', 'simple'];
        const tempIds: number[] = [];

        try {
          for (const genType of genTypes) {
            const postData = { ...postDataBase, gen_type: genType };
            console.log("post데이터", postData);

            const response = await axios.post<{ background_id: number }>('/api/v1/backgrounds/', postData, {
              headers: { 'Content-Type': 'application/json' },
            });
            tempIds.push(response.data.background_id);
            console.log(tempIds);
          }
          setTempConceptBackgroundIds(tempIds);
        } catch (error) {
          console.error('Error sending data:', error);
        }
      }
      setLoading(false);
    };

    generateConceptBackgroundIds();
  }, [imageId, userid]);

  const downloadImage = async () => {
    if (backgroundData?.image_url) {
      try {
        const response = await axios.get<Blob>(backgroundData.image_url, { responseType: 'blob' });
        const blob = response.data; 
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'Nukki_image.png';
        link.click();
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    }
  };

  const copyImage = async () => {
    if (backgroundData?.image_url) {
      try {
        const response = await axios.get<Blob>(backgroundData.image_url, { responseType: 'blob' });
        const blob = response.data; 

        if (navigator.clipboard && window.ClipboardItem) {
          const clipboardItem = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([clipboardItem]);
          alert('이미지가 클립보드에 복사되었습니다.');
        } else {
          alert('클립보드 API를 지원하지 않는 브라우저입니다.');
        }
      } catch (err) {
        console.error('Error copying image:', err);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-black">
        <NavBar />
        <div className="flex flex-grow items-center justify-center">
          <div className="w-auto h-auto border border-green-Light shadow-md flex flex-col py-8 px-32">
            <div className="flex justify-center text-white text-3xl font-PR_BL">
              누끼 결과 이미지
            </div>
            <div className="grid grid-cols-2">
              <div className="flex items-center justify-center m-18">
                <img src={backgroundData?.image_url} alt="누끼 결과 이미지" className="w-80 h-80" />
              </div>
              <div className="flex flex-col space-y-2 gap-10 px-10 py-20">
                {!loading && (
                  <Link to="/simple/result" state={{ conceptBackgroundIds: tempConceptBackgroundIds, removeBgBackgroundId, imageId }}>
                    <ResultButton value='심플 이미지 생성' />
                  </Link>
                )}
                <div onClick={copyImage}>
                  <ResultButton value="복사하기" />
                </div>
                <div onClick={downloadImage}>
                  <ResultButton value='다운로드' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NukkiResult;
