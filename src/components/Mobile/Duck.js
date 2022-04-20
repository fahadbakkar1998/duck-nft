import "./Duck.scss";
import "react-responsive-modal/styles.css";
import useMobileStore from "../../store/mobileStore";

const Duck = (props) => {
  const mobileStore = useMobileStore((state) => state);
  const { setIsOpenDuckModal, setCurDuckId } = mobileStore;

  return (
    <div className="Duck">
      <img
        className="duck"
        onClick={() => {
          setCurDuckId(props.id);
          setIsOpenDuckModal(true);
        }}
        src={`data:image/webp;base64,${props.webp}`}
        alt=""
      ></img>
    </div>
  );
};

export default Duck;
