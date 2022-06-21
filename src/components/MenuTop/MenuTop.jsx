import React from "react"
import Logo from "../../assetts/img/png/Logo.png"
import {Button} from "antd"
import {MenuUnfoldOutlined, MenuFoldOutlined, PoweroffOutlined} from '@ant-design/icons'
import "./MenuTop.scss"

import {logout} from "../../api/auth"

export default function MenuTop(props){
    const { menuCollapsed, setMenuCollapsed} = props

    const userLogout = () =>{
        //console.log('cerrando sesiòn');
        logout()
        window.location.reload()
    }

    //console.log(menuCollapsed);
    //console.log('set --> ',setMenuCollapsed);

    return (
       <> 

        <div className = "menu-top">
            <div className = "menu-top__left">
                <img className = "menu-top__left-logo" src={Logo} alt="Alternate"/>
                <Button  type = 'link' onClick={()=>setMenuCollapsed(!menuCollapsed)}>
                    {menuCollapsed ? <MenuUnfoldOutlined className="menu-top__collapsed" /> : <MenuFoldOutlined className="menu-top__collapsed"/>}
                </Button>
            </div>
            <div className = "Menu-top__right">
                <Button type="link" onClick ={userLogout}>
                   <PoweroffOutlined className="menu-top__logo-off"/>
                </Button>
            </div>
        </div>
        </>
    )
}