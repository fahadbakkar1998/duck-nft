export const distance = 5;

export const targetPoints = [
   {
      x: distance,
      y: 0,
      z: 0,
   },
   {
      x: 0,
      y: 0,
      z: distance,
   },
   {
      x: -distance,
      y: 0,
      z: 0,
   },
   {
      x: 0,
      y: 0,
      z: -distance,
   },
];

export const oneTimeAngle = 90 * Math.PI / 180;

export const letters = [
   'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

export const numbers = [
   '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
];

export const duckButtonSize = {
   x: 0.12,
   y: 0.12,
   z: 0.01
}

export const duckButtonPosInfo = {
   start: {
      x: 1.3,
      y: 1.18,
      z: 1.33
   },
   xOffset: 0.21,
   yOffset: 0.21,
   rowCount: 3,
}

export const cardCount = 200;

export const duckCardPosInfo = {
   start: {
      x: -1.5,
      y: 1.3,
      z: 0.75
   },
   xOffset: 0.6,
   yOffset: 0.7,
   rowCount: 4,
   size: {
      x: 0.5,
      y: 0.5,
      z: 0.01
   }
}

export const cameraProps = {
   fov: 20, position: [30, 0, 0]
}

export const cardImages : any = [];

for( let i = 1; i <= cardCount; i++ ) {
   const image = require('../assets/img/ducks/crypto_duck_' + i + '.svg');
   cardImages.push(image);
}

export const numberPadBtns: any = [];

numbers.forEach((item: string, index: number) => {
   const pIndex = Math.floor(index / duckButtonPosInfo.rowCount);

   if( numberPadBtns.length - 1 < pIndex )
      numberPadBtns.push([]);

   numberPadBtns[ pIndex ].push(item);
})

export const alphabetPadBtns: any = [];

letters.forEach((item: string, index: number) => {
   const pIndex = Math.floor(index / 6);

   if( alphabetPadBtns.length - 1 < pIndex )
   alphabetPadBtns.push([]);

   alphabetPadBtns[ pIndex ].push(item);
});