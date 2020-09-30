import React from 'react';
import Button from '@material-ui/core/Button';
import styles from './Header.module.css';

export default function Header() {
  const CopyToClipboard = () => {
    const linkToGame = 'https://tic-tac-toe-serzh108.netlify.app/';
    navigator.clipboard.writeText(linkToGame).then(
      function () {
        alert(`Copy link to clipboard: ${linkToGame}`);
      },
      function (err) {
        alert(`Could not copy link: ${err}`);
      },
    );
  };

  return (
    <>
      <h2 className={styles.header}>Хрестики - нулики</h2>
      <div>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          style={{ marginBottom: '6px' }}
          onClick={CopyToClipboard}
        >
          copy game link to clipboard
        </Button>
      </div>
    </>
  );
}
