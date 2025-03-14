import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ResultButton from '../components/ResultButton3';
import Loading from '../components/Loading';

const NukkiResult: React.FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  useEffect(() => {
    if (location.state && location.state.resultUrl) {
      setResultUrl(location.state.resultUrl);
      setIsLoading(false);
    } else {
      setIsLoading(false); 
    }
  }, [location.state]);

  const handleCopy = async () => {
    if (resultUrl) {
      try {
        const response = await fetch(resultUrl);
        const blob = await response.blob();
        const data = [new ClipboardItem({ [blob.type]: blob })];
  
        await navigator.clipboard.write(data);
        alert("이미지가 클립보드에 복사되었습니다.");
      } catch (error) {
        alert("이미지 복사 실패");
      }
    }
  };

  const handleDownload = async () => {
    if (resultUrl) {
      try {
        const response = await fetch(resultUrl);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
  
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = "image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      } catch (error) {
        alert("이미지 다운로드 실패");
      }
    }
  };
  

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="min-w-fit min-h-fit flex items-center justify-center">
          <div className="flex flex-grow items-center justify-center">
            <div className="gap-10 w-auto h-auto border border-green-Light shadow-md flex flex-col py-12 px-32">
              <div className="flex justify-center text-white text-3xl font-PR_BL">
                누끼 
                <span className="text-green-Normal text-3xl font-PR_BL ml-2">결과 이미지</span>
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div className="flex items-center justify-center m-18">
                  {resultUrl ? (
                    <img src={resultUrl} alt="누끼 결과 이미지" className="w-80 h-80 object-cover" />
                  ) : (
                    <p>이미지를 불러오는 중입니다...</p>
                  )}
                </div>
                <div className="flex flex-col justify-between px-9 py-20">
                  <div className="flex justify-center">
                  </div>
                  <div className="flex flex-col gap-10">
                      <ResultButton value="복사하기" onClick={handleCopy} />
                      <ResultButton value="다운로드" onClick={handleDownload} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NukkiResult;
