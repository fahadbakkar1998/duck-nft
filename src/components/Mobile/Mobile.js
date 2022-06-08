import Logo from './Logo';
import Header from './Header';
import Ducks from './Ducks';
import './Mobile.scss';

const Mobile = () => {
  return (
    <div className="Mobile">
      <Logo />
      <Header />
      <Ducks />
    </div>
  );
};

export default Mobile;
