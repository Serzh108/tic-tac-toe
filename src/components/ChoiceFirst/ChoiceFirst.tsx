import React from 'react';
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import styles from './ChoiceFirst.module.css';

interface IProp {
  currentGamer: number;
  ChoiceFirstStep: (e: any) => void;
}
export default function ChoiceFirst({ currentGamer, ChoiceFirstStep }: IProp) {
  return (
    <div onClick={ChoiceFirstStep} className={styles.containerFirstStep}>
      <CloseOutlinedIcon
        id="1"
        style={{ color: '#0b24fb', fontSize: '40' }}
        className={currentGamer === 1 ? styles.signSelected : styles.sign}
      />
      <RadioButtonUncheckedOutlinedIcon
        id="2"
        style={{ color: '#fc2e34', fontSize: '40' }}
        className={currentGamer === 2 ? styles.signSelected : styles.sign}
      />
    </div>
  );
}
