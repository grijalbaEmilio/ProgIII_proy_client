import React, { useState, useEffect } from "react";
import "./User.scss";
import { getActiveUsers } from "../../../api/user";
import { getAccessToken } from "../../../api/auth";
import ListUsers from "../../../components/AdminComponents/Users/ListUser";

export default function Users() {
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);
  const token = getAccessToken();

  useEffect(() => {
    /* Validamos el active que es el segundo param
    si es true carga un object con usuarios activos */
    getActiveUsers(token, true).then((response) => {
      setUsersActive(response.users);
    });

    /* Validamos el active que es el segundo param
    si es false carga un object con usuarios inactivos */
    getActiveUsers(token, false).then((response) => {
      setUsersInactive(response.users);
    });
    
    setReloadUsers(false);
  }, [token, reloadUsers]);

  return (
    <div>
      <ListUsers
        usersActive={usersActive}
        usersInactive={usersInactive}
        setReloadUsers={setReloadUsers}
      />
    </div>
  );
}
