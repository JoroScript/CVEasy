import { useContext } from "react";
import { CVContext, CVContextType } from "./CVContextProvider";
import {exportToPDF} from "./exportToPDF"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MailIcon from '@mui/icons-material/Mail';
import RoomIcon from '@mui/icons-material/Room';
import InfoIcon from '@mui/icons-material/Info';
import PhoneIcon from '@mui/icons-material/Phone';
export default function CvCard(){
    const {education,workExperience,skills,interests,languages,personalInfo,resume} = useContext<CVContextType>(CVContext);

    const workExperienceElements = workExperience.map(exp=>{
        return <div className="workExperience">

            <div className="work-div">
            <h3 className="job-title">{exp.jobTitle}</h3>
            <p className="work-date">{formatYearMonth(exp.startDate)} - {formatYearMonth(exp.endDate)}</p>

            </div>
                <h3 className="hirer">{exp.hirer}</h3>
            
            <ReactQuill className='readOnlyQuill' readOnly={true} theme="snow" value={exp.description}></ReactQuill>

        </div>
    })
    function formatYearMonth(dateString: string) : string {
        const date = new Date(dateString);
        
        const year = date.getFullYear();
        const month = date.toLocaleString("en-US", { month: "short" });
    
        return `${year} ${month.toUpperCase()}`;
    }

    const educationElements = education.map(ed=>{
        return <div className="educationElement">
            <div className="work-div">
            <h3>{ed.name}</h3>
            <p>{ed.startYear} - {ed.endYear}</p>
            </div>
            <p>{ed.place}</p>
        </div>
    })

    const skillsElements = skills.map(skill=>{
        return <li>{skill}</li>
    })

    const interestsElements = interests.map(interest=>{
        return <li>{interest}</li>
    })
    const languageElements= languages.map(interest=>{
        return <li>{interest}</li>
    })
    return (
        <div className="cv-outer">
          
        <div id="cv-container">
            <div className="cv-left">
            <img className="cvImg" src={personalInfo.personImg}/>

            <div className="personalInfo">
                <h2 className="cardTitle">CONTACTS</h2>

               <div><MailIcon/>  <p>{personalInfo.email}</p></div>
                <div><RoomIcon/>  <p>{personalInfo.address}</p></div>
                <div><InfoIcon/> <p> {personalInfo.name} {personalInfo.lastName},{personalInfo.age}</p></div>
                 <div><PhoneIcon/> <p>{personalInfo.phone}</p></div>

            </div>
            <div className="skills">

            <h2 className="cardTitle">SKILLS</h2>
            {skillsElements}

            </div>

            <div className="hobbies">
            <h2 className="cardTitle">HOBBIES</h2>
            {interestsElements}
            </div>


            <div className="languages">
            <h2 className="cardTitle">LANGUAGES</h2>
            {languageElements}
            </div>

            
            </div>

            <div className="cv-right">
                <h1><span className="firstName">{personalInfo.name}</span> <span className="lastName">{personalInfo.lastName}</span></h1>

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