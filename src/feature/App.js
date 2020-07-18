import React from 'react';
import { Switch, Route, Link, BrowserRouter } from 'react-router-dom';

import ProgressiveScroll from './ProgressiveScroll/App';
import TicTacToe from './TicTacToe/App';

const App = _props => {
  return (
    <BrowserRouter>
      <nav className="nav">
        <Link className="nav-link" to="/">
          Home
          </Link>
        <Link className="nav-link" to="/infinite-scroll">
          Infinite Scroll
          </Link>
        <Link className="nav-link" to="/tic-tac-toe">
          Tic-Tac-Toe
          </Link>
      </nav>
      <Switch>
        <Route exact path="/">
          <div className="container">
            <h1>Welcome to React Express</h1>
          </div>
        </Route>
        <Route exact path="/infinite-scroll" component={ProgressiveScroll} />
        <Route exact path="/tic-tac-toe" component={TicTacToe} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;