/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable react/no-array-index-key */
import { FC } from 'react';
import { OpenseaIcon, DiscordIcon, InstagramIcon, TwitterIcon } from '../common/SvgIcon';
import { openseaUrl } from '../../utils/constants';

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
      { Array(200).fill(null).map((_, index) => <DuckImage key={index} src={require(`../../assets/img/ducks/png/crypto_duck_${index + 1}.png`)} />) }
    </>
  );
};

const DuckGrid = () => {
  return (
    <div className="absolute w-full grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-10">
      <div className="absolute bg-black h-full w-full opacity-50" />
      {renderDucks()}
    </div>
  );
};

const ChainSaw = () => {
  return (
    <div className="">
      <a href="https://www.chainsaw.fun/" rel="noreferrer" target="_blank">
        <img src="assets/images/chainsaw.svg" alt="Chain/Saw Logo" />
      </a>
    </div>
  );
};

const Socials = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full flex justify-center">
        <a className="flex mx-3" target="_blank" rel="noreferrer" href={openseaUrl}>
          <OpenseaIcon className="w-8 h-8 fill-white opacity-90 hover:opacity-100" />
        </a>
        <a className="flex mx-3" target="_blank" rel="noreferrer" href="https://discord.com/invite/aXQqKxKggh">
          <DiscordIcon className="w-8 h-8 fill-white opacity-90 hover:opacity-100" />
        </a>
        <a className="flex mx-3" target="_blank" rel="noreferrer" href="https://twitter.com/specialsquid">
          <TwitterIcon className="w-8 h-8 fill-white opacity-90 hover:opacity-100" />
        </a>
        <a className="flex mx-3" target="_blank" rel="noreferrer" href="https://www.instagram.com/jimtozzi/?hl=en">
          <InstagramIcon className="w-8 h-8 fill-white opacity-90 hover:opacity-100" />
        </a>
      </div>
    </div>
  );
};

const Mobile = () => {
  return (
    <div className="flex justify-center">
      <DuckGrid />
      <div className="fixed p-5 sm:p-0 h-full md:top-[2%] max-w-screen-md mx-auto flex flex-col items-center">
        <div className="w-full">
          <img
            className="w-full pixel-art"
            src="assets/images/pixel-duck.png"
            alt="logo"
          />
        </div>
        <div
          className="
            p-10 text-base sm:text-lg md:text-xl
            bg-[#00c7ff] bg-opacity-75 sm:w-3/4 text-white pixel-font text-shadow
            border-4 rounded shadow-xl border-orange-500
            text-center
          "
        >
          <p className="mb-4">Thanks for checking out TOZZI DUCKS!</p>

          <p className="mb-4">
            To view and interact with The Tozzi Duck Machine, please come back on a supported MetaMask-equipped
            desktop browser (Chrome, Firefox, Edge).
          </p>

          <p className="mb-4">For more info, check out the links below and come chat w/ fellow duck-enthusiasts on our Discord.</p>
          <div className="flex justify-between items-center">
            <ChainSaw />
            <Socials />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mobile;
