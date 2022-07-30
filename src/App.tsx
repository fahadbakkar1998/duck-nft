import './App.scss';
import Desktop from './components/layout/Desktop';
import Mobile from './components/Mobile';
import { useIsMobile } from './hooks';

const App = () => {
  const isMobile = useIsMobile();
  return isMobile ? <Mobile /> : <Desktop />;
};

export default App;
