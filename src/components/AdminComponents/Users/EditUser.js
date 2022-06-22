import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  Avatar,
  Form,
  Input,
  Select,
  Button,
  Row,
  Switch,
  Col,
} from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import NoAvatar from "../../../assetts/img/jpg/user1.jpg";
import { uploadAvatar, getAvatar, updateUser } from "../../../api/user";
import { getAccessToken } from "../../../api/auth";
import {contextModal} from '../../Modal/Modal.jsx'
import Toast from "../../Toast";



export default function EditUserForm(props) {
  const { user, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({});

  //contexto de modal que proporciona la cunción para ocultar el mismo
  const setIsVisibleModal = useContext(contextModal)

  useEffect(() => {
    setUserData({
      name_user: user.name_user,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    });
  }, [user]);

  useEffect(() => {
    if (user.avatar) {
      getAvatar(user.avatar).then(response => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  const updateUserr = () => {
    const token = getAccessToken();
    let userUpdate = userData;

    if (userUpdate.password || userUpdate.repeatPassword) {
      if (userUpdate.password !== userUpdate.repeatPassword) {
        Toast( { title : "Error !",mode : "danger", message: "Las contraseñas tienen que ser iguales."})
        return;
      } else {
        delete userUpdate.repeatPassword;
      }
    }

    if (!userUpdate.name_user || !userUpdate.lastname || !userUpdate.email) {
      Toast( { title : "Error !",mode : "danger", message: "El nombre, apellidos e email son obligatorios."})
      return;
    }

    if (typeof userUpdate.avatar === "object") {
      uploadAvatar(token, userUpdate.avatar, user._id).then(response => {
        userUpdate.avatar = response.avatarName;
        updateUser(token, userUpdate, user._id).then(result => {
          Toast( { title : "Exito !",mode : "success", message: result.message})
          setIsVisibleModal(false);
          setReloadUsers(true);
        });
      });
    } else {
      updateUser(token, userUpdate, user._id).then(result => {
        Toast( { title : "Exito !",mode : "success", message: result.message})
        setIsVisibleModal(false);
        setReloadUsers(true);
      });
    }
  };

  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar}/>
      <EditForm
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUserr}
      />
    </div>
  );
}

function UploadAvatar(props) {
  const { avatar, setAvatar } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  const onDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}

function EditForm(props) {
  const { userData, setUserData, updateUser } = props;
  const { Option } = Select;

  return (
    <Form className="form-edit" onFinish={updateUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Name/Nombre"
              value={userData.name_user}
              onChange={e => setUserData({ ...userData, name_user: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Lastname/Apellidos"
              value={userData.lastname}
              onChange={e =>
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
              prefix={<MailOutlined />}
              placeholder="Correo electronico"
              value={userData.email}
              onChange={e =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Selecciona un rol"
              onChange={e => setUserData({ ...userData, role: e })}
              value={userData.role}
            >
              <Option value="admin">Administrador</Option>
              <Option value="editor">Editor</Option>
              <Option value="reviewer">Revisor</Option>
              <Option value="coordinator">Coordinador</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
        
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Contraseña"
              onChange={e =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Repetir contraseña"
              onChange={e =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item label="Activo">
            <Switch
              checkedChildren="on"
              unCheckedChildren="off"
              checked={userData.active}
            />
          </Form.Item>
        </Col>
        </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}