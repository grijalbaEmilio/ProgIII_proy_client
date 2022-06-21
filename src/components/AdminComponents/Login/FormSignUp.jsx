import React, {useState} from "react";

import newAdmin from "../../../assetts/img/jpg/user1.jpg";
import { signUpApi } from "../../../api/user";
import {emailValidation, minLengthValidation} from '../../../validations/FormValidation'
import Toast from '../../../components/Toast'

import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockFilled, MailFilled } from "@ant-design/icons";



import "./FormsLogin.scss";

export default function SignUpForm() {

  const [inputs, setInputs] = useState({
    name_user : '',
    lastname:'',
    email: "",
    password: "",
    repeatPassword: "",
    privacyPolicy: false,
  });
  const [formValid, setFormValid] = useState({
    name_user : false,
    lastname:false,
    email: false,
    password: false,
    repeatPassword: false,
    privacyPolicy: false,
  });

  const changeForm = (e) => {
    //console.log(e.target.value);
    if (e.target.name === "privacyPolicy") {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.checked,
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name] : e.target.value
      });
    }
  };

  const inputValidation = (e) => {
    //console.log(formValid)
    const { type, name } = e.target;
 
    if (type === "email") {
      setFormValid({ ...formValid, [name]: emailValidation(e.target) });
    }
    if (type === "password") {
      setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 6) });
    }
    if (type === "checkbox") {
      setFormValid({ ...formValid, [name]: e.target.checked });
    }
    if(name === "name"){
      setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 3) });
    }
    if(name === "lastname"){
      setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 3) });
    }
  };

  const register = async (e) => {
    e.preventDefault();
    //console.log("Estoy en register");
    const name_user = inputs.name_user
    const emailVal = inputs.email;
    const passwordVal = inputs.password;
    const repeatPasswordVal = inputs.repeatPassword;
    const privacyPolicyVal = inputs.privacyPolicy;
 
    if (!emailVal || !passwordVal || !repeatPasswordVal || !privacyPolicyVal) {
       Toast({title : 'Cuidado !', message:"Hay campos vacíos.", mode:"warning"});
    } else {
      if (passwordVal !== repeatPasswordVal) {
        Toast({title : 'Error !', message:"Las contraseñas no coinciden.", mode:'danger'});
      } else {
        const result = await signUpApi(inputs);
        //console.log(result.user)
        if (!result.return_tokes) {
           Toast({title : 'Error !', message:result.message, mode:'danger'});
        } else {
          Toast({title : 'Exito !', message:result.message, mode:'success'});
          resetForm();
        }
      }
    }
  };

  const resetForm = () => {
    const inputs = document.getElementsByTagName("input");
 
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove("error");
    }
 
    setInputs({
      email: "",
      password: "",
      repeatPassword: "",
      privacyPolicy: false,
    });
 
    setFormValid({
      email: false,
      password: false,
      repeatPassword: false,
      privacyPolicy: false,
    });
  };

  return (
    <div className="container-form-login">
      <Form
        onChange={changeForm}
        className="form-login"
        
      >
        <img className="form-login__logoAdmin" src={newAdmin} alt="#" />
        <h1 className="form-login__TitleAdmin">Registrarme...</h1>

        <div className="form-login__content">
          <div className="form-login__content-izq">
            <Form.Item
              className="form-login__item form-login__name"
            >
              <Input
                type="text"
                name="name_user"
                className="form-login__input"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Nombre"
                onChange={inputValidation}
              />
            </Form.Item>

            <Form.Item
              className="form-login__item form-login__lastname"
            >
              <Input
              name="lastname"
                type="text"
                className="form-login__input"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Apellido"
                onChange={inputValidation}
              />
            </Form.Item>

            <Form.Item
              className="form-login__item form-login__email"
            >
              <Input
                name = "email"
                className="form-login__input"
                type="email"
                prefix={<MailFilled className="site-form-item-icon" />}
                placeholder="Correo"
                onChange={inputValidation}
              />
            </Form.Item>
          </div>

          <div className="form-login__content-der">
            <Form.Item
              className="form-login__item form-login__password"
              
            >
              <Input
                name="password"
                className="form-login__input"
                prefix={<LockFilled className="site-form-item-icon" />}
                type="password"
                placeholder="Contraseña"
                onChange={inputValidation}
              />
            </Form.Item>

            <Form.Item
              className="form-login__item form-login__repeatPassword"
            >
              <Input
                name="repeatPassword"
                className="form-login__input"
                prefix={<LockFilled className="site-form-item-icon " />}
                type="password"
                placeholder="Repetir Contraseña"
                onChange={inputValidation}
              />
            </Form.Item>
            
          </div>
        </div>

        <Form.Item>
            <Checkbox
              name="privacyPolicy"
              className="form-login__check" 
              onChange={null}
            >
              He leído y acepto la política de privacidad.
            </Checkbox>
          </Form.Item>
        <Form.Item className="form-login__registro">
          <Button
            type="primary"
            className="form-login__button"
            onClick={register}
          >
            Registrarme
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
