import { FC } from 'react';
import { Html } from '@react-three/drei';
import { HtmlProps } from '@react-three/drei/web/Html';
import Providers from '../../../Providers';
import ScreenWrapper from './ScreenWrapper';

const Screen: FC<HtmlProps> = (props) => {
  return (
    <Html {...props}>
      <Providers>
        <ScreenWrapper>
          {props.children}
        </ScreenWrapper>
      </Providers>
    </Html>
  );
};

export default Screen;
