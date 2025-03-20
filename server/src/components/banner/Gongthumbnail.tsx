interface GongthumbnailProps {
  imageUrl: string;
  maintext?: string;
  servetext?: string;
  scale?: number;
}

const Gongthumbnail: React.FC<GongthumbnailProps> = ({ imageUrl, maintext, servetext, scale = 1 }) => {
  return (
    <div 
      className="relative aspect-[3/4]"
      style={{ width: `${scale * 16}rem` }}
    >
      <img src={imageUrl} alt="Gongthumbnail" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#c6c6c6] to-[#1e1e1e] mix-blend-hard-light" />
      <div className="absolute bottom-10 left-0 w-full p-4 flex flex-col gap-2">
        <p 
          className="text-xl font-GongL text-center text-white text-stroke-sm"
          style={{ fontSize: `${scale * 1.25}rem` }}
        >
          {maintext}
        </p>
        <p 
          className="text-xxs font-GongL text-center text-white "
          style={{ fontSize: `${scale * 0.5}rem` }}
        >
          {servetext}
        </p>
      </div>
    </div>
  );
};

export default Gongthumbnail;
