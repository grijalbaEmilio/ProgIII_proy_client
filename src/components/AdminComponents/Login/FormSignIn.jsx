import React, { useState } from "react";
import newAdmin from "../../../assetts/img/jpg/user1.jpg";
import { Form, Input, Button } from "antd";
import { LockFilled, MailFilled } from "@ant-design/icons";
import Toast from "../../Toast";
import {signInApi} from "../../../api/user"
import {emailValidation, minLengthValidation} from '../../../validations/FormValidation'

import "./FormsLogin.scss";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../api/constants";


export default function SignUpForm() {

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const [formValid, setFormValid] = useState({
    email: false,
    password: false
  });

  const inputValidation = (e) => {
    //console.log(formValid)
    //console.log(inputs);
    const { type, name } = e.target;

    setInputs({
      ...inputs,
      [e.target.name] : e.target.value
    });
 
    if (type === "email") {
      setFormValid({ ...formValid, [name]: emailValidation(e.target) });
    }
    if (type === "password") {
      setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 6) });
    }
  };

  const Signin_User = async (e) => {
    e.preventDefault();
    const emailVal = inputs.email;
    const passwordVal = inputs.password;
 
    if (!emailVal || !passwordVal) {
       Toast({title : 'Cuidado !', message:"Complete todos los campos", mode:"warning"});
    } else {
        const result = await signInApi(inputs);
        if (result.message) {
           Toast({title : 'Error !', message:result.message, mode:'danger'});
        } else {
          //console.log(result)
          const { accessToken, refeshToken } = result
          localStorage.setItem(ACCESS_TOKEN, accessToken)
          localStorage.setItem(REFRESH_TOKEN, refeshToken)

          resetForm();
          //Toast({title : 'Exito !', message:" Login correcto", mode:'success'});
          window.location.reload()
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
    });
 
    setFormValid({
      email: false,
      password: false,
    });

    /* const ema = document.getElementById('email')
    ema.value = "hola"
    console.log(document.getElementById('email')); */
    //window.location.reload()
  };

  return (
    <div className="container-form-login">
      <Form
        name="normal_signUp"
        className="form-login"
      >
        <img className="form-login__logoAdmin" src={newAdmin} alt="#" />
        <h1 className="form-login__TitleAdmin">Ingresar...</h1>

        <div className="form-login__content">
          <div className="form-login__content-izq">
            <Form.Item
              className="form-login__item  form-login__email"
            >
              <Input
                id="email"
                className="form-login__input"
                type="email"
                name="email"
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
                className="form-login__input"
                prefix={<LockFilled className="site-form-item-icon" />}
                type="password"
                placeholder="Contraseña"
                name="password"
                onChange={inputValidation}
              />
            </Form.Item>
          </div>
        </div>

        <Form.Item className="form-login__registro">
          <Button
            onClick={Signin_User}
            type="primary"
            htmlType="submit"
            className="form-login__button"
          >
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
