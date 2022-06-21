/* Minimo de caracteres permitidos en el campo de contraseña, nombre y apellido */
export function minLengthValidation(inputData, minLength) {
  const { value } = inputData;
  //removeClassErrorSuccess(inputData);
  if (value.length >= minLength) {
    if (inputData.classList.contains("error")) {
      inputData.classList.remove("error");
    }
    return true;
  } else {
    inputData.classList.contains("success")
      ? inputData.classList.remove("success")
      : inputData.classList.add("error");
    return false;
  }
}
export function emailValidation(inputData) {
  const emailValid =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const { value } = inputData;
  const resultValidation = emailValid.test(value);
  if (resultValidation) {
    if(inputData.classList.contains("error")){ inputData.classList.remove("error")}
    return true;
  } else {
    inputData.classList.add("error");
    return false;
  }
}
