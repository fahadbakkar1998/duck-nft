import { DuckLogo, DiscordIcon, InstagramIcon, TwitterIcon, OpenseaIcon } from '../../common/SvgIcon';
import './index.scss';

const Footer = () => {
  return (
    <div className="absolute bottom-[8%] right-[14%] lg:right-[14%] 2xl:bottom-[10%] ">
      <div className="flex space-x-4 lg:space-x-6 items-center">
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
  );
};

export default Footer;
