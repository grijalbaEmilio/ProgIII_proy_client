import React, { useState, useEffect } from "react";
import {
  Switch,
  List,
  Button,
  Avatar,
  Modal as ModalAntd
} from "antd";
import {
  EditOutlined,
  UserDeleteOutlined,
  UserSwitchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import NoAvatar from "../../../assetts/img/jpg/user1.jpg";
import { getAvatar, activateUser, deleteUser } from "../../../api/user";
import { getAccessToken } from "../../../api/auth";
import EditUserForm from "./EditUser";
import AddUserForm from "./AddUser";
import Modal from "../../Modal";
import Toast from "../../Toast";

const { confirm } = ModalAntd;

export default function ListUsers(props) {
  /* page user */
  const { usersActive, usersInactive, setReloadUsers } = props;

  const [viewUsersActives, setViewUsersActives] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const addUserModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo usuario");
    setModalContent(
      <AddUserForm
        setReloadUsers={setReloadUsers}
      />
    );
  };
  return (
    <div className="list-users">
      {isVisibleModal ? <Modal>{{title : modalTitle,setModal : setIsVisibleModal, content : modalContent}}</Modal> : null}
      <div className="list-users__header">
        <div className="list-users__header-switch">
          <List.Item
            actions={[
              <Button type="primary" onClick={addUserModal}>
                <UserAddOutlined />
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={
                <span>
                  {viewUsersActives ? "Usuarios Activos" : "Usuarios Inactivos"}
                </span>
              }
              avatar={
                <Switch
                  defaultChecked
                  onChange={() => setViewUsersActives(!viewUsersActives)}
                />
              }
            ></List.Item.Meta>
          </List.Item>
        </div>
      </div>

      {viewUsersActives ? (
        <UsersActive
          usersActive={usersActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadUsers={setReloadUsers}
        />
      ) : (
        <UsersInactive
          usersInactive={usersInactive}
          setReloadUsers={setReloadUsers}
        />
      )}
    </div>
  );
}

function UsersActive(props) {
  const {
    usersActive,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadUsers,
  } = props;

  const editUser = (user) => {
    setIsVisibleModal(true);
    setModalTitle(
      `Editar ${user.name_user ? user.name_user : "..."} ${
        user.lastname ? user.lastname : "..."
      }`
    );
    setModalContent(
      <EditUserForm
        user={user}
        setReloadUsers={setReloadUsers}
      />
    );
  };

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => (
        <UserActive
          user={user}
          editUser={editUser}
          setReloadUsers={setReloadUsers}
        />
      )}
    />
  );
}

// botones de cada item de la lista
function UserActive(props) {
  const { user, editUser, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatar(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const desactivateUser = () => {
    const accesToken = getAccessToken();

    activateUser(accesToken, user._id, false)
      .then((response) => {
        Toast( { title : "Exito !",mode : "success", message: response})
        setReloadUsers(true);
      })
      .catch((err) => {
        Toast( { title : "Error !",mode : "danger", message: err})
      });
  };

  const showDeleteConfirm = () => {
    const accesToken = getAccessToken();

    confirm({
      title: "Eliminando usuario",
      content: `¿Estas seguro que quieres eliminar a ${user.email}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUser(accesToken, user._id)
          .then((response) => {
            Toast( { title : "Exito !",mode : "success", message: response})
            setReloadUsers(true);
          })
          .catch((err) => {
            Toast( { title : "Error !",mode : "danger", message: Error})
          });
      },
    });
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editUser(user)}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={desactivateUser}>
          <UserSwitchOutlined />
        </Button>,
        <Button type="danger" onClick={showDeleteConfirm}>
          <UserDeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
                ${user.name_user ? user.name_user : "..."} 
                ${user.lastname ? user.lastname : "..."}
            `}
        description={user.email}
      />
    </List.Item>
  );
}

function UsersInactive(props) {
  const { usersInactive, setReloadUsers } = props;

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => (
        <UserInactive user={user} setReloadUsers={setReloadUsers} />
      )}
    />
  );
}

function UserInactive(props) {
  const { user, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatar(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const activateUserF = () => {
    const accesToken = getAccessToken();

    activateUser(accesToken, user._id, true)
      .then((response) => {
        Toast( { title : "Exito !",mode : "success", message: response})
        setReloadUsers(true);
      })
      .catch((err) => {
        Toast( { title : "Error !",mode : "danger", message: err})
      });
  };

  const showDeleteConfirm = () => {
    const accesToken = getAccessToken();

    confirm({
      title: "Eliminando usuario",
      content: `¿Estas seguro que quieres eliminar a ${user.email}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUser(accesToken, user._id)
          .then((response) => {
            Toast( { title : "Exito !",mode : "success", message: response})
            //console.log(user._id);
            setReloadUsers(true);
          })
          .catch((err) => {
            Toast( { title : "Error !",mode : "danger", message: err})
          });
      },
    });
  };  
  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={activateUserF}>
          <UserSwitchOutlined />
        </Button>,
        <Button type="danger" onClick={showDeleteConfirm}>
          <UserDeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
                  ${user.name_user ? user.name_user : "..."} 
                  ${user.lastname ? user.lastname : "..."}
              `}
        description={user.email}
      />
    </List.Item>
  );
}