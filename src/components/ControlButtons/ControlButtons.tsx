import React from 'react';
import Button from '@material-ui/core/Button';
import styles from './ControlButtons.module.css';

interface IProps {
  isGameOver: boolean;
  restartHandler: () => void;
  firstStepHandler: () => void;
}
export default function ControlButtons({
  isGameOver,
  restartHandler,
  firstStepHandler,
}: IProps) {
  return (
    <>
      <Button
        variant="contained"
        size="large"
        color="primary"
        style={{ marginBottom: '20px' }}
        onClick={restartHandler}
      >
        {isGameOver ? 'Start' : 'Restart'}
      </Button>
      {isGameOver && (
        <Button
          variant="contained"
          size="large"
          color="primary"
          style={{ marginBottom: '10px' }}
          onClick={firstStepHandler}
        >
          Choice first step
        </Button>
      )}
    </>
  );
}
