import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import ResultButton from '../components/ResultButton3';
//import { useUser } from '../api/Usercontext';
import Loading from '../components/Loading';

interface BackgroundData {
  image_url: string;
  id: number;
}

// interface BackgroundData2 {
//   background_id: number;
// }


// interface PostData {
//   user_id: string;
//   image_id: number;
//   output_w: number;
//   output_h: number;
//   gen_type?: string;
//   concept_option: {
//     category: string;
//     theme: string;
//     num_results: number;
//   };
// }

const NukkiResult: React.FC = () => {
  const location = useLocation();
  //const { userid } = useUser();
 // const { removeBgBackgroundId, imageId } = location.state as { removeBgBackgroundId: number; imageId: number; };
  const { removeBgBackgroundId } = location.state as { removeBgBackgroundId: number; imageId: number; };
  const [backgroundData, setBackgroundData] = useState<BackgroundData | null>(null);
//  const [tempConceptBackgroundIds, setTempConceptBackgroundIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBackgroundData = async (retries = 30, delay = 3000) => {
      try {
        setIsLoading(true); // 로딩 시작
        for (let i = 0; i < retries; i++) {
          try {
            const response = await axios.get<BackgroundData>(`/api/v1/backgrounds/${removeBgBackgroundId}/`);
            if (response.data && response.data.image_url) {
              setBackgroundData(response.data);
              setIsLoading(false); // 데이터가 성공적으로 가져와졌을 때 로딩 종료
              break;
            }
          } catch (error) {
            console.error(`Error fetching background data (Attempt ${i + 1}):`, error);
          }
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      } catch (error) {
        console.error('Error fetching background data:', error);
        setIsLoading(false); // 에러가 발생해도 로딩 종료
      }
    };
  
    if (removeBgBackgroundId) {
      fetchBackgroundData();
    } else {
      console.error('No removeBgBackgroundId provided in state');
      setIsLoading(false); // ID가 없는 경우에도 로딩 종료
    }
  }, [removeBgBackgroundId]);
  

   {/*
    const generateConceptBackgroundIds = async () => {
      console.log("이미지 아이디, 유저 아이디",imageId, userid);
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

            const response = await axios.post<BackgroundData2>('/api/v1/backgrounds/', postData, {

            const response = await axios.post<BackgroundData2>('/api/v1/backgrounds/', postData, {
              headers: { 'Content-Type': 'application/json' },
            });
            console.log("리스폰스 값",response.data.background_id);
            tempIds.push(response.data.background_id);
            console.log("확인",tempIds);
            setTempConceptBackgroundIds(tempIds);
             console.log("템프1",tempConceptBackgroundIds);
          }
          console.log("템프2",tempConceptBackgroundIds);
        } catch (error) {
          console.error('Error sending data:', error);
        }
      }
      console.log("처리안함");
    };
*/}

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
      {isLoading ? (
        <Loading />
      ) : (
          <div className="flex flex-col min-h-screen bg-black">
            <NavBar />
            <div className="flex flex-grow items-center justify-center">
              <div className=" gap-10 w-auto h-auto border border-green-Light shadow-md flex flex-col py-12 px-32">
                <div className="flex justify-center text-white text-3xl font-PR_BL">
                  누끼 
                  <span className="text-green-Normal text-3xl font-PR_BL ml-2">결과 이미지</span> 
                </div>
                <div className="grid grid-cols-2 gap-10 ">
                  <div className="flex items-center justify-center m-18">
                    <img src={backgroundData?.image_url} alt="누끼 결과 이미지" className="w-80 h-80" />
                  </div>
                  <div className="flex flex-col justify-between px-9 py-20">
                    <div className="flex justify-center">
                     {/* <div onClick={generateConceptBackgroundIds}>
                         <Link to="/simple/result" state={{ conceptBackgroundIds: tempConceptBackgroundIds, removeBgBackgroundId, imageId }}>
                          <ResultButton value='심플 이미지 생성' />
                        </Link> 
                      </div>*/}
                    </div>
                    <div className="flex flex-col gap-10">
                      <div onClick={copyImage}>
                        <ResultButton value="복사하기" />
                      </div>
                      <div onClick={downloadImage}>
                        <ResultButton value="다운로드" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
       //   </div>
            )}
          </>
        );
      };
      
      export default NukkiResult;
      