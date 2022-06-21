import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import routes from "../src/config/routes";
import AuthProvider from "./providers/authProvider";
import "./App.scss";

function App() {
  return (
    /* siempro que naveguemos en el sistema se validarà 
    si estamos logueados */
    <AuthProvider>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <route.layout>
                  <route.component></route.component>
                </route.layout>
              }
            ></Route>
          ))}
        </Routes>
      </Router>
    </AuthProvider>
      
  );
}

function Home2() {
  return <h2>componente Home works!</h2>;
}

export default App;

/* function PaRoutes(functionRoute) {
  return functionRoute();
}

function Adminsubroutesviews(route) {
  console.log(route);
  return true;
}

function NotFound() {
  return <h2>Componenete not found!</h2>;
} */

/* function Users() {
  return <h2>Componente contact works!</h2>;
} */

/* craeacion de componentes */

function Users() {
  return <h2>Componente Users works!</h2>;
}

/*function Contact2() {
  return <h2>JComponente contact works!</h2>;
}

function Users() {
  return <h2>Componente contact works!</h2>;
}

*/
/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} */

/* <React.Fragment>
      <Admin></Admin>
      <SignIn></SignIn>
      <Home></Home>
      <Contact></Contact>
    </React.Fragment> */

/* <BrowserRouter>
    <Link to="/">Home</Link>
    <br/>

    <Link to="/contact">Contact</Link>
    <br/>

    <Link to="/users">Users</Link>
    <br/>

      <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="contact" element={<Contact />}></Route>
          <Route path="users" element={<Users />}></Route>
          <Route path = "*" element = {<NotFound/>}></Route>
      </Routes>
    </BrowserRouter> */
