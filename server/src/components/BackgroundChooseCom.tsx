import React from 'react';

interface StringProps {
  value: string;
  value2: string;
  value3: string;
  image: any;
}

const BackgroundChooseCom:React.FC<StringProps> = (props) =>  {
  return (
    <button className="relative w-full h-full overflow-hidden">
        <img className="filter: brightness-50 object-cover" src={props.image} />
        <div className="items-center grid grid-cols-1 absolute inset-0 place-content-center">
        <div className="desktop:w-28 desktop:h-12 desktop:text-xl laptop:text-lg laptop:w-24 laptop:h-10 w-20 h-8 absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-Normal rounded-[33px] place-content-center font-PR_M">
        {props.value}
        </div>
        <div className="desktop:text-2xl laptop:text-xl font-PR_BO text-white">
        {props.value2}
        </div>
        <div className="desktop:text-2xl laptop:text-xl font-PR_BO text-white">
        {props.value3}
        </div>
        </div>
    </button>
);
};

export default BackgroundChooseCom;
