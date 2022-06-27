import React from "react";

import './Home.scss'

export default function SignIn() {
  return (
    <div className="home-main">
      <h1> <i>
        <b>Sistema de autenticación de usuarios y asignaturas</b>
      </i> </h1>

      <p className="user-admin">Podrá registrarse en el sistema, por defecto se le asignará un rol de coordinador,
        el cuál le permitirá interactuar con un CRUD de asignaturas y visualizar los demás usuarios registrados.
      </p>
      <p className="user-admin">Sólo algunos usuarios con rol de administrador podrán interactuar con el CRUD de
        usuarios en el cuál tendrá la posibilidad de desactivar-activar, eliminar, crear y modificar el rol de otros usuarios.
      </p>

      <div className="user-admin">
        
        <h4>
          Administrador : admin@gmail.com
        </h4>
        <h4>
          Contraseña : 123456
        </h4>
      </div>

    </div>
  );
}
