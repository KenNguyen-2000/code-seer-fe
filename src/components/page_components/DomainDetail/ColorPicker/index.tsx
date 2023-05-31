import React from 'react';

import styles from './color-picker.module.scss';

const colorArr = [
  '#E7E7E7',
  '#C2C2C2',
  '#BACFF2',
  '#C0ECD5',
  '#E8DCDE',
  '#A5D5E2',
  '#71D297',
  '#C3F179',
  '#E1D8FC',
  '#51A0B8',
  '#4EA46B',
  '#F9E891',
  '#B39EF8',
  '#5687E0',
  '#5CD6F1',
  '#EDC700',
  '#E897B1',
  '#A27F4B',
  '#F7CAC0',
  '#FF4646',
  '#F355A1',
  '#EF7C48',
  '#6540DE',
  '#A24B59',
];

interface IColorPicker {
  setColor: any;
}

const ColorPicker: React.FC<IColorPicker> = ({ setColor }) => {
  return (
    <div className={styles.wrapper}>
      {colorArr.map((color) => (
        <button
          key={color}
          aria-label={`select ${color}`}
          type='button'
          color={color}
          className={`${styles.color__item}`}
          style={{ background: color }}
          onClick={setColor.bind(null, color)}
        ></button>
      ))}
      <div className={styles.arrow}></div>
    </div>
  );
};

export default ColorPicker;
