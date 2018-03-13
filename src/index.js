import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch} from 'react-router-dom'

import reducers from './reducer'
import './config'
import Login from "./container/login/login"
import Register from "./container/register/register"
import AuthRoute from "./component/authRoute/authRoute"
import BossInfo from "./container/bossinfo/bossinfo";
import GeniusInfo from "./container/geniusinfo/geniusinfo";
import Chat from "./container/chat/chat";
import Dashboard from "./component/dashboard/dashboard";
import './index.css';

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))
ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute/>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/chat/:user" component={Chat} />
          <Route path="/geniusinfo" component={GeniusInfo} />
          <Route component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
    </Provider>),
  document.getElementById('root')
)