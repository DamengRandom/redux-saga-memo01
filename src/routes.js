import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const Loading = () => <div>Loading ...</div>;
const TodoDashboard = Loadable({
  loader: () => import('./App'),
  loading: Loading
});
const TodoUpdateContainer = Loadable({
  loader: () => import('./containers/todo/updateTodo'),
  loading: Loading
});

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={TodoDashboard} exact={true} />
          <Route path="/update/:id" component={TodoUpdateContainer} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
