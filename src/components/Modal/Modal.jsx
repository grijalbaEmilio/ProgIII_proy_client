import React, {createContext} from 'react';
import './Modal.scss'
import { CloseCircleFilled } from "@ant-design/icons";

export const contextModal = createContext()

export default function Modal({children}){
  const {setModal, content, title} = children
 return(
    <contextModal.Provider value={setModal}>
     <div className='modal'>
        <div className='modal__content'>
          <CloseCircleFilled 
          onClick={()=>setModal(false)}
          className='modal__content__closeModal'
          style={{
            color: 'red',
            fontSize : '20px',
            position : 'absolute',
            top: '10px',
            right: '10px'
          }}/>
          <h1 className='modal__title'>{title}</h1>
          {content}
        </div>
     </div>
    </contextModal.Provider>
 )
}