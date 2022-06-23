import { basePath, apiVersion } from "./config";

export const getSubjects = async ()=>{
    const url = `${basePath}/${apiVersion}/subjects/getSubject`;
    const params = {
      method: "GET",
    };
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
          localStorage.setItem  ('subjects', JSON.stringify(result.data) )        
        return result;
      })
      .catch(err => {
        return err.message;
      });
}

export function arraySubjects(){
    return JSON.parse(localStorage.getItem('subjects'))
}

export function deleteSubject(id){
    const url = `${basePath}/${apiVersion}/subjects/deleteSubject/${id}`;
    const params = {
    method: "DELETE"
  };

  return fetch(url, params).then(response => {
    return response.json();
  })
  .then(result => {
    return result;
  })
  .catch(err => {
    return err.message;
  });
}

export function postSubject(data){

  const url = `${basePath}/${apiVersion}/subjects/createSubject`;
  
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.user) {
        return {
          message: "asignatura creada exitosamente.",
        };
      } else {
        return {
          message: result.message,
        };
      }
    })
    .catch((err) => {
      return {
        message: err.message,
      };
    });

}

export function updateSubject(data, code){

  const url = `${basePath}/${apiVersion}/subjects/updateSubject/${code}`;

  const params = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  console.log(data);

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.user) {
        return {
          message: "asignatura actualizada.",
        };
      } else {
        return {
          message: result.message,
        };
      }
    })
    .catch((err) => {
      return {
        message: err.message,
      };
    });


}