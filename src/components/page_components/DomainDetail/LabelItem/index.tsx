import React, { useState } from 'react';
import ColorPicker from '../ColorPicker';

import styles from './label-item.module.scss';
import { useAppDispatch } from '@/redux/reduxHooks';
import { IMapLabel } from '@/interfaces';
import { updateLabel } from '@/redux/slices/mapSlice';

interface ILabelItem {
  data: IMapLabel;
  changeLabel: any;
}

type TimerId = ReturnType<typeof setTimeout>;

const LabelItem: React.FC<ILabelItem> = ({ data, changeLabel }) => {
  const { id, color, name } = data;

  const dispatch = useAppDispatch();

  const [selectedColor, setSelectedColor] = useState(color);
  const [currentName, setCurrentName] = useState(name);
  const [showPicker, setShowPicker] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const handleOnChange = (e: any) => {
    setCurrentName(e.target.value);
    dispatch(
      updateLabel({ id: id, color: selectedColor, name: e.target.value })
    );
  };

  const handleChangeColor = (color: string) => {
    setSelectedColor(color);
    dispatch(updateLabel({ id: id, color: color, name: currentName }));
    setShowPicker(false);
    setIsChanged(true);
  };

  const handleUpdate = () => {
    if (isChanged) {
      setIsChanged(false);
      changeLabel(data);
    }
  };

  return (
    <form className='w-full group cursor-pointer'>
      <fieldset className='flex items-center p-0'>
        {showPicker && <ColorPicker setColor={handleChangeColor} />}
        <button
          type='button'
          color={selectedColor}
          title={currentName}
          aria-label={`${currentName} - ${selectedColor} - click to change`}
          className={styles.label__item__color__btn}
          style={{ background: selectedColor }}
          onClick={() => setShowPicker(true)}
        ></button>
        <input
          type='text'
          aria-label={`Rename ${currentName}`}
          title={currentName}
          required
          placeholder='Label name'
          className={styles.label__item__text}
          value={currentName}
          onChange={handleOnChange}
        />
        <button
          aria-label='Remove label'
          type='button'
          className='w-5 h-5 flex items-center justify-center hover:bg-light_gray rounded-md opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100'
          onClick={handleUpdate}
        >
          {isChanged ? 'v' : 'x'}
        </button>
      </fieldset>
    </form>
  );
};

export default LabelItem;
