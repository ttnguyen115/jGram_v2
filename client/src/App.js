import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Alert from './components/alert/Alert';
import Header from './components/header/Header';
import StatusModal from './components/StatusModal';

import PageRender from './customRouter/PageRender';
import PrivateRouter from './customRouter/PrivateRouter';

import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';

import { refreshToken } from './redux/actions/authAction';
import { getPosts } from './redux/actions/postAction';
import { getSuggestions } from './redux/actions/suggestionAction';
import { getNotifies } from './redux/actions/notifyAction';
import { GLOBALTYPES } from './redux/actions/globalTypes';

import io from 'socket.io-client';
import SocketClient from './SocketClient';

function App() {
  const { authReducer, statusReducer, modalReducer } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
    
    const socket = io();
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);
  
  useEffect(() => {
    if (authReducer.token) {
      dispatch(getPosts(authReducer.token));
      dispatch(getSuggestions(authReducer.token));
      dispatch(getNotifies(authReducer.token));
    }
  }, [dispatch, authReducer.token]);

  return (
    <Router>
      <Alert />

      <input type="checkbox" id="theme" />
      <div className={`App ${(statusReducer || modalReducer) && 'mode'}`}>
        <div className="main">
          { authReducer.token && <Header /> }
          { statusReducer && <StatusModal /> }
          { authReducer.token && <SocketClient /> }
          
          <Route exact path='/' component={ authReducer.token ? Home : Login } />
          <Route exact path='/register' component={ Register } />
          
          <PrivateRouter exact path='/:page' component={PageRender} />
          <PrivateRouter exact path='/:page/:id' component={PageRender} />
        </div>
      </div>
    </Router>
  );
}

export default App;
