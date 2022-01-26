import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { extend } from '@react-three/fiber'

import useMachineStore from "../../store";
import { useEffect } from 'react';

extend({ TextGeometry })

export const DuckCard = (props: any ) => {    
    const currentDuck = useMachineStore(state => state.currentDuck);
    const updateCurrentDuck = useMachineStore(state => state.updateCurrentDuck);


    const clickAction = () => {
        updateCurrentDuck( { letter: props.letter, number: props.number } );
    }

    const isSelected = () => currentDuck.number == props.number && currentDuck.letter == props.letter;

    return (
        <div 
            id={ `card_${props.letter + props.number}` }
            className="cardImages__item" 
            onClick={ clickAction }
        >
            <div className="cardImages__item__pic"
                style={{
                    border: isSelected() ? '10px solid #00fff3' : 'unset'
                }}
            >
                <img alt="pic" src={props.image.default}></img>
            </div>
            <div className="cardImages__item__number">
                { props.letter + props.number }
            </div>
        </div>
    )
}

export default DuckCard;