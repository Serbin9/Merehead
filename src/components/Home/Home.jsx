import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import routes from "../../routes";
import * as API from "../../services/API";
import Styles from "./Home.module.css";
const Home = ({ getUsersAction, users }) => {
  const history = useHistory();
  const [usersPage, setUsersPage] = useState([]);
  const [page, setPage] = useState(1);
  const [currentUsers, setCurrentUsers] = useState([]);
  useEffect(() => {
    if (users.length === 0) {
      getUsersAction(API.URL);
    }
    if (users.length !== 0 && users !== currentUsers) {
      setCurrentUsers(users);
      const newUsers = users.reduce(
        (acc, item) => {
          if (+acc[acc.length - 1].length === 5) {
            acc.push([]);
          }
          acc[acc.length - 1].push(item);
          return acc;
        },
        [[]]
      );
      setUsersPage(newUsers);
    }
  }, [getUsersAction, users, usersPage, setUsersPage, currentUsers]);

  const userEdit = (e) => {
    history.push(`${routes.EditPage.to}${e.target.id}`);
  };

  const userCreate = (e) => {
    history.push(routes.CreatePage.path);
  };

  const plus = () => {
    if (usersPage.length > page) {
      setPage(page + 1);
    }
  };

  const minus = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className={Styles.section}>
      <div className={Styles.create_wrap}>
        <button className={Styles.create} type="button" onClick={userCreate}>
          add User <span className={Styles.add}>+</span>
        </button>
      </div>
      {!!usersPage.length && (
        <>
          <ul className={Styles.list}>
            {!!usersPage.length &&
              usersPage[page - 1].map((user) => (
                <li key={user.id} className={Styles.item}>
                  <h3 className={Styles.fullName}>
                    {user.name} {user.surname}
                  </h3>
                  <p className={Styles.desc}>{user.desc}</p>
                  <div>
                    <button
                      type="button"
                      onClick={userEdit}
                      id={user.id}
                      className={Styles.edit}
                    >
                      edit
                    </button>
                  </div>
                </li>
              ))}
            <div className={Styles.pagination}>
              <button
                className={page > 1 ? Styles.btn : Styles.disable}
                type="button"
                onClick={minus}
              >
                -
              </button>
              <span className={Styles.page}>{page}</span>
              <button
                className={
                  page < usersPage.length ? Styles.btn : Styles.disable
                }
                type="button"
                onClick={plus}
              >
                +
              </button>
            </div>
          </ul>
        </>
      )}
    </div>
  );
};

Home.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      surname: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
    })
  ).isRequired,
  getUsersAction: PropTypes.func.isRequired,
};
export default Home;
