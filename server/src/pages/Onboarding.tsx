import React from "react";
import Onboarding1 from "../components/onboarding/Onboarding1";
import Onboarding2 from "../components/onboarding/Onboarding2";
import Onboarding3 from "../components/onboarding/Onboarding3";
import Onboarding4 from "../components/onboarding/Onboarding4";
import Onboarding6 from "../components/onboarding/Onboarding6";
import Onboarding7 from "../components/onboarding/Onboarding7";


const Onboarding: React.FC = () => {
  return (
    <div className="flex flex-col gap-48">
      <Onboarding1 />
      <Onboarding2/>
      <Onboarding3/>
      <Onboarding4/>
      <Onboarding6/>
      <Onboarding7/>

    </div>
  );
};

export default Onboarding;
