import useMachineStore from '../../store';
import logo from '../../assets/img/logo-base.png';

const TitleImage = () => {
  const { openBurnForm } = useMachineStore();
  return (
    <img
      className={`
        top-0 xl:top-[3%] xl:left-[12%] left-[10%] w-[50%] xl:w-[48%]
        absolute z-50
      `}
      src={logo}
      alt="Tozzi Ducks"
    />
  );
};

export default TitleImage;
