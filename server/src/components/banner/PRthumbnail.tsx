import { forwardRef } from "react";

interface PRthumbnailProps {
  imageUrl: string;
  maintext?: string;
  servetext?: string;
  scale?: number;
}

const PRthumbnail = forwardRef<HTMLDivElement, PRthumbnailProps>(
  ({ imageUrl, maintext, servetext, scale = 1 }, ref) => {
    return (
      <div ref={ref} className="relative aspect-[3/4]" style={{ width: `${scale * 16}rem` }}>
        <img src={imageUrl} alt="PR Thumbnail" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#c6c6c6] to-[#1e1e1e] mix-blend-hard-light" />
        <div className="absolute bottom-10 left-0 w-full p-4 gap-2">
          <span className="font-PR_M text-left text-white" style={{ fontSize: `${scale * 0.5}rem` }}>
            {servetext}
          </span>
          <p className="font-PR_BO text-left text-white" style={{ fontSize: `${scale * 1.25}rem` }}>
            {maintext}
          </p>
        </div>
      </div>
    );
  }
);

export default PRthumbnail;
