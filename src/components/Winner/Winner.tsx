import React from 'react';
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import styles from './Winner.module.css';

interface Prop {
  currentGamer: number;
}

export default function Winner({ currentGamer }: Prop) {
  return (
    <>
      <div className={styles.winBox}>
        {currentGamer === 1 ? (
          <CloseOutlinedIcon
            id="1"
            style={{
              color: '#0b24fb',
              fontSize: '1.5em',
              paddingRight: '6px',
              alignSelf: 'center',
            }}
          />
        ) : (
          <RadioButtonUncheckedOutlinedIcon
            id="2"
            style={{
              color: '#fc2e34',
              fontSize: '1.5em',
              paddingRight: '6px',
              alignSelf: 'center',
            }}
          />
        )}
        <h2 style={{ color: currentGamer === 1 ? '#0b24fb' : '#fc2e34' }}>
          - you win!!!
        </h2>
      </div>
    </>
  );
}
