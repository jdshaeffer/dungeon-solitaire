import { Routes, Route } from 'react-router-dom';
import Game from './Game';
import Intro from './Intro';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <Routes>
          <Route exact path='/' element={<Intro />} />
          <Route exact path='/easy' element={<Game difficulty='easy' />} />
          <Route exact path='/hard' element={<Game difficulty='hard' />} />
        </Routes>
      </header>
    </div>
  );
};

export default App;
