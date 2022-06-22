/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable react/no-array-index-key */
import { FC } from 'react';
import { ChainsawLogo, DuckLogo, DiscordIcon, InstagramIcon, TwitterIcon } from '../common/SvgIcon';

const DuckImage: FC<{src: string}> = ({ src }) => {
  return (
    <div className="col-span-1">
      <img src={src} alt="Tozzi Duck" />
    </div>
  );
};

const renderDucks = () => {
  return (
    <>
      { Array(200).fill(null).map((_, index) => <DuckImage key={index} src={require(`../../assets/img/ducks/crypto_duck_${index + 1}.svg`)} />) }
    </>
  );
};

const Mobile = () => {
  return (
    <div className="relative h-full">
      <div className="absolute w-full h-full bg-black bg-opacity-50" />
      <div className={`
        z-10 fixed w-full
        top-1/2 left-1/2 transform -translate-x-1/2 sm:p-20 -translate-y-1/2 md:p-0  2xl:p-96 xl:-mt-20
        flex flex-col justify-center items-center
      `}
      >
        <DuckLogo className="w-full" wrapperClassName="w-full" />
        <div className={`
          lg:text-3xl xl:text-4xl text-base md:text-2xl
          bg-black pixel-font 
          text-white  p-4 border-orange-600 border-8 shadow-lg
          border-inset rounded-lg mx-40 z-50
          w-[50%]
          `}
        >
          <div className="animate-pulse text-center">
            Come Back on Desktop
          </div>
        </div>
        <div className="flex flex-col mt-8 max-w-md justify-center items-center relative">
          <div className="w-full flex justify-center">
            <a className="flex mx-4" target="_blank" rel="noreferrer" href="https://www.instagram.com/jimtozzi/?hl=en">
              <InstagramIcon className="w-10 h-10 fill-white opacity-90 hover:opacity-100" />
            </a>
            <a className="flex mx-4" target="_blank" rel="noreferrer" href="https://discord.com/invite/aXQqKxKggh">
              <DiscordIcon className="w-10 h-10 fill-white opacity-90 hover:opacity-100" />
            </a>
            <a className="flex mx-4" target="_blank" rel="noreferrer" href="https://twitter.com/specialsquid">
              <TwitterIcon className="w-10 h-10 fill-white opacity-90 hover:opacity-100" />
            </a>
          </div>
          <div
            className={`
              mt-6
              lg:text-3xl xl:text-4xl text-base md:text-2xl
              bg-black pixel-font 
              text-white  px-4 md:px-8 border-orange-600 border-8 shadow-lg
              border-inset rounded-lg mx-40 z-50
              w-[200px] md:w-[80%] 
            `}
          >
            <div className="animate-pulse text-center">
              <a href="https://www.chainsaw.fun/" rel="noreferrer" target="_blank">
                <img src="assets/images/chainsaw.svg" alt="Chain/Saw Logo" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-10"
      >
        {renderDucks()}
      </div>
    </div>
  );
};

export default Mobile;
