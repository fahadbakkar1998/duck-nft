import { Html } from "@react-three/drei";
import styles from './styles.module.scss';
import { minViewLength } from "../../../utils/constants";
import { useThree } from "react-three-fiber";

type Props = {
    value?: number;
}

const Display: React.FC<Props> = ({ value }) => {

  const { viewport } = useThree();  
  const min = viewport.width;
  
  return (
    <Html
      scale={[
        1,
        1,
        1
      ]}
      transform
    >
        <div id='display' className={styles.mainWrap}>
            {value === 0 ? '' : value}
        </div>
    </Html>
  )
}

export default Display;