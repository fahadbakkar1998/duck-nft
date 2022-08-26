/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable react/no-array-index-key */
import { FC } from 'react';
// import { DuckLogo, DiscordIcon, InstagramIcon, TwitterIcon } from '../../common/SvgIcon';

const DuckImage: FC<{src: string}> = ({ src }) => {
  return (
    <div className="col-span-1 w-full h-full">
      <img className="pixel-art w-full h-full" src={src} alt="Tozzi Duck" />
    </div>
  );
};

const renderDucks = () => {
  return (
    <>
      { Array(200).fill(null).map((_, index) => <DuckImage key={index} src={require(`../assets/img/ducks/png/crypto_duck_${index + 1}.png`)} />) }
    </>
  );
};

const DuckGrid = () => {
  return (
    <div style={{ zIndex: 1000 }} className="absolute w-full grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-10">
      <div className="absolute bg-black h-full w-full opacity-50" />
      {renderDucks()}
    </div>
  );
};

interface LandingPageProps {
  onClick: () => void;
}

const LandingPage: FC<LandingPageProps> = ({ onClick }) => {
  return (
    <div className="flex justify-center">
      <DuckGrid />
      <div
        className="
          fixed z-[1000] top-5
          flex flex-col items-center justify-center
          p-4
        "
      >
        <div className="w-full">
          <img
            className="w-full pixel-art"
            src="assets/images/pixel-duck.png"
            alt="logo"
          />
        </div>
        <div
          className="
            p-4
            bg-[#00c7ff] bg-opacity-75 text-white pixel-font text-shadow
            space-y-4
            border-4 rounded shadow-xl border-orange-500
          "
        >
          <p>Hey, thanks for checking out Tozzi Ducks!</p>
          <p>To view & interact with the Tozzi Duck Machine in all it&apos;s glory, please visit us on a supported desktop browser. (Chrome, Firefox work best).</p>
        </div>

        <div
          className="
            mt-10
            p-4
            bg-[#00c7ff] bg-opacity-75 text-white pixel-font text-shadow
            space-y-4
            border-4 rounded shadow-xl border-orange-500
          "
        >
          <div onClick={onClick}>Go To App</div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
