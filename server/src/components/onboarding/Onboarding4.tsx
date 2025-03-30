import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const versions = [
  { id: 1, label: "Version 1", img: "/assets/onboarding/version1.jpg" },
  { id: 2, label: "Version 2", img: "/assets/onboarding/version2.jpg" },
  { id: 3, label: "Version 3", img: "/assets/onboarding/version3.jpg" },
];

const Onboarding4: React.FC = () => {
  const [activeVersion, setActiveVersion] = useState(1);

  return (
    <section className="flex justify-start items-start relative gap-[122px] w-[1180px] mx-auto">
      <article className="flex flex-col justify-start items-end w-[512px] relative gap-[30px]">
        <header>
          <h1 className="flex flex-col text-5xl font-PR_BL text-right text-gray-400 dark:text-white">
            <span>인스타그램에서 많이 보던</span>
            <span>썸네일을 현실로</span>
          </h1>
        </header>
        <div className="flex flex-col gap-[30px] py-10 rounded-[10px]">
          {versions.map((version) => (
            <motion.button
              key={version.id}
              onClick={() => setActiveVersion(version.id)}
              className={`flex justify-center items-center px-20 py-3 rounded-xl text-2xl transition-all duration-500 
                ${activeVersion === version.id ? "bg-green-Normal dark:bg-green-Light font-PR_BO text-green-Light dark:text-black" : "text-gray-300 dark:text-white font-PR_L"}`}
              whileTap={{ scale: 0.9 }}
            >
              {version.label}
            </motion.button>
          ))}
        </div>
      </article>
      <figure className="w-[575px] h-[698px] relative overflow-hidden">
        <AnimatePresence mode="wait">
          {versions.map((version) =>
            activeVersion === version.id ? (
              <motion.img
                key={version.id}
                src={version.img}
                alt={version.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="absolute w-full h-full object-cover"
              />
            ) : null
          )}
        </AnimatePresence>
      </figure>
    </section>
  );
};

export default Onboarding4;
