/* eslint-disable react/no-array-index-key */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { FC } from 'react';

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

export default DuckGrid;
