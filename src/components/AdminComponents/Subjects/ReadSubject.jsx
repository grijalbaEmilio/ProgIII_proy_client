import './ReadSubject.scss'
export default function ReadSubject({ children }) {
    const { subjects, code } = children

    const subjectFinal = subjects.filter((element) => {
        if (element.activity_code === code) {
            return element
        }
    })[0]

    return (
        <div>
            <div>
                <b>Departameto</b>: {subjectFinal.department}<br />
                <b>Actividad académica</b>: {subjectFinal.academic_activity}<br />
                <b>Código</b>: {subjectFinal.activity_code}<br />
                <b>Créditos</b>: {subjectFinal.number_credits}<br />
                <b>Versión del PIAA</b>: {subjectFinal.piaa_version}<br />
                <b>Número de acta</b>: {subjectFinal.file_number.month_file}-{subjectFinal.file_number.year_file}<br />
                <b>Fecha de acta</b>: {new Date(subjectFinal.file_date).getDay()}/{new Date(subjectFinal.file_date).getMonth()}/{new Date(subjectFinal.file_date).getFullYear()}<br/><br/>
                
            </div>
            <table>
                    <tbody>
                    <tr>
                        <td>Horas Teóricas</td>
                        <td>{subjectFinal.theory_hours}</td>
                        <td>Horas prácticas</td>
                        <td>{subjectFinal.practical_hours}</td>
                    </tr>
                    <tr>
                        <td>Horas no presenciales</td>
                        <td>{subjectFinal.offsite_hours}</td>
                        <td>Horas presenciales profesor</td>
                        <td>{subjectFinal.presential_teacher_hours}</td>
                    </tr>
                    <tr>
                        <td>Horas inasistencia de repruebe</td>
                        <td>{subjectFinal.hourson_attendence_reprovals}</td>
                        <td>Cupos máximos</td>
                        <td>{subjectFinal.maximum_quotas}</td>
                    </tr>
                    <tr>
                        <td>Habilitable</td>
                        <td>{subjectFinal.last_chance ? "SÍ" : 'NO'}</td>
                        <td>Nota aprobatoria</td>
                        <td>{subjectFinal.passing_score}</td>
                    </tr>
                    <tr>
                        <td>Dutación en semestres</td>
                        <td>{subjectFinal.duration_semester}</td>
                        <td>Duración en semanas</td>
                        <td>{subjectFinal.weeks_duration}</td>
                    </tr>
                    </tbody>
                    
                </table>
        </div>
    )
}