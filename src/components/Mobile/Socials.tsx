import { openseaUrl } from '../../utils/constants';
import { OpenseaIcon, DiscordIcon, InstagramIcon, TwitterIcon } from '../common/SvgIcon';

const Socials = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full flex justify-center">
        <a className="flex mx-2" target="_blank" rel="noreferrer" href={openseaUrl}>
          <OpenseaIcon className="w-8 h-8 fill-white opacity-90 hover:opacity-100" />
        </a>
        <a className="flex mx-2" target="_blank" rel="noreferrer" href="https://discord.com/invite/aXQqKxKggh">
          <DiscordIcon className="w-8 h-8 fill-white opacity-90 hover:opacity-100" />
        </a>
        <a className="flex mx-2" target="_blank" rel="noreferrer" href="https://twitter.com/specialsquid">
          <TwitterIcon className="w-8 h-8 fill-white opacity-90 hover:opacity-100" />
        </a>
        <a className="flex mx-2" target="_blank" rel="noreferrer" href="https://www.instagram.com/jimtozzi/?hl=en">
          <InstagramIcon className="w-8 h-8 fill-white opacity-90 hover:opacity-100" />
        </a>
      </div>
    </div>
  );
};

export default Socials;
