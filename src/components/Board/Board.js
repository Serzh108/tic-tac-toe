import React, { useState, useEffect } from 'react';
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
// import Button from '@material-ui/core/Button';
// import Checkbox from '@material-ui/core/Checkbox';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import InformPanel from '../InformPanel/InformPanel.tsx';
import Winner from '../Winner/Winner';
import ControlButtons from '../ControlButtons/ControlButtons';
import ChoiceFirst from '../ChoiceFirst/ChoiceFirst';
import styles from './Board.module.css';

const initialField = [null, null, null, null, null, null, null, null, null];
const initialScore = {
  1: 0,
  2: 0,
};
const initialGameState = {
  currentGamer: 1,
  isGameOver: true,
  isWinner: false,
  isNoWinner: false,
  score: {
    1: 0,
    2: 0,
  },
};

function Board() {
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

  const [gameState, setGameState] = useState(initialGameState);
  // console.log('gameState.score = ', gameState.score[1]);

  const compStep = curField => {
    let next;
    do {
      next = Math.floor(Math.random() * 9);
    } while (curField[next] !== null);
    return next;
  };

  useEffect(() => {
    console.log('Rendered! (from useEffect)');
    // setGameState(prev => ({...prev, "currentGamer": 2}));
    // setGameState(prev => ({...prev, "score": {...prev.score, 1: 5}}));
  }, []);

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
      {/* <div className={styles.scoreBox}>
        <div>{`Game score: ${score[1]} (`}</div>
        <div style={{ paddingTop: '4px' }}>
          <CloseOutlinedIcon id="1" style={{ color: '#0b24fb' }} />
        </div>
        <div>{`) : ${score[2]} (`}</div>
        <div style={{ paddingTop: '4px' }}>
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
      </div> */}

      {/* <div className={styles.playerBox}>
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
      </div> */}

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
      {/* {isWinner && (
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
      )} */}

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
      {/* <Button
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
      )} */}

      {isGameOver && isFirstStepChoice && (
        <ChoiceFirst
          currentGamer={currentGamer}
          ChoiceFirstStep={ChoiceFirstStep}
        />
      )}
      {/* {isGameOver && isFirstStepChoice && (
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
      )} */}
    </>
  );
}

export default Board;
