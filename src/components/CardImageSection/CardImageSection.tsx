import { Html, Scroll } from '@react-three/drei';
import { Children, useEffect, useRef } from 'react';
import useMachineStore from "../../store";
import './style.css'
import { letters, numbers } from '../../utils/constants';
import DuckCard from '../DuckCard/DuckCardHTML';

export const CardImageSection = ({ cardImages, isFront, setdy, getScroll}: any) => {
    const currentDuck = useMachineStore(state => state.currentDuck);

    const container = useRef(null);
      
    useEffect(() => {
        const wrapper = document.getElementsByClassName('cardImages')[0];
        const el = document.getElementById(`card_${ currentDuck.letter + currentDuck.number }`) || { offsetTop: 0 };
    }, [currentDuck]);

    return (
        <Html 
            ref={container}
            style={{pointerEvents: 'auto'}}
            zIndexRange={[ 11, -10 ]}
            distanceFactor={ 1.1 }
            position={[ -0.55, 0.5, 1.2 ]}
            rotation={[ 0, 0, 0 ]}
            transform
            occlude
        >
            <div id="cardImages" className="cardImages">
                {
                    cardImages.map((item: any, index: any) => (
                        <DuckCard
                        key={ index }
                        image={ item }
                        letter={ letters[ Math.floor(index / numbers.length) ] }
                        number={ numbers[ index % numbers.length ] }
                        />
                    ))
                }
            </div>
        </Html>
    )
}

export default CardImageSection;
