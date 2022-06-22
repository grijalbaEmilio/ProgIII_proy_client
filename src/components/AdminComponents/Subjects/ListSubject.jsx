import React, { useState } from 'react';
import { deleteSubject } from '../../../api/subjects'
import { List, Button } from "antd";
import {
    EditOutlined,
    PlusCircleFilled,
    DeleteFilled,
    FullscreenOutlined
} from "@ant-design/icons";

import Modal from '../../Modal'
import ReadSubject from './ReadSubject';
import CreateSubject from './CreateSubject';
import { getSubjects } from '../../../api/subjects';

export default function({children}){
    const {subjects, getRenderSubjecs} = children
    const [modal, setModal] = useState(false)
    const [contentModal, setContentModal] = useState({
        content: null, title: null
    })

    const readSubject = (code) => {
        setContentModal({ content: <ReadSubject>{{subjects : subjects, code : code} }</ReadSubject>, title: "Detalles de asignatura." })
        setModal(true)
    }

    const deleteOneSubject = async (id, name) =>{
        setContentModal({
            content: <div>
                <Button type="primary" onClick={() => setModal(false)}>
                    Cancelar
                </Button>
                <Button type="danger" onClick={() => {
                    deleteSubject(id).then((data)=>{
                        getSubjects()
                        setTimeout(() => {
                            getRenderSubjecs(true)
                            setModal(false)
                        }, 300);
                    }
                    )
                }
                }>
                    Eliminar
                </Button>
            </div>,
            title: "¿ Está seguro que desea eliminar la asignatura "+name+" ?"
        })
        setModal(true)
    }

    const createSubject = () => {
        setContentModal({
            content: <div>
                <Button type="primary" onClick={() => setModal(false)}>
                    Cancelar
                </Button>
                <Button type="danger" onClick={() => {
                    deleteSubject(id).then((data)=>{
                        getSubjects()
                        setTimeout(() => {
                            getRenderSubjecs(true)
                            setModal(false)
                        }, 300);
                    }
                    )
                }
                }>
                    Eliminar
                </Button>
            </div>,
            title: "Crear "
        })

    }



    return (
        <div>
            {modal ? <Modal>{{ "setModal": setModal, "content": contentModal.content, "title": contentModal.title }}</Modal> : null}
            <Button type="primary" onClick={() => null}>
                <PlusCircleFilled />
            </Button>
            
            <List
                className="subjects"
                itemLayout="horizontal"
                dataSource={subjects}
                renderItem={(subject) => (


                    <List.Item>
                        <div className='subjects__conntent'>
                            <div className='subjects__conntent__info'>
                                <div className='subjects__conntent__info__initialName'>
                                    {subject.academic_activity[0]}
                                </div>
                                <div className='subjects__conntent__info__name'>
                                    {subject.academic_activity}
                                </div>
                            </div>

                            <div className='subjects__conntent__buttons'>

                                {/* botón de ampliar materia */}
                                <Button type="primary" onClick={()=>readSubject(subject.activity_code)}>
                                    <FullscreenOutlined />
                                </Button>
                                {/* botón de editar */}
                                <Button name={subject.activity_code} type="primary" onClick={() => null}>
                                    <EditOutlined />
                                </Button>
                                {/* botón de eliminar */}
                                <Button name={subject.activity_code} type="danger" onClick={() => deleteOneSubject(subject._id, subject.academic_activity)}>
                                    <DeleteFilled />
                                </Button>


                            </div>

                        </div>



                    </List.Item>



                )}
            />
        </div>
    );
}