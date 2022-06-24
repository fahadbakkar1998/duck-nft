/* eslint-disable react/no-unescaped-entities */
import { FC } from 'react';
import { useMachineConfig } from '../../../state/hooks';
import useMachineStore from '../../../store';

const Tag = ({ text }:{text: string}) => {
  return <span className="bg-gray-100 bg-opacity-50 text-screenBlack px-2 rounded-sm uppercase">{text}</span>;
};

const TagLink = ({ text, onClick }:{text: string, onClick: () => void;}) => {
  return <span onClick={onClick} className="bg-white cursor-pointer hover:bg-orange-400 bg-opacity-50 text-screenBlack px-2 rounded-sm uppercase">{text}</span>;
};

const Custom: FC = () => {
  const { isOwnersManualOpen, setIsOwnersManualOpen } = useMachineStore();

  const openManual = () => {
    setIsOwnersManualOpen(!isOwnersManualOpen);
  };
  const { data: machineConfig } = useMachineConfig();

  return (
    <div className="absolute h-full w-full z-10">
      <div className="pixel-font w-full h-full p-2 scanline">
        <div className="h-full overflow-scroll border-2">
          <div className="p-3">
            <div className="mb-2 pb-1 border-b-2 border-dashed tracking-widest ">
              DUCK CUSTOMIZER
            </div>
            <div className="pixel-font-thin Custom-content mb-2 text-xl tracking-wide leading-[22px] ">
              Create your very own Custom Duck™️ with our embedded Duck Customizer™️
            </div>
            {/* MINT STATUS */}
            <div className="flex text-center mb-2 border-t border border-opacity-40 ">
              <div className="border-r w-full flex items-center justify-center p-1">
                <div className="mt-2">
                  <div className="pixel-font text-xs">MINT STATUS</div>
                  <div className="pixel-font-thin text-xl ">
                    ENABLED
                  </div>
                </div>
              </div>
              <div className="border-r w-full flex items-center justify-center p-1">
                <div className="mt-2">
                  <div className="pixel-font text-xs">MINT PRICE</div>
                  <div className="pixel-font-thin text-xl ">
                    {`${machineConfig?.tozziMintPrice} ETH`}
                  </div>
                </div>
              </div>
            </div>

            <div className="pixel-font-thin flex flex-col">
              <div className="text-red-500 justify-center mt-1 gap-2 flex pixel-font text-sm">
                <div className="animate-pokeRight">{'-->'}</div>
                READ BEFORE YOU MINT!
                <div className="animate-pokeLeft">{'<--'}</div>
              </div>
              <div className="text-xl leading-[22px] tracking-wide flex flex-col gap-2">
                <div>
                  <b>1.</b> The Owner of this machine is the boss.
                </div>

                <div>
                  <b>2.</b> If the Owner doesn't like your duck, they can <b>BURN</b> it within a period of <b>1 WEEK</b>. After that, you're safe.
                </div>

                <div>
                  <b>3.</b> Custom Ducks™️ are stored on-chain using .webp image compression. Storage costs are paid by the minter (that&apos;s you, ser).
                </div>

                <div>
                  <b>4.</b> For more info, check the <TagLink onClick={openManual} text="Manual" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom;
