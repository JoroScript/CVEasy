import { useContext, useEffect, useState } from "react"
import { CVContext, CVContextType } from "./CVContextProvider";
import {Resume} from './CVContextProvider'
import { useNavigate } from "react-router";

export default function ResumeCard(){

    const navigate = useNavigate();
    const {resume,updateResume} = useContext<CVContextType>(CVContext);

    const [formData,setFormData] = useState<Resume>(resume);

    useEffect(()=>{
        const storedResume = localStorage.getItem('ResumeForm');
        const storedForm = storedResume ? JSON.parse(storedResume) : null

        if(storedForm){
            setFormData(storedForm);
        }

    },[resume])

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
    const allKeysHaveValue = Object.values(formData).every(value => value !== "");
        if(allKeysHaveValue){
            updateResume(formData)
            localStorage.setItem('resumeForm', JSON.stringify(formData))
            console.log("you went next page");
        navigate("/workexperience"); // next but i hgaven't done it already
            
        }
        else{
            console.log("fill out all fields")
        }
    }
    
    function handleChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>){
        setFormData(prev=>{
           return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
        }

     return <form className="resumeForm" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" value={formData.title} onChange={handleChange} placeholder="Catchy Title For Your Resume..."/>
        <textarea rows={5} cols={50} placeholder="Resume Description..." name="description" value={formData.description} onChange={handleChange}></textarea>
        <button type="submit" >Go to Next Page</button>    

    </form>
}