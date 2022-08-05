import { FC, useEffect } from 'react';
import { indexOf } from 'lodash';
import useMachineStore from '../../../store';

const NoDucks = () => {
  return (
    <div className="w-full h-full z-20 absolute bg-screenBlack pixel-font flex justify-center items-center">
      NO DUCKS TO REVIEW ATM
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
