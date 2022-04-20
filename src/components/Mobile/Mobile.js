import Logo from "./Logo";
import Header from "./Header";
import Ducks from "./Ducks";
import "./Mobile.scss";

function Mobile() {
  return (
    <div className="Mobile">
      <Logo></Logo>
      <Header></Header>
      <Ducks></Ducks>
    </div>
  );
}

export default Mobile;
