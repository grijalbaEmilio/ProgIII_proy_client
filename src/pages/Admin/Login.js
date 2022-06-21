import { Button, Tabs } from "antd";
import FormSignUp from "../../components/AdminComponents/Login/FormSignUp";
import FormSignIn from "../../components/AdminComponents/Login/FormSignIn";
import './Login.scss';

import { getAccessToken, getRefreshToken } from "../../api/auth"
import { Routes, Route, Link} from "react-router-dom"


import AdminHome from "./Admin"

const { TabPane } = Tabs;

export default function nn() {

  if (getAccessToken()){
    //console.log('redirecionar');
    
    return (
      <AdminHome>
      </AdminHome>
    )
  }
  return (

    <div className="login">
      <Link className="rerunHome" to={'/'}>Regresar</Link>
        <div className="container">
          <Tabs className="tab" defaultActiveKey="1">
            <TabPane className = "tab__option"tab="Iniciar Sesión" key="1">
              <FormSignIn />
            </TabPane>
            <TabPane className = "tab__option"tab="Registrarme" key="2">
              <FormSignUp />
            </TabPane>
          </Tabs>
        </div >
    </div>
 
        
  );
}
