import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import html2canvas from 'html2canvas';

interface LastImageProps {
  src: string;
  width: number;
  height: number;
  maintext: string;
  servetext: string;
}

export interface LastImageRef {
  downloadImage: () => Promise<void>;
}

const LastImage = forwardRef<LastImageRef, LastImageProps>(
  ({ src, width, height, maintext, servetext }, ref) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
    const [imageError, setImageError] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      downloadImage: async () => {
        if (!divRef.current || !isImageLoaded) return;
        try {
          // Capture the component
          const canvas = await html2canvas(divRef.current, {
            useCORS: true,
            scale: 1,
          });

          // Convert the canvas to an image and download
          const image = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = image;
          link.download = 'Download.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          console.error('Error capturing image:', error);
        }
      },
    }));

    // Calculate font size based on image dimensions
    const baseFontSize = Math.min(width, height) * 0.05; // 5% of the smaller dimension
    const mainTextStyle: React.CSSProperties = {
      fontSize: `${baseFontSize}px`,
      fontWeight: 'bold',
      position: 'absolute',
      bottom: `${baseFontSize * 2}px`, // Ensure enough space for both texts
      width: '100%',
      textAlign: 'center',
      color: 'white',
    };
    const serveTextStyle: React.CSSProperties = {
      fontSize: `${baseFontSize * 0.8}px`,
      fontWeight: 'bold',
      position: 'absolute',
      bottom: `${baseFontSize}px`, // Position higher than before
      width: '100%',
      textAlign: 'center',
      color: 'white',
    };

    return (
      <div
        className="mt-[2800px]"
        ref={divRef}
        style={{
          position: 'relative',
          width,
          height,
          display: isImageLoaded ? 'block' : 'none',
          overflow: 'hidden',
        }}
      >
        <img
          crossOrigin="anonymous"
          src={src}
          width={width}
          height={height}
          alt="ResultImage"
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setImageError(true)}
          style={{ width: '100%', height: '100%' }}
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <p className="font-PR_BO" style={mainTextStyle}>{maintext}</p>
          <p className="font-PR_BO" style={serveTextStyle}>{servetext}</p>
        </div>

        {imageError && <p>이미지를 로드하는 데 실패했습니다.</p>}
      </div>
    );
  }
);

export default LastImage;
