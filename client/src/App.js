import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Alert from './components/alert/Alert';
import Header from './components/Header';

import PageRender from './PageRender';
import Home from './pages/home';
import Login from './pages/login';

import { refreshToken } from './redux/actions/authAction';



function App() {
  const { authReducer } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <Router>
      <Alert />

      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          { authReducer.token && <Header /> }
          <Route exact path='/' component={ authReducer.token ? Home : Login } />
          <Route exact path='/:page' component={PageRender} />
          <Route exact path='/:page/:id' component={PageRender} />
        </div>
      </div>
    </Router>
  );
}

export default App;
