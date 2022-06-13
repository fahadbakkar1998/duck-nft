import { FC } from 'react';
import { Html } from '@react-three/drei';
import { HtmlProps } from '@react-three/drei/web/Html';
import Providers from '../../../Providers';

const Screen: FC<HtmlProps> = (props) => {
  return (
    <Html {...props}>
      <Providers>
        {props.children}
      </Providers>
    </Html>
  );
};

export default Screen;
