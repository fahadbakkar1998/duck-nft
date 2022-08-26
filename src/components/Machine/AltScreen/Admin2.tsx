import { FC, useEffect } from 'react';
import { indexOf } from 'lodash';
import useMachineStore from '../../../store';
import { placeholderDuck } from '../../../utils/constants';

const NoDucks = () => {
  return (
    <div className="w-full h-full z-20 absolute bg-screenBlack pixel-font flex justify-center items-center">
      <img alt="Tozzi Duck" src={`data:image/webp;base64,${placeholderDuck}`} />
      {/* <div className="absolute opacity-50 top-[2%]">NO DUCKS TO REVIEW ATM, LOL</div> */}
    </div>
  );
};

const DuckReviewLabel: FC<{duckNum: number, numDucks: number}> = ({ duckNum, numDucks }) => {
  return (
    <div
      className="
        pointer-events-none
        absolute px-4 py-2 bottom-5 right-2 rounded-md border-white border-2 shadow-md  pixel-font z-20
        bg-orange-500
      "
    >
      DUCK REVIEW {`(${duckNum}/${numDucks})`}
    </div>
  );
};

const Admin: FC = () => {
  const {
    setCurrentAdminDuckId,
    currentAdminDuckId,
    burnableDucks,
    openBurnForm,
  } = useMachineStore();

  const duck = burnableDucks?.find((d) => d.id === currentAdminDuckId);
  const duckIndex = indexOf(burnableDucks, duck);

  useEffect(() => {
    if (burnableDucks.length) {
      setCurrentAdminDuckId(burnableDucks[0].id);
    }
  }, []);

  return burnableDucks.length ? (
    <div className="absolute z-10">
      { !!duck && (
        <div className="h-full">
          <div className="overflow-hidden bg-white bg-opacity-80">
            { openBurnForm && (
              <video
                className="bottom-0 left-0 absolute z-20 mix-blend-screen"
                playsInline
                autoPlay
                muted
                loop
                src="/assets/video/fire.mp4"
              />
            )}
            { !openBurnForm && <DuckReviewLabel duckNum={duckIndex + 1} numDucks={burnableDucks.length} /> }
            <img alt={`Duck ${duck.id}`} src={duck.webp} />
          </div>
          <div className="w-full h-full" />
        </div>
      )}
    </div>
  ) : <NoDucks />;
};

export default Admin;
