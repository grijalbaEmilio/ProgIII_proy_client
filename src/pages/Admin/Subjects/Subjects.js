import React, {useState, useEffect} from 'react'
import { getSubjects } from '../../../api/subjects'
import ListSubject from '../../../components/AdminComponents/Subjects/ListSubject'
import {LoadingOutlined} from '@ant-design/icons'

import './Subjects.scss'

export default function Subjects() {
    
    const [renderSubjecs, getRenderSubjecs] = useState(false)
    const [subjects, setSubjects] = useState(null)
 
   

    useEffect(()=> {
        getSubjects().then((data)=>{
            if (JSON.stringify(data.data) != JSON.stringify(subjects)){
                setSubjects(data.data) 
            }
        }).catch((err)=>console.log(err))
        
    }, [renderSubjecs, subjects])    

    return(
        <>
        {!subjects ? <LoadingOutlined 
        style={{
            display : 'block',
            margin : 'auto',
            marginTop : '200px',
            fontSize : '100px'
          }}
          /> : <ListSubject>{{subjects : subjects, getRenderSubjecs : getRenderSubjecs, valueSubjects : renderSubjecs}}</ListSubject>  }
        
        </>
        
    )


    
    
    
}