import DuckGrid from '../common/DuckGrid';
import Socials from './Socials';

const Mobile = () => {
  return (
    <div className="flex justify-center">
      <DuckGrid />
      <div className="fixed p-5 sm:p-0 h-full max-w-screen-md mx-auto flex flex-col items-center">
        <div className="w-full">
          <img
            className="w-full pixel-art"
            src="assets/images/pixel-duck.png"
            alt="logo"
          />
        </div>
        <div
          className="
            p-8 text-base sm:text-lg md:text-xl
            bg-[#00c7ff] bg-opacity-75 sm:w-3/4 text-white pixel-font text-shadow
            border-4 rounded shadow-xl border-orange-500
            text-center
          "
        >
          <p className="mb-4">Welcome to TOZZI DUCKS!</p>

          <p className="mb-4">
            To access The Tozzi Duck Machine, please come back on a supported
            desktop browser (Chrome, Firefox, Edge).
          </p>

          <p className="mb-2">For more info, check the links below and come chat w/ fellow duck-enthusiasts on Discord.</p>
          <div className="flex items-center w-full">
            <div className="w-full flex-1">
              <a href="https://www.chainsaw.fun/" rel="noreferrer" target="_blank">
                <img src="assets/images/chainsaw.svg" alt="Chain/Saw Logo" />
              </a>
            </div>
            <div className="flex-1"><Socials /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mobile;
