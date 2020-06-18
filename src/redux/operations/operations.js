import * as actions from "../actions/actions";
import * as types from "../types";
import * as API from "../../services/API";
import axios from "axios";

export const getUsers = (url) => (dispatch) => {
  dispatch(actions.Started(types.GET_USERS_STARTED));
  axios
    .get(url)
    .then((res) => {
      dispatch(actions.Success(types.GET_USERS_SUCCESS, { users: res.data }));
    })
    .catch((error) =>
      dispatch(actions.Failure(types.GET_USERS_FAILURE, { error }))
    );
};

export const getUser = (url) => {
  return (dispatch) => {
    dispatch(actions.Started(types.GET_USER_STARTED));
    axios
      .get(url)
      .then((res) => {
        dispatch(actions.Success(types.GET_USER_SUCCESS, { user: res.data }));
      })
      .catch((error) =>
        dispatch(actions.Failure(types.GET_USER_FAILURE, { error }))
      );
  };
};

export const postUser = (url, user) => (dispatch) => {
  dispatch(actions.Started(types.POST_USER_STARTED));
  axios
    .post(url, user)
    .then((res) => {
      dispatch(actions.Success(types.POST_USER_SUCCESS, { user: res.data }));
    })
    .then(() => {
      dispatch(getUsers(API.URL));
    })
    .catch((error) =>
      dispatch(actions.Failure(types.POST_USER_FAILURE, { error }))
    );
};

export const putUser = (url, user) => (dispatch) => {
  dispatch(actions.Started(types.PUT_USER_STARTED));
  axios
    .put(url, user)
    .then((res) => {
      dispatch(actions.Success(types.PUT_USER_SUCCESS, { user: res.data }));
    })
    .then(() => {
      dispatch(getUsers(API.URL));
    })
    .catch((error) =>
      dispatch(actions.Failure(types.PUT_USER_FAILURE, { error }))
    );
};

export const deleteUser = (url, user) => (dispatch) => {
  dispatch(actions.Started(types.DELETE_USER_STARTED));
  axios
    .delete(url, user)
    .then((res) => {
      dispatch(actions.Success(types.DELETE_USER_SUCCESS, { user: res.data }));
    })
    .then(() => {
      dispatch(getUsers(API.URL));
    })
    .catch((error) =>
      dispatch(actions.Failure(types.DELETE_USER_FAILURE, { error }))
    );
};
