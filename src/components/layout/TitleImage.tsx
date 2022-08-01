import useMachineStore from '../../store';
import logo from '../../assets/img/logo-base.png';

const TitleImage = () => {
  const { openBurnForm } = useMachineStore();
  return (
    <img
      className={`
        top-[25.3%] left-[10%] w-[60%] 
        absolute z-50
      `}
      src={logo}
      alt="Tozzi Ducks"
    />
  );
};

export default TitleImage;
