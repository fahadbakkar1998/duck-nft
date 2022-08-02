import useMachineStore from '../../store';
import logo from '../../assets/img/logo-base.png';

const TitleImage = () => {
  const { openBurnForm } = useMachineStore();
  return (
    <img
      className="
        title-image
        z-50 absolute
        w-[55%] lg:w-[50%] 2xl:w-[50%]
        left-[12%] -top-[4%] 2xl:-top-[3%]
      "
      src={logo}
      alt="Tozzi Ducks"
    />
  );
};

export default TitleImage;
