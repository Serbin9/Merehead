import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";
import routes from "../../routes";
import * as API from "../../services/API";
import Styles from "./UserForm.module.css";

const UserForm = ({
  putApiUser,
  postApiUser,
  getApiUser,
  deleteApiUser,
  user,
}) => {
  const [state, setState] = useState({
    name: "",
    surname: "",
    desc: "",
    id: "",
  });
  const [mount, setMount] = useState(true);
  const match = useRouteMatch();
  const history = useHistory();
  const { id } = match.params;
  const pageEdit = match.path.includes("edit") || false;
  useEffect(() => {
    if (!pageEdit) return;
    if (mount) {
      getApiUser(API.UserUrl + id);
      setMount(false);
    }
    if (user !== state.user && user.id) {
      setState({ ...user });
    }
  }, [getApiUser, id, mount, pageEdit, state.user, user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, surname, desc, id } = state;
    const user = { name, surname, desc };
    const apiPut = () => putApiUser(`${API.UserUrl}${id}`, user);
    const apiPost = () => postApiUser(API.URL, user);
    const replace = () => history.replace(routes.HomePage.path);
    if (pageEdit) {
      apiPut();
      replace();
    } else {
      apiPost();
      replace();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const hanleGoBack = () => {
    history.replace(routes.HomePage.path);
  };

  const handleUserDelete = (e) => {
    const { id } = state;
    const apiDelete = () => deleteApiUser(`${API.UserUrl}${id}`);
    const replace = () => history.replace(routes.HomePage.path);
    apiDelete();
    replace();
  };

  const { name, surname, desc } = state;
  return (
    <div className={Styles.section}>
      <form className={Styles.form} method="put" onSubmit={handleSubmit}>
        <div className={Styles.back_wrap}>
          <button className={Styles.back} type="button" onClick={hanleGoBack}>
            Go back
          </button>
        </div>
        <label htmlFor="name" className={Styles.label}>
          <input
            className={Styles.input}
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleChange}
            placeholder="Input name"
          />
        </label>
        <label htmlFor="surname" className={Styles.label}>
          <input
            className={Styles.input}
            type="text"
            name="surname"
            id="surname"
            value={surname}
            onChange={handleChange}
            placeholder="Input surname"
          />
        </label>
        <label htmlFor="desc" className={Styles.lsbel}>
          <textarea
            className={Styles.textarea}
            type="text"
            name="desc"
            id="desc"
            value={desc}
            onChange={handleChange}
            placeholder="Input description"
            rows={3}
          />
        </label>
        <div className={Styles.wrap_button}>
          <button className={Styles.submit} type="submit">
            {pageEdit ? "EDIT" : "CREATE"}
          </button>
          {pageEdit && (
            <button
              className={Styles.delete}
              type="button"
              onClick={handleUserDelete}
            >
              delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

UserForm.defaultProps = {
  user: {
    id: 0,
    name: "",
    surname: "",
    desc: "",
  },
};
UserForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    surname: PropTypes.string,
    desc: PropTypes.string,
  }),
  putApiUser: PropTypes.func.isRequired,
  postApiUser: PropTypes.func.isRequired,
  getApiUser: PropTypes.func.isRequired,
  deleteApiUser: PropTypes.func.isRequired,
};
export default UserForm;
