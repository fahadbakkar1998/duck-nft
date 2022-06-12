/* eslint-disable react/no-unescaped-entities */
import { FC } from 'react';
import { useMachineConfig } from '../../../state/hooks';
import useMachineStore from '../../../store';

const Tag = ({ text }:{text: string}) => {
  return <span className="bg-indigo-400 bg-opacity-50 text-screenBlack px-2 rounded-sm uppercase">{text}</span>;
};

const TagLink = ({ text, onClick }:{text: string, onClick: () => void;}) => {
  return <span onClick={onClick} className="bg-indigo-400 cursor-pointer hover:bg-pink-400 bg-opacity-50 text-screenBlack px-2 rounded-sm uppercase">{text}</span>;
};

const Custom: FC = () => {
  const { isOwnersManualOpen, setIsOwnersManualOpen } = useMachineStore();

  const openManual = () => {
    setIsOwnersManualOpen(!isOwnersManualOpen);
  };
  const { data: machineConfig, isLoading } = useMachineConfig();

  return (
    <div className="absolute h-full w-full z-10">
      <div className="pixel-font w-full h-full p-2 scanline">
        <div className="h-full overflow-scroll border-2">
          <div className="p-2">
            <div className="mb-2 tracking-widest text-center">
              DUCK CUSTOMIZER
            </div>
            {/* MINT STATUS */}
            <div className="flex text-center mb-2 border-t border-b border-dashed border-opacity-40 pt-2">
              <div className=" flex-1 flex flex-col ">
                <div className="pixel-font text-xs text-indigo-200">MINT STATUS</div>
                <div className="pixel-font-thin text-xl text-indigo-500">
                  ENABLED
                </div>
              </div>
              <div className=" flex-1 flex flex-col text-sm ">
                <div className="pixel-font text-xs">MINT PRICE</div>
                <div className="pixel-font-thin text-xl text-green-500">
                  {`${machineConfig?.tozziMintPrice} ETH`}
                </div>
              </div>
            </div>

            <div className="pixel-font-thin">
              <div className="Custom-content mb-2 text-xl tracking-wide leading-[22px] ">
                Use the embedded Duck Customizer™️ on the <Tag text="Main Screen" /> to the create your Custom Duck™️. When you're ready, click the <Tag text="Mint Duck" /> button below.
              </div>

              <div className="Custom-content mb-2 text-xl tracking-wide leading-[22px] ">
                {'Custom Ducks™️ are stored directly on-chain using .webp image compression. Storage costs are paid by the minter (that\'s you, ser).'}
              </div>

              <div className="text-xl leading-[22px] tracking-wide mb-2">
                <span className="text-red-500">WARNING, READ BEFORE YOU MINT:</span><br />Newly minted Custom Ducks™️ that do not satisfy the <span className="line-through">arbitrary</span> impeccable standards of The Duck Machine's™️ current owner are vulnerable to being burned.
              </div>

              <div className="text-xl leading-[22px] tracking-wide mb-2">
                {'Within a one-week probationary period after minting, the Machine\'s owner can burn any Custom Duck™️ that they disapprove of. So, please DYOR and read the room before minting -- gas and minting fees are non-refundable.'}
              </div>

              <div className="text-xl leading-[22px] tracking-wide mb-2">
                For further detail on the Custom Duck™️ minting and approval process, please consult the <TagLink onClick={openManual} text="Owner's Manual" />.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom;
