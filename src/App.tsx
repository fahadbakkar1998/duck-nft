import './App.scss';
import { isMobile } from 'react-device-detect';
import Desktop from './components/layout/Desktop';
import Mobile from './components/Mobile';

const App = () => {
  return isMobile ? <Mobile /> : <Desktop />;
};

export default App;
