import { Suspense } from 'react';
import './App.scss';
import { isMobile, isSafari } from 'react-device-detect';
import Desktop from './components/layout/Desktop';
import Mobile from './components/Mobile';

const App = () => {
  return isMobile || isSafari ? <Mobile /> : <Desktop />;
};

export default App;
