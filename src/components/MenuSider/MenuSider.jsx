import React,{useState} from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { HomeOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import Modal from "../Modal";
import "./MenuSider.scss";

export default function MenuSider(props) {
  const { menuCollapsed } = props;
  const { Sider } = Layout;
  const [modal, setModal] = useState(false)
  const location = useLocation()
  return (
    <>
      {modal ?<Modal>{{setModal}}</Modal>:null}
      <Sider className="admin-sider" collapsed={menuCollapsed}>
        <Menu
          theme="dark"
          className="admin-sider__options"
          mode="inline"
          /* defaultSelectedKeys={["/"]} */
        >
          <Menu.Item className="admin-sider__options__option" key="/">
            <Link to={"/"}>
              <HomeOutlined />
              <span className="nav-text">Home</span>
            </Link>
          </Menu.Item>

          <Menu.Item className="admin-sider__options__option" key="/admin">
            <Link to={"/admin"}>
              <UserOutlined />
              <span className="nav-text">Administrador</span>
            </Link>
          </Menu.Item>

          <Menu.Item className="admin-sider__options__option" key="/admin/users">
            <Link to={"/admin/users"}>
              <UserOutlined />
              <span className="nav-text">Usuarios</span>
            </Link>
          </Menu.Item>
          
          <Menu.Item onClick={()=>setModal(true)} className="admin-sider__options__option" key="2" >
              <MenuOutlined  />
              <span className="mav-text">Menu web</span>
              
          </Menu.Item>
          
        </Menu>
      </Sider>
    </>
  );
}
