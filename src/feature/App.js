import React, { Suspense } from 'react';
import { Switch, Route, NavLink, BrowserRouter } from 'react-router-dom';

/* import ProgressiveScroll from './ProgressiveScroll/App';
import TicTacToe from './TicTacToe/App';
import HackerNews from './HackerNews/App'; */

const ProgressiveScroll = React.lazy(() => import('./ProgressiveScroll/App'));
const TicTacToe = React.lazy(() => import('./TicTacToe/App'));
const HackerNews = React.lazy(() => import('./HackerNews/App'));

const App = _props => {
  return (
    <BrowserRouter>
      <ul className='nav nav-tabs'>
        <li className='nav-item'>
          <NavLink className='nav-link'
            exact to='/'
            activeClassName='active'>Home</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link'
            exact to='/infinite-scroll'
            activeClassName='active'>Infinite Scroll</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link'
            exact to='/tic-tac-toe'
            activeClassName='active'>Tic-Tac-Toe</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link'
            to='/hackernews'
            activeClassName='active'>Hacker News</NavLink>
        </li>
      </ul>
      <Switch>
        <Route exact path="/">
          <div className="container">
            <h1>Welcome to React Express</h1>
          </div>
        </Route>
        <Route exact path="/infinite-scroll">
          <Suspense fallback={<div>Loading...</div>}>
            <ProgressiveScroll />
          </Suspense>
        </Route>
        <Route exact path="/tic-tac-toe">
          <Suspense fallback={<div>Loading...</div>}>
            <TicTacToe />
          </Suspense>
        </Route>
        <Route path="/hackernews">
          <Suspense fallback={<div>Loading...</div>}>
            <HackerNews />
          </Suspense>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;