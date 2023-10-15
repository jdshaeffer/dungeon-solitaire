import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import './App.css';

const Store = ({ onClose, onOpen, storeFunction, gold, difficulty }) => {
  const [response, setResponse] = useState();

  const handleClose = () => {
    setResponse(null);
    onClose();
  };

  const handleStore = (selection) => {
    if (difficulty === 'easy') {
      if (selection === 1) {
        if (gold >= 5) {
          setResponse('success');
          storeFunction('attack', 1, 5);
        } else {
          setResponse('notEnough');
        }
      } else if (selection === 2) {
        if (gold >= 10) {
          setResponse('success');
          storeFunction('attack', 3, 10);
        } else {
          setResponse('notEnough');
        }
      } else if (selection === 3) {
        if (gold >= 5) {
          setResponse('success');
          storeFunction('health', 10, 5);
        } else {
          setResponse('notEnough');
        }
      }
    } else {
      if (selection === 1) {
        if (gold >= 10) {
          setResponse('success');
          storeFunction('attack', 1, 10);
        } else {
          setResponse('notEnough');
        }
      } else if (selection === 2) {
        if (gold >= 20) {
          setResponse('success');
          storeFunction('attack', 3, 20);
        } else {
          setResponse('notEnough');
        }
      } else if (selection === 3) {
        if (gold >= 5) {
          setResponse('success');
          storeFunction('health', 5, 5);
        } else {
          setResponse('notEnough');
        }
      }
    }
  };

  return (
    <Dialog onClose={handleClose} open={onOpen}>
      <div
        style={{
          color: 'white',
          backgroundColor: '#121E24',
          border: '2px solid white',
        }}
      >
        <DialogTitle>store</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            buy more attack power
            <button onClick={() => handleStore(1)}>
              +1 ({difficulty === 'easy' ? '5' : '10'} gold)
            </button>
            <button onClick={() => handleStore(2)}>
              +3 ({difficulty === 'easy' ? '10' : '20'} gold)
            </button>
          </Typography>
          <Typography gutterBottom>
            buy more health
            {difficulty === 'easy' ? (
              <button onClick={() => handleStore(3)}>+10 (5 gold)</button>
            ) : (
              <button onClick={() => handleStore(3)}>+5 (5 gold)</button>
            )}
          </Typography>
          <Typography gutterBottom>
            {response === 'success' ? (
              <small style={{ color: 'lightgreen' }}>success!</small>
            ) : response === 'notEnough' ? (
              <small style={{ color: 'red' }}>not enough gold</small>
            ) : (
              <small style={{ visibility: 'hidden' }}>-</small>
            )}
          </Typography>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default Store;
