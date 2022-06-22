import React, {useState} from 'react'
import { arraySubjects, getSubjects } from '../../../api/subjects'
import ListSubject from '../../../components/AdminComponents/Subjects/ListSubject'

import './Subjects.scss'

export default function Subjects() {
    
    const subjects = arraySubjects()
    const [renderSubjecs, getRenderSubjecs] = useState(false)

    return(
        <>
        {renderSubjecs}
        <ListSubject>{{subjects : subjects, getRenderSubjecs : getRenderSubjecs}}</ListSubject>
        </>
        
    )


    
    
    
}