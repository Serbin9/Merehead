import * as types from "../types";

const initialState = {
  users: [],
  user: {},
  error: null,
  isLoading: false,
};
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_USERS_STARTED:
    case types.GET_USER_STARTED:
    case types.POST_USER_STARTED:
    case types.PUT_USER_STARTED:
    case types.DELETE_USER_STARTED:
      return { ...state, isLoading: true, error: null };
    case types.GET_USERS_SUCCESS:
      return { ...state, users: action.payload.users, isLoading: false };
    case types.GET_USER_SUCCESS:
    case types.POST_USER_SUCCESS:
    case types.PUT_USER_SUCCESS:
    case types.DELETE_USER_SUCCESS:
      return { ...state, user: action.payload.user, isLoading: false };
    case types.GET_USERS_FAILURE:
    case types.GET_USER_FAILURE:
    case types.POST_USER_FAILURE:
    case types.PUT_USER_FAILURE:
    case types.DELETE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
      };

    default:
      return state;
  }
}
