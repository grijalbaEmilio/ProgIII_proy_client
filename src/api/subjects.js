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