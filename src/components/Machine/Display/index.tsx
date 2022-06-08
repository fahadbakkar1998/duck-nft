import { FC } from 'react';
import { Html } from '@react-three/drei';
import { useThree } from 'react-three-fiber';
import styles from './styles.module.scss';

interface DisplayProps {
    value?: string;
}

const Display: FC<DisplayProps> = ({ value }) => {
  const { viewport } = useThree();

  return (
    <Html
      scale={[
        1,
        1,
        1,
      ]}
      transform
    >
      <div id="display" className={styles.mainWrap}>
        {value === null ? '' : value}
      </div>
    </Html>
  );
};

export default Display;
