import { Html } from "@react-three/drei";
import styles from './styles.module.scss';

type Props = {
    value?: number;
}

const Display: React.FC<Props> = ({ value }) => {
  return (
    <Html>
        <div id='display' className={styles.mainWrap}>
            {value === 0 ? '' : value}
        </div>
    </Html>
  )
}

export default Display;