import React, { useContext } from "react";
import { AuthContext } from "../providers/authProvider";

export default () => useContext(AuthContext)
/* useAuth devuelve el contexto, el contexto es el children de authProvider */
