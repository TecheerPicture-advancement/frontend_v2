declare module "*.svg" {
  import React from 'react';
  
  const value: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default value;
}
