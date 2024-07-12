import React from 'react';

interface StringProps {
  value: string;
  value2: string;
  image: any;
}

const BackgroundChooseCom:React.FC<StringProps> = (props) =>  {
  return (
    <div className="w-96 h-4/6">
        <img src={props.image} />
    </div>
);
};

export default BackgroundChooseCom;
