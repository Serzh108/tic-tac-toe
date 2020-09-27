import React, { useState, useEffect } from 'react';
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import Button from '@material-ui/core/Button';
import styles from './Board.module.css';

const initialState = [null, null, null, null, null, null, null, null, null];

function Board1() {
  const [state, setState] = useState(initialState);
  const [currentGamer, setcurrentGamer] = useState(1);
  const [isFirstStepChoice, setisFirstStepChoice] = useState(false);
  const [isGameOver, setIsGameOver] = useState(true);
  const [isWinner, setIsWinner] = useState(false);

  useEffect(() => {
    console.log('Rendered! (from useEffect)');
  }, [isGameOver]);

  const selectContent = item => {
    if (item === 2)
      return (
        <RadioButtonUncheckedOutlinedIcon
          style={{ color: '#fc2e34', fontSize: '100' }}
        />
      );
    else if (item === 1)
      return (
        <CloseOutlinedIcon style={{ color: '#0b24fb', fontSize: '100' }} />
      );
  };

  const clickHandler = e => {
    if (e.target.nodeName !== 'DIV') return;
    if (!e.target.id) return;
    const id = Number(e.target.id);
    // console.log('e.target = ', e.target);
    // console.log('e.target.id = ', e.target.id);
    let arr = [...state];
    arr[id] = currentGamer;
    setState([...arr]);
    checkResult(arr);
    currentGamer === 1 ? setcurrentGamer(2) : setcurrentGamer(1);
  };
  // ============ Set =========---============
  const verify = testArray => {
    const set1 = new Set(testArray);
    if (set1.has(null)) return;
    if (set1.size === 1) {
      console.log('Winner gamer # ', testArray[0]);
      // setIsGameOver(true);
      setIsWinner(true);
      return true;
    }
  };

  const checkResult = fieldArr => {
    const downArr = [];
    const upArr = [];

    for (let j = 0; j < 3; j++) {
      const rowArr = [];
      for (let i = j * 3; i < 3 * (j + 1); i++) rowArr.push(fieldArr[i]);
      // for (let i = j * 3; i < 3 * (j + 1); i++) rowArr.push(state[i]);
      if (verify(rowArr)) console.log('Game over!!!');

      const columnArr = [];
      for (let i = 0; i < 3; i++) columnArr.push(fieldArr[i * 3 + j]);
      // for (let i = 0; i < 3; i++) columnArr.push(state[i * 3 + j]);
      if (verify(columnArr)) console.log('Game over!!!');

      downArr.push(fieldArr[j + j * 3]);
      upArr.push(fieldArr[(j + 1) * 2]);
      // downArr.push(state[j + j * 3]);
      // upArr.push(state[(j + 1) * 2]);
    }

    if (verify(downArr)) console.log('Game over!!!');
    if (verify(upArr)) console.log('Game over!!!');
  };

  const restartHandler = () => {
    setState(initialState);
    setIsWinner(false);
    setIsGameOver(prev => !prev);
    setisFirstStepChoice(false);
  };

  const firstStepHandler = () => {
    setisFirstStepChoice(true);
  };

  const ChoiceFirstStep = e => {
    let choicedSign = e.target;
    if (choicedSign.nodeName === 'path') {
      choicedSign = choicedSign.closest('svg');
    }
    if (choicedSign.nodeName !== 'svg') return;
    if (!choicedSign.id) return;
    // console.log('e.target.id = ', choicedSign.id);
    const id = Number(choicedSign.id);
    setcurrentGamer(id);
    setisFirstStepChoice(false);
  };

  return (
    <>
      <div
        className={styles.container}
        onClick={!isGameOver ? clickHandler : undefined}
      >
        {state.map((item, idx) => (
          <div className={styles.item} key={idx} id={idx}>
            {item && selectContent(item)}
          </div>
        ))}
      </div>

      {isWinner && (
        <div className={styles.winBox}>
          <h2 style={{ color: currentGamer === 1 ? '#fc2e34' : '#0b24fb' }}>
            You win!!!
          </h2>
        </div>
      )}

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
      {isGameOver && isFirstStepChoice && (
        <div onClick={ChoiceFirstStep} className={styles.containerFirstStep}>
          <RadioButtonUncheckedOutlinedIcon
            id="2"
            style={{ color: '#fc2e34', fontSize: '40' }}
            className={currentGamer === 2 ? styles.signSelected : styles.sign}
          />
          <CloseOutlinedIcon
            id="1"
            style={{ color: '#0b24fb', fontSize: '40' }}
            className={currentGamer === 1 ? styles.signSelected : styles.sign}
          />
        </div>
      )}
    </>
  );
}

export default Board1;
