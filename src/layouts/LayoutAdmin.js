import React, { useState, useEffect } from "react";
import { Layout } from "antd";

import MenuTop from "../components/MenuTop";
import MenuSider from "../components/MenuSider";

import { GithubOutlined } from '@ant-design/icons'

import { getAccessToken, getRefreshToken } from "../api/auth";
import useAuth from '../hooks/useAuth'
import "./layoutAdmin.scss";
import SignIn from "../pages/Admin/Login";
import Users from '../pages/Admin/Users'



export default function Layoutadmin(props) {
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const { children } = props;
  const { Header, Content, Footer } = Layout;
  const { user, isLoading } = useAuth()
  const accessToken = getAccessToken()
  const refreshToken = getRefreshToken()

  //console.log("user: "+user+"\nisLoanding: "+ isLoading);

  if (!user && !isLoading) {
    //console.log('nada de user ni logueado');
    return (
      <SignIn>
      </SignIn>
    )
  }
  /* if(user && !isLoading && localStorage.getItem('ROLE') != 'admin'){
    return (
      <Users/>
    )

  } */

  if (user && !isLoading) {
    //console.log('user poro no logueado');
    return (
      <Layout className="layout-admin">
        <MenuSider menuCollapsed={menuCollapsed} />

        <Header className="layout-admin__header">
          <MenuTop
            menuCollapsed={menuCollapsed}
            setMenuCollapsed={setMenuCollapsed}
          />
        </Header>

        <Content className="layout-admin__main">{children}</Content>
        <Footer className="layout-admin__footer">
          <div>react Project 2022</div>
          <a href="https://github.com/grijalbaEmilio" className="github"><GithubOutlined style={{ fontSize: '30px', marginRight:"10px"}} />repositorio Luis Emilio</a>
          <div>{user.user_name} {user.lastname}</div>
        </Footer>
      </Layout>
    )
  }

  return null

}
