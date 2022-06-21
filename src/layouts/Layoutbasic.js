import React , {useState} from "react"
import {Layout} from "antd"
import MenuTop from "../components/MenuTop"
import MenuSider from "../components/MenuSider"

import "./layoutAdmin.scss"

export default function Layoutadmin(props){
    const [menuCollapsed, setMenuCollapsed] = useState(true)
    const {children} = props
    const {Header, Content, Footer} = Layout
    return (
        <Layout className="layout-admin">
            <MenuSider menuCollapsed={menuCollapsed}/>
            
                <Header className="layout-admin__header">
                    <MenuTop 
                    menuCollapsed = {menuCollapsed}
                    setMenuCollapsed = {setMenuCollapsed}/>
                </Header>
    
            <Content className = "layout-admin__main">{children}</Content>
            <Footer className = "layout-admin__footer">react Project 2022</Footer>
        </Layout>
    )
}