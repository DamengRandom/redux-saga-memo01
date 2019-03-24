import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { createStructuredSelector, createSelector } from 'reselect';
import {
  CREATE_TODO_REQUEST,
} from '../../constants';
import { disableButton } from '../../actions';
import { makeSelectLoadingStatus } from '../../selectors';

class CreateTodo extends React.Component {
  state = {
    currentTodo: ''
  };

  handleValueChange = (event) => {
    this.setState({
      currentTodo: event.target.value
    });
  }

  render() {
    // console.log('loading status', this.props.loading)
    return (
      <React.Fragment>
        <h6>Create Todo</h6>
        <form>
          <input
            type="text"
            value={this.state.currentTodo}
            onChange={
              (event) => this.handleValueChange(event)
            } />
          <button
            type="submit"
            onClick={ (event) => {
              const todoObject = {
                task: this.state.currentTodo,
                toggle: false
              };
              event.preventDefault();
              this.props.onRequestToCreateTodo(todoObject);
              this.props.onRequestDisableButton(true);
              setTimeout(
                () => this.setState({ currentTodo: '' }), 0);
            }}
            disabled={this.props.loading}>
            Create
          </button>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  // try to understand how selector works:
  // const selectStatus = () => {
  //   return state.status;
  // };
  // const loading = () => createSelector(selectStatus, state => {
  //   return state.get('loading');
  // });
  // console.log('loading value from selector', loading()());
  return {
    todos: state.todo.todos,
    // loading: loading()(),
    loading: makeSelectLoadingStatus()(), // will be refactored by using createdStructuredSelector
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRequestToCreateTodo: todo =>
      dispatch({ type: CREATE_TODO_REQUEST, payload: todo }),
    onRequestDisableButton: loadingStatus =>
      dispatch(disableButton(loadingStatus)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(CreateTodo);
