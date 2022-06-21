import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/Layoutbasic";
/* página del aldministrador */
import AdminHome from "../pages/Admin";
import NotFound from "../pages/Notfound"
import Home from "../pages/Home"
import Contact from "../pages/contact"
import Users from '../pages/Admin/Users'

import mongo from "../pages/tecnologies/mongo";
import node from "../pages/tecnologies/node";
import react from "../pages/tecnologies/react";

import scss from "../pages/tecnologies/scss";

/* Arreglo de rutas disponibles para el adminidtrador */

const routesAdmin = [
  {
    /* para ingresar al home del admin derá http://localhost:3000/admin */
    path: "/admin",
    component: AdminHome,
    layout : LayoutAdmin,
    exact: true,
  },{
    path : "/admin/users",
    component : Users,
    layout : LayoutAdmin
  },
  {
    path: "admin/tecnologies/mongo",
    component: mongo,
    layout : LayoutAdmin,
    exact: true,
  },
  {
    path: "/admin/tecnologies/node",
    component: node,
    layout : LayoutAdmin,
    exact: true,
  },
  {
    path: "/admin/tecnologies/react",
    component: react,
    layout : LayoutAdmin,
    exact: true,
  },
  {
    path: "/admin/tecnologies/scss",
    component: scss,
    layout : LayoutAdmin,
    exact: true,
  }
];

const routesClient = [
  {
    path: "/",
    component: Home,
    layout : LayoutBasic,
    exact: true,
  },{
    path : "/contact",
    layout : LayoutBasic,
    component : Contact
  }
]

const routeNotFound = [
  {
    path: "*",
    component: NotFound,
    layout : LayoutBasic,
    exact: true,
  }
]

export default [routesAdmin, routesClient, routeNotFound].flat();
//export default [...routesAdmin, ...routesClient];
