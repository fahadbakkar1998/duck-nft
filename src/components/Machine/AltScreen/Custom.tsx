import { FC } from 'react';
import { mintStatusName } from '../../../utils/helpers';
import { useMachineConfig } from '../../../state/hooks';
import useMachineStore from '../../../store';

const Tag = ({ text }:{text: string}) => {
  return <span className="bg-gray-100 bg-opacity-50 text-screenBlack px-2 rounded-sm uppercase">{text}</span>;
};

const TagLink = ({ text, onClick }:{text: string, onClick: () => void;}) => {
  return <span onClick={onClick} className="bg-orange-300 cursor-pointer hover:bg-orange-400 bg-opacity-50 text-screenBlack px-2 rounded-sm uppercase">{text}</span>;
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
        <div className="h-full overflow-scroll">
          <div className="p-3">
            <div className="mb-1 text-xl text-orange-300">
              DUCK CUSTOMIZER
            </div>
            <div className="pixel-font-thin Custom-content mb-3 text-xl tracking-wide leading-[22px] ">
              Create your very own Custom Duck™️ with our embedded Duck Customizer™️
            </div>
            {/* MINT STATUS */}
            <div className="flex text-center mb-3  border border-orange-300 rounded-lg">
              <div className="border-r border-orange-300 w-full flex items-center justify-center p-1">
                <div className="mt-2">
                  <div className="pixel-font text-xs">MINT STATUS</div>
                  <div className="pixel-font-thin text-xl uppercase">
                    {mintStatusName(machineConfig?.customMintStatus!)}
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center justify-center p-1">
                <div className="mt-2">
                  <div className="pixel-font text-xs">MINT PRICE</div>
                  <div className="pixel-font-thin text-xl ">
                    {`${machineConfig?.tozziMintPrice} ETH`}
                  </div>
                </div>
              </div>
            </div>

            <div className="pixel-font-thin flex flex-col">
              <div className="text-orange-300 mb-2 mt-1 gap-2 flex pixel-font text-xl">
                {/* <div className="animate-pokeRight">{'-->'}</div> */}
                READ BEFORE YOU MINT
                {/* <div className="animate-pokeLeft">{'<--'}</div> */}
              </div>
              <div className="text-xl leading-[22px] tracking-wide flex flex-col gap-2 border border-orange-300 rounded-lg p-4">
                <div>
                  <b>1.</b> The Machine&apos;s Owner is the <b>BOSS</b>
                </div>

                <div>
                  <b>2.</b> If the Owner doesn&apos;t like your duck, they have <b>1 WEEK</b> to <b>BURN IT</b>. After that, you&apos;re safe.
                </div>

                <div>
                  <b>3.</b> Custom Ducks™️ are stored on-chain. Gas is paid by the minter (you).
                </div>
                {/* <div>
                  <b>4.</b> For more info, check the <TagLink onClick={openManual} text="Manual" />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom;
