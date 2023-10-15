import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Game from './Game';
import Intro from './Intro';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <Router>
          <Switch>
            <Route exact path='/dungeon-solitaire'>
              <Intro />
            </Route>
            <Route exact path='/dungeon-solitaire/easy'>
              <Game difficulty='easy' />
            </Route>
            <Route exact path='/dungeon-solitaire/hard'>
              <Game difficulty='hard' />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
};

export default App;
