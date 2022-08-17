import { MachineMode } from '../../../utils/constants';
import { ChainSawLogo, DiscordIcon, InstagramIcon, TwitterIcon, OpenseaIcon } from '../../common/SvgIcon';
import useMachineStore from '../../../store';
import './index.scss';

const Footer = () => {
  const { showOverlay, setShowOverlay, currentMode } = useMachineStore();
  return (
    <div className="flex items-center justify-between absolute w-full bottom-[6%] 2xl:bottom-[10%] pl-[19%] pr-[14%]">
      <div className="space-x-8 flex items-center">
        { currentMode !== MachineMode.Off && (
          <div
            onClick={() => setShowOverlay(!showOverlay)}
            className="pixel-font footer-link cursor-pointer text-2xl lg:text-4xl"
          >
            HOW?
          </div>
        )}
        {/* <div className="pixel-font footer-link cursor-pointer text-4xl">DOCS</div> */}
      </div>
      <div className=" right-[14%] lg:right-[14%]">
        <div className="flex space-x-4 lg:space-x-6 items-center">
          <a
            className="item-start"
            target="_blank"
            rel="noreferrer"
            href="https://www.chainsaw.fun/"
          >
            <ChainSawLogo className="orange w-36 lg:w-full " />
          </a>
          <a
            className="flex"
            target="_blank"
            rel="noreferrer"
            href="https://testnets.opensea.io/collection/tozzi-ducks-eduoyj5wsl"
          >
            <OpenseaIcon className="social-icon" />
          </a>
          <a
            className="flex"
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/jimtozzi/?hl=en"
          >
            <InstagramIcon className="social-icon" />
          </a>
          <a
            className="flex"
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/specialsquid"
          >
            <TwitterIcon className="social-icon" />
          </a>
          <a
            className="flex"
            target="_blank"
            rel="noreferrer"
            href="https://discord.com/invite/aXQqKxKggh"
          >
            <DiscordIcon className="social-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
