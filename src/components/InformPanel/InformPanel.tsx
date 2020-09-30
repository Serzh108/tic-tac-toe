import React from 'react';
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import styles from './InformPanel.module.css';

interface Option {
  1: number;
  2: number;
}

interface Props {
  score: Option;
  currentGamer: number;
  isCompGamer: boolean;
  isGameOver: boolean;
  handleCheckbox: (event: any) => void;
}

export default function InformPanel({
  score,
  currentGamer,
  isCompGamer,
  isGameOver,
  handleCheckbox,
}: Props) {
  return (
    <>
      <div className={styles.scoreBox}>
        <div>{`Game score: ${score[1]} (`}</div>
        <div className={styles.playerItem}>
          <CloseOutlinedIcon id="1" style={{ color: '#0b24fb' }} />
        </div>
        <div>{`) : ${score[2]} (`}</div>
        <div className={styles.playerItem}>
          <RadioButtonUncheckedOutlinedIcon
            id="2"
            style={{ color: '#fc2e34' }}
          />
        </div>
        {') '}
      </div>

      <div className={styles.playerBox}>
        <p>Current player :</p>
        <div style={{ paddingLeft: '4px' }}>
          {currentGamer === 1 ? (
            <CloseOutlinedIcon id="1" style={{ color: '#0b24fb' }} />
          ) : (
            <RadioButtonUncheckedOutlinedIcon
              id="2"
              style={{ color: '#fc2e34' }}
            />
          )}
        </div>
      </div>

      <div className={styles.playerBox}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isCompGamer}
              color="primary"
              onChange={isGameOver ? handleCheckbox : undefined}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          }
          label="Play with computer"
        />
      </div>
    </>
  );
}
