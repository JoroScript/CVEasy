import { useContext, useEffect, useState } from "react"
import { CVContext, CVContextType } from "./CVContextProvider";
import { useNavigate,Navigate } from "react-router";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function ResumeCard(){

    const navigate = useNavigate();
    const {personalInfo,resume,updateResume} = useContext<CVContextType>(CVContext);

    const [formData,setFormData] = useState<string>(resume);

    useEffect(()=>{
        const storedResume = localStorage.getItem('ResumeForm');
        const storedForm = storedResume ? JSON.parse(storedResume) : null

        if(storedForm){
            setFormData(storedForm);
        }

    },[resume])

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
            if(formData.length>50){
            updateResume(formData)
            localStorage.setItem('resumeForm', JSON.stringify(formData))
            console.log("you went next page");
        navigate("/workexperience"); // next but i hgaven't done it already
            
        }
        else{
            console.log("fill out all fields")
        }
    }
    
    function handleChange(value: string){
        setFormData(value);
        }

    {return personalInfo.name  ? <form className="resumeForm" onSubmit={handleSubmit}>
        <ReactQuill value={formData} className="resumeQuill" placeholder="Your Resume here..." theme="snow" onChange={handleChange}></ReactQuill>
        <button type="submit" >Go to Next Page</button>    

    </form> : <Navigate to="/"/> }
}