import React, { useState, useContext } from "react";
import { Form, Input, Select, Button, Row, Col, notification } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { signUpApi } from "../../../api/user";
import { getAccessToken } from "../../../api/auth";
import {contextModal} from '../../Modal/Modal.jsx'
import Toast from '../../Toast'
import "./UserCRUD.scss";

//console.log(useContext(contextModal))

export default function AddUsers(props) {
  const { setReloadUsers } = props;
  const [userData, setUserData] = useState({});

  //contexto de modal que proporciona la cunción para ocultar el mismo
  const setModal = useContext(contextModal)
  

  const addUser = (event) => {
    event.preventDefault(); 
    if (
      !userData.name_user ||
      !userData.lastname ||
      !userData.role ||
      !userData.email ||
      !userData.password ||
      !userData.repeatPassword
    ) {
      Toast({mode : "danger", message : "Todos los campos son obligatorios."})
    } else if (userData.password !== userData.repeatPassword) {
      Toast({mode : "danger", message : "Las contraseñas tienen que ser iguale."})
    } else {
      const accesToken = getAccessToken();
      // ocultamos el modal desde el contexto del componente Monal.
      setModal(false)

      signUpApi(userData)
        .then((response) => {
            Toast({mode : "success", message : response.message})
          //setIsVisibleModal(false); 
          setReloadUsers(true); 
          setUserData({});
        })
        .catch((err) => {
            Toast({mode : "danger", message : err})
        });
    }
  };

  return (
    <div className="add-user-form">
      <AddForm
        userData={userData}
        setUserData={setUserData}
        addUser={addUser}
      />
    </div>
  );
}


const AddForm = (props) => {
  const { userData, setUserData, addUser } = props;
  const { Option } = Select;

  return (
    <Form className="form-add">
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserAddOutlined />}
              placeholder="Nombre"
              value={userData.name_user}
              onChange={(e) =>
                setUserData({ ...userData, name_user: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserAddOutlined />}
              placeholder="Apellidos"
              value={userData.lastname}
              onChange={(e) =>
                setUserData({ ...userData, lastname: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserAddOutlined />}
              placeholder="Correlo electronico"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Selecióna un rol"
              onChange={(e) => setUserData({ ...userData, role: e })}
              value={userData.role}
            >
              <Option value="admin">Administrador</Option>
              <Option value="editor">Editor</Option>
              <Option value="reviwer">Revisor</Option>
              <Option value="coordinator">Coordinador</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserAddOutlined />}
              type="password"
              placeholder="Contraseña"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserAddOutlined />}
              type="password"
              placeholder="Repetir contraseña"
              value={userData.repeatPassword}
              onChange={(e) =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="btn-submit"
          onClick={addUser}
        >
          Crear Usuario
        </Button>
      </Form.Item>
    </Form>
  );
};