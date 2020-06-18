import { connect } from "react-redux";
import UserForm from "./UserForm";
import * as operations from "../../redux/operations/operations";

const mapStateToProps = (store) => {
  return {
    user: store.users.user,
  };
};
const mapDispatchToProps = {
  getApiUser: operations.getUser,
  putApiUser: operations.putUser,
  postApiUser: operations.postUser,
  deleteApiUser: operations.deleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
