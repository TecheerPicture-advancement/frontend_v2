interface JalthumbnailProps {
  imageUrl: string;
  maintext?: string;
  scale?: number;
}


const Jalthumbnail: React.FC<JalthumbnailProps> = ({ imageUrl, maintext, scale = 1 }) => {
  console.log("Scale value:", scale);
  return (
    <div 
      className="relative aspect-[3/4]"
      style={{ width: `${scale * 16}rem` }}
    >
      <img src={imageUrl} alt="Jal Thumbnail" className="w-full aspect-[3/4] object-cover" />
      <div className="absolute bottom-10 left-0 w-full p-4 text-center"
                style={{ padding: `${scale * 1}rem` }}>
        <span className="w-[291px] h-[95px] text-xl font-Jalnan text-center text-stroke text-white"
              style={{ fontSize: `${scale * 1.25}rem` }}>
        {maintext}
        </span>

      </div>
    </div>
  );

};

export default Jalthumbnail;