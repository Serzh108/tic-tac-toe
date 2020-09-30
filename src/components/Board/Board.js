import React, { useState } from 'react';
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import InformPanel from '../InformPanel/InformPanel.tsx';
import Winner from '../Winner/Winner';
import ControlButtons from '../ControlButtons/ControlButtons';
import ChoiceFirst from '../ChoiceFirst/ChoiceFirst';
import compStep from '../../services/services.ts';
import styles from './Board.module.css';

const initialField = [null, null, null, null, null, null, null, null, null];
const initialScore = {
  1: 0,
  2: 0,
};

export default function Board() {
  const [field, setField] = useState(initialField);
  const [currentGamer, setCurrentGamer] = useState(1);
  const [isFirstStepChoice, setisFirstStepChoice] = useState(false);
  const [isGameOver, setIsGameOver] = useState(true);
  const [isWinner, setIsWinner] = useState(false);
  const [isNoWinner, setIsNoWinner] = useState(false);
  const [score, setScore] = useState(initialScore);

  const [isCompGamer, setIsCompGamer] = useState(false);
  const handleCheckbox = event => {
    setIsCompGamer(event.target.checked);
  };

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

    let arr = [...field];
    arr[id] = currentGamer;
    setField([...arr]);
    const finishGame = checkResult(arr);

    if (!isCompGamer && !finishGame) {
      currentGamer === 1 ? setCurrentGamer(2) : setCurrentGamer(1);
    }

    if (isCompGamer && !finishGame) {
      let compGamer = 2;
      currentGamer === 1 ? (compGamer = 2) : (compGamer = 1);
      arr[compStep(arr)] = compGamer;
      setField([...arr]);
      checkResult(arr);
    }
  };

  const verify = testArray => {
    const set1 = new Set(testArray);
    if (set1.has(null)) return;
    if (set1.size === 1) {
      console.log('Winner - gamer # ', testArray[0]);
      const winner = '' + testArray[0];
      setScore(prev => ({ ...prev, [winner]: prev[winner] + 1 }));
      setIsGameOver(true);
      setIsWinner(true);
      setCurrentGamer(testArray[0]);
      return true;
    }
  };

  const verifyNoWinner = testArray => {
    const set1 = new Set(testArray);
    if (set1.has(null)) return false;
    console.log('No winner!!!');
    setIsGameOver(true);
    setIsNoWinner(true);
    return true;
  };

  const checkResult = fieldArr => {
    const downArr = [];
    const upArr = [];
    let gameOver = false;

    for (let j = 0; j < 3; j++) {
      const rowArr = [];
      for (let i = j * 3; i < 3 * (j + 1); i++) rowArr.push(fieldArr[i]);
      if (verify(rowArr)) gameOver = true;

      const columnArr = [];
      for (let i = 0; i < 3; i++) columnArr.push(fieldArr[i * 3 + j]);
      if (verify(columnArr)) gameOver = true;

      downArr.push(fieldArr[j + j * 3]);
      upArr.push(fieldArr[(j + 1) * 2]);
    }

    if (verify(downArr)) gameOver = true;
    if (verify(upArr)) gameOver = true;

    if (!gameOver) {
      verifyNoWinner(fieldArr) && (gameOver = true);
    }

    gameOver && console.log('GAME OVER!!!');
    return gameOver;
  };

  const restartHandler = () => {
    setField(initialField);
    setIsWinner(false);
    setIsGameOver(prev => !prev);
    setisFirstStepChoice(false);
    setIsNoWinner(false);
  };

  const firstStepHandler = () => {
    setisFirstStepChoice(true);
    setIsWinner(false);
  };

  const ChoiceFirstStep = e => {
    let choicedSign = e.target;
    if (choicedSign.nodeName === 'path') {
      choicedSign = choicedSign.closest('svg');
    }
    if (choicedSign.nodeName !== 'svg') return;
    if (!choicedSign.id) return;
    const id = Number(choicedSign.id);
    setCurrentGamer(id);
    setisFirstStepChoice(false);
  };

  return (
    <>
      <InformPanel
        score={score}
        currentGamer={currentGamer}
        isCompGamer={isCompGamer}
        isGameOver={isGameOver}
        handleCheckbox={handleCheckbox}
      />

      <div
        className={styles.container}
        onClick={!isGameOver && !isWinner ? clickHandler : undefined}
      >
        {field.map((item, idx) => (
          <div className={styles.item} key={idx} id={idx}>
            {item && selectContent(item)}
          </div>
        ))}
      </div>

      {isWinner && <Winner currentGamer={currentGamer} />}

      {isNoWinner && (
        <div className={styles.winBox}>
          <h2 style={{ color: '#fff' }}>No winner!!!</h2>
        </div>
      )}

      <ControlButtons
        isGameOver={isGameOver}
        restartHandler={restartHandler}
        firstStepHandler={firstStepHandler}
      />

      {isGameOver && isFirstStepChoice && (
        <ChoiceFirst
          currentGamer={currentGamer}
          ChoiceFirstStep={ChoiceFirstStep}
        />
      )}
    </>
  );
}
