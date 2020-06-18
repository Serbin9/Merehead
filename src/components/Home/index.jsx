import { connect } from "react-redux";
import * as operations from "../../redux/operations/operations";
import Home from "./Home";

const mapStateToProps = (store) => {
  return {
    store,
    users: store.users.users,
    error: store.users.error,
    isLoading: store.users.isLoading,
  };
};

const mapDispatchToProps = {
  getUsersAction: operations.getUsers,
  deleteUserAction: operations.deleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
