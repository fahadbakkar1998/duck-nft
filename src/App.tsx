import './App.scss';
import { isMobile, isSafari } from 'react-device-detect';
import { useWindowSize } from './hooks';
import Desktop from './components/layout/Desktop';
import Mobile from './components/Mobile';

const App = () => {
  const { width } = useWindowSize();
  const isTooSmall = width && width < 750;
  return isMobile || isSafari || isTooSmall ? <Mobile /> : <Desktop />;
};

export default App;
