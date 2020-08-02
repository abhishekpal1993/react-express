import React from 'react';
import { Switch, Route, NavLink, BrowserRouter, Redirect } from 'react-router-dom';
import Stories from "./components/Stories/Stories";

import classes from './App.module.scss';

const App = () => {
  return (
    <BrowserRouter basename="/hackernews">
      <ul className={["nav nav-pills justify-content-center", classes.main].join(" ")}>
        <li className='nav-item'>
          <NavLink className='nav-link'
            exact to='/topstories'
            activeClassName='active'>Top Articles</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link'
            exact to='/newstories'
            activeClassName='active'>New Articles</NavLink>
        </li>
      </ul>
      <Switch>
        <Route exact path='/'>
          <Redirect to="./topstories" />
        </Route>
        <Route exact path='/topstories'>
          <div className={["container", classes.main].join(" ")}>
            <Stories title={'Top Articles'}
              url={'https://hacker-news.firebaseio.com/v0/topstories.json'} />
          </div>
        </Route>
        <Route exact path='/newstories'>
          <div className={["container", classes.main].join(" ")}>
            <Stories title={'New Articles'}
              url={'https://hacker-news.firebaseio.com/v0/newstories.json'} />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
