import React, { useState } from "react"
import { updateSubject } from '../../../api/subjects'
import { Button } from "antd";
import { getSubjects } from '../../../api/subjects';
import Toast from '../../Toast'
import "./StylesSubjects.scss"
export default function Update({children}){
    const {setModal, getRenderSubjecs, subject, valueSubjects } = children
    const [formSubject, setformSubect] = useState(
        {
            "department": subject.department,
            "academic_activity": subject.academic_activity,
            "activity_code": subject.activity_code,
            "number_credits": subject.number_credits,
            "piaa_version": subject.piaa_version,
            "piaa_status": subject.piaa_status,
            "file_number": {
                "month_file": subject.file_number.month_file,
                "year_file": subject.file_number.year_file
            },
            "file_date": subject.file_date,
            "theory_hours": subject.theory_hours,
            "offsite_hours": subject.offsite_hours,
            "hourson_attendence_reprovals": subject.hourson_attendence_reprovals,
            "last_chance": subject.last_chance,
            "duration_semester": subject.duration_semester,
            "practical_hours": subject.practical_hours,
            "presential_teacher_hours": subject.presential_teacher_hours,
            "maximum_quotas": subject.maximum_quotas,
            "passing_score": subject.passing_score,
            "weeks_duration": subject.weeks_duration
        }
    )

    const updateForm = (e) => {
        e.preventDefault()
        const key = e.target.name
        const value = e.target.value
        if(e.target.name == 'department' || e.target.name == 'academic_activity' ||e.target.name == 'activity_code' ||e.target.name ==  'file_date'){
            setformSubect({
                ...formSubject,
                [key]: value
            })
            
        }else{
            if (e.target.name == "month_file") {
                formSubject.file_number.month_file = parseInt(value)
            }
            else if (e.target.name == "year_file") {
                formSubject.file_number.year_file = parseInt(value)
            }else if(e.target.name == 'last_chance'){
                setformSubect({
                    ...formSubject,
                    [key]: value == 'true'
                })

            }
             else {
                setformSubect({
                    ...formSubject,
                    [key]: parseInt(value)
                })
            }
        }
        
    }

    return (
        <div className="infoSubject">
            <div className="infoSubject__content">
                <div>
                    <div className="infoSubject__content__header">
                        <b>Departameto :</b> <input className="infoSubject__content__header__input"  name="department" onChange={updateForm} type={'text'} defaultValue={subject.department}></input> 
                    </div>
                    <div className="infoSubject__content__header">
                        <b>Actividad académica :</b> <input className="infoSubject__content__header__input"  defaultValue={subject.academic_activity}name="academic_activity" onChange={updateForm} type={'text'} ></input>
                    </div>
                    <div className="infoSubject__content__header">
                        <b>Código :</b> <input className="infoSubject__content__header__input"  defaultValue={subject.activity_code} name="activity_code" onChange={updateForm} type={'text'} ></input> 
                    </div>
                    <div className="infoSubject__content__header">
                        <b>Créditos :</b> <input className="infoSubject__content__header__input"  defaultValue={subject.number_credits} name="number_credits" onChange={updateForm} type={'number'} min="0" ></input> 
                    </div>
                    <div className="infoSubject__content__header">
                        <b>Versión del PIAA :</b> <input className="infoSubject__content__header__input"  defaultValue={subject.piaa_version} name="piaa_version" onChange={updateForm} type={'number'} min="0" ></input> 
                    </div>
                    <div className="infoSubject__content__header">
                        <b>Número de acta :</b>
                        <div className="">
                            <input className="infoSubject__content__header__input-2"  defaultValue={subject.file_number.month_file} name="month_file" onChange={updateForm} type={'number'} min="0" ></input><input className="infoSubject__content__header__input-2"  defaultValue={subject.file_number.year_file} name="year_file" onChange={updateForm} type={'number'} min="0" ></input>
                        </div>
                    </div>
                    <div className="infoSubject__content__header">
                        <b>Fecha de acta :</b> <input className="infoSubject__content__header__input"  defaultValue={new Date(subject.file_date)} name="file_date" onChange={updateForm} type={'date'} ></input>
                    </div>

                </div>
                <table>
                    <tbody>
                        <tr>
                            <td>Horas Teóricas</td>
                            <td><input   defaultValue={subject.theory_hours} name="theory_hours" onChange={updateForm} type={'Number'} min="0" ></input></td>
                            <td>Horas prácticas</td>
                            <td><input   defaultValue={subject.practical_hours} name="practical_hours" onChange={updateForm} type={'Number'} min="0" ></input></td>
                        </tr>
                        <tr>
                            <td>Horas no presenciales</td>
                            <td><input   defaultValue={subject.offsite_hours} name="offsite_hours" onChange={updateForm} type={'Number'} min="0" ></input></td>
                            <td>Horas presenciales profesor</td>
                            <td><input   defaultValue={subject.presential_teacher_hours} name="presential_teacher_hours" onChange={updateForm} type={'Number'} min="0" ></input></td>
                        </tr>
                        <tr>
                            <td>Horas inasistencia de repruebe</td>
                            <td><input   defaultValue={subject.hourson_attendence_reprovals} name="hourson_attendence_reprovals" onChange={updateForm} type={'Number'} min="0" ></input></td>
                            <td>Cupos máximos</td>
                            <td><input   defaultValue={subject.maximum_quotas} name="maximum_quotas" onChange={updateForm} type={'Number'} min="0" ></input></td>
                        </tr>
                        <tr>
                            <td>Habilitable</td>
                            <td><select defaultValue={subject.last_chance} name="last_chance" onChange={updateForm}><option defaultValue="true" key="1">SÍ</option><option defaultValue="false" key="2">NO</option></select></td>
                            <td>Nota aprobatoria</td>
                            <td><input   defaultValue={subject.passing_score} name="passing_score" onChange={updateForm} type="number" /></td>
                        </tr>
                        <tr>
                            <td>Dutación en semestres</td>
                            <td><input   defaultValue={subject.duration_semester} name="duration_semester" onChange={updateForm} type="number" /></td>
                            <td>Duración en semanas</td>
                            <td><input   defaultValue={subject.weeks_duration} name="weeks_duration" onChange={updateForm} type="number" /></td>
                        </tr>
                    </tbody>

                </table>
            </div>
            <Button type="primary" onClick={() => {
                updateSubject(formSubject, subject.activity_code).then((data) => {
                    if(data.message){
                        Toast({mode : "danger", message : data.message})
                    }else{
                        getSubjects()
                        setTimeout(() => {
                            getRenderSubjecs(!valueSubjects)
                            setModal(false)
                            Toast({mode : "success", message: "Asignatura actualizada !"})
                        }, 500);
                    }
                }
                )
            }
            }>
                Actualizar
            </Button>

            <Button className="infoSubject__button" type="danger" onClick={() => {
               setModal(false)
            }
            }>
                Cancelar
            </Button>

        </div>
    )
}