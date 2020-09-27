import React, { useState } from 'react';
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import styles from './Board.module.css';

const initialState = [
  [0],
  [null],
  [null],
  [null],
  [null],
  [0],
  [1],
  [null],
  [null],
];

function Board() {
  const [state, setState] = useState(initialState);

  const selectContent = (item: number[] | null[]) => {
    if (item[0] === 0)
      return (
        <RadioButtonUncheckedOutlinedIcon
          style={{ color: '#fc2e34', fontSize: '80' }}
        />
      );
    else if (item[0] === 1)
      return <CloseOutlinedIcon style={{ color: '#0b24fb', fontSize: '80' }} />;
  };

  // const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  const clickHandler = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    const x = e;
    console.log('Click!!! e.target = ', x.target);
    console.log('Click!!! e.currentTarget = ', e.currentTarget);
  };

  return (
    // <div className={styles.container} onClick={clickHandler}>
    //   {state.map((item, idx) => <div className={styles.item} key={idx} id={"" + idx}>
    //     {/* {idx % 2 === 0 ? <RadioButtonUncheckedOutlinedIcon style={{ color: '#fc2e34', fontSize: '80' }} /> : <CloseOutlinedIcon style={{ color: '#0b24fb', fontSize: '80' }} />} */}
    //     {item && selectContent(item)}
    //     </div>)}
    // </div>

    <ul className={styles.container} onClick={clickHandler}>
      {state.map((item, idx) => (
        <li className={styles.item} key={idx} data-id={'' + idx}>
          {/* {idx % 2 === 0 ? <RadioButtonUncheckedOutlinedIcon style={{ color: '#fc2e34', fontSize: '80' }} /> : <CloseOutlinedIcon style={{ color: '#0b24fb', fontSize: '80' }} />} */}
          {item && selectContent(item)}
        </li>
      ))}
    </ul>
  );
}

export default Board;
