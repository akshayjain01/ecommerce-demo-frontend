import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />

      </Switch>
  </BrowserRouter>

, document.getElementById('root'));
registerServiceWorker();
