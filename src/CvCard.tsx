import { useContext } from "react";
import { CVContext, CVContextType } from "./CVContextProvider";
import {exportToPDF} from "./exportToPDF"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export default function CvCard(){
    const {education,workExperience,skills,interests,personalInfo,resume} = useContext<CVContextType>(CVContext);

    const workExperienceElements = workExperience.map(exp=>{
        return <div className="workExperience">

            <div className="work-div">
            <h3 className="job-title">{exp.jobTitle}</h3>
            <p>{formatYearMonth(exp.startDate)} - {formatYearMonth(exp.endDate)}</p>
            </div>

            <h3 className="hirer">{exp.hirer}</h3>
            <ReactQuill className='readOnlyQuill' readOnly={true} theme="snow" value={exp.description}></ReactQuill>

        </div>
    })
    function formatYearMonth(dateString: string) : string {
        const date = new Date(dateString);
        
        const year = date.getFullYear();
        const month = date.toLocaleString("en-US", { month: "long" });
    
        return `${year}, ${month}`;
    }

    const educationElements = education.map(ed=>{
        return <div className="educationElement">
            <h4>{ed.name}</h4>
            <p>{ed.startYear}/{ed.endYear}</p>
            <p>{ed.place}</p>
        </div>
    })

    const skillsElements = skills.map(skill=>{
        return <p>{skill}</p>
    })

    const interestsElements = interests.map(interest=>{
        return <p>{interest}</p>
    })
    return (
        <div className="cv-outer">
          
        <div id="cv-container">
            <div className="cv-left">
            <img className="cvImg" src={personalInfo.personImg}/>

            <div className="personalInfo">
                <h2 className="cardTitle">CONTACTS</h2>
                <p>{personalInfo.email}</p>
                <p>{personalInfo.address}</p>
                <p>{personalInfo.age}</p>
                <p>{personalInfo.phone}</p>
            </div>
            <h2 className="cardTitle">SKILLS</h2>
            {skillsElements}
            <h2 className="cardTitle">HOBBIES</h2>

            {interestsElements}

            </div>

            <div className="cv-right">
                <h1>{personalInfo.name} {personalInfo.lastName}</h1>

                <div className="resume">
                    <h2 className="cardTitle">SUMMARY</h2>
                    <p>{resume.description}</p>
                </div>
                <h2 className="cardTitle">WORK EXPERIENCE</h2>
                {workExperienceElements}
                <h2 className="cardTitle">EDUCAITON</h2>
                {educationElements}
            </div>
          
          
        </div>
        <button onClick={exportToPDF}>Downlaod PDF</button>
        </div>
    )
}