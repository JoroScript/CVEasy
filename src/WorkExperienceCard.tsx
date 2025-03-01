import React from 'react';
import { useContext, useEffect, useState } from "react"
import { CVContext, CVContextType, WorkExperience } from "./CVContextProvider";
import { useNavigate,Navigate } from "react-router";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


 type editData = {
    jobTitle: string,
    startDate: string,
    endDate: string,
    description: string,
    hirer: string,
    index: number
} | null
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
export default function WorkExperienceCard(){
    const [open, setOpen] = React.useState(false); // for dialog

  const handleClickOpen = () => { // open dialog
    setOpen(true);
  };

  const handleClose = () => { // close dialog
    setOpen(false);
  };
    const defaultExp = {
        jobTitle: "",
    startDate: "",
    endDate: "",
    description: "",
    hirer: ""
    }
    const navigate = useNavigate();
    const {workExperience,resume,updateWorkExperience,editWorkExperience,deleteWorkExperience} = useContext<CVContextType>(CVContext);
    const [formData,setFormData] = useState<WorkExperience>(defaultExp);
    const [editData,setEditData] = useState<editData>(null);

    console.log(formData);

    useEffect(()=>{
        const storedExp = localStorage.getItem('workExperience');
        const storedForm = storedExp ? JSON.parse(storedExp) : null

        if(storedForm){
            setFormData(storedForm)
        }

    },[])

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        
        const allKeysHaveValue = Object.values(formData).every(value=>value!=="");
        if(allKeysHaveValue){
            setOpen(true);
            updateWorkExperience(formData);
            setFormData(defaultExp)
            console.log("successfully added")
        }
        else console.log("need to fill all fields");
    }
    // if(allKeysHaveValue){
    //     localStorage.setItem('WorkExperience', JSON.stringify(workExperience))
    //     console.log("you went next page");
    // navigate("/workexperience"); // next but i hgaven't done it already
        
    // }
    // else{
    //     console.log("fill out all fields")
    // }
    function handleChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>){
        setFormData(prev=>{
           return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
        }
        function handleQuillChange(value: string){
          if(value.length>=50){
          setFormData(prev=>{
            return{
              ...prev,
              description: value
            }
          })
        }
        }
        function handleEditQuillChange(value: string){
          if(value.length>=50){
          setEditData(prev=>{
            return{
              ...prev,
              description: value
            }
          })
        }
        }
        function handleEditChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>){          
            setEditData(prev=>{
               return {
                    ...prev,
                    [event.target.name]: event.target.value
                }
            })
            }
            function handleEditCommit(){
                setEditData(null);
                if(editData){
                editWorkExperience(editData.index,{
                    jobTitle: editData.jobTitle, 
                    startDate: editData.startDate, 
                    endDate: editData.endDate, 
                    description: editData.description, 
                    hirer: editData.hirer}) // object without the index
                }
            }
            const handleNext = ()=>{
              if(workExperience.length>0){
                navigate('/interests')
              }
            }

            if(!resume){
              return <Navigate to="/resume" />
            }
            else console.log(resume);
     return (
        <div>
        { workExperience.length>0 && (
            <>
       
      <Dialog
      fullWidth={true}
      maxWidth={'md'}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        sx={{
            '& .MuiPaper-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.85)', // Customize the dialog's paper background
              boxShadow: 'none', // Remove shadow if needed
            },
          }}
        onClose={handleClose}
        
 
      >
        <DialogTitle><h3>{editData ? "Edit Work Experience" : "Work Experiences"}</h3> </DialogTitle>
        <DialogContent>
          <DialogContentText>
           
            {editData===null ?   workExperience.map((exp,index)=>{
                return (

                    <div key={index}>
                        <h1>{index+1}</h1>
                        <p>Job Title: {exp.jobTitle}</p>
                        <p>Job Employer: {exp.hirer}</p>
                        <p>Start Date: {exp.startDate} / End Date: {exp.endDate}</p>
                        <ReactQuill className='readOnlyQuill' readOnly={true} theme="snow" placeholder="Job Description..." value={exp.description}></ReactQuill>
                        <button onClick={()=>setEditData({
                            jobTitle: exp.jobTitle, 
                            hirer: exp.hirer, 
                            startDate: exp.startDate, 
                            endDate: exp.endDate, 
                            description: exp.description,
                            index: index
                            })}>Edit</button>
                            <button onClick={()=>deleteWorkExperience(index)}>Delete</button>
                    </div>
            )

            }) :  (
                    <div>
                        <p>Job Title: <input name="jobTitle" onChange={handleEditChange}  value={editData.jobTitle}/></p>
                        <p>Job Employer: <input name="hirer" onChange={handleEditChange} value={editData.hirer}/></p>
                        <p>Start Date: <input name="startDate" onChange={handleEditChange} value={editData.startDate}/> / End Date: <input name="endDate" onChange={handleEditChange} value={editData.endDate}/></p>
                        <ReactQuill className='workQuill' theme="snow" placeholder="Job Description..." value={editData.description} onChange={handleEditQuillChange}></ReactQuill>
                        <button onClick={()=>setEditData(null)}>Close</button>
                        <button onClick={()=>handleEditCommit()}>Update</button>
                   </div>
                   
                ) }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      </>)}
     <form className="workForm" onSubmit={handleSubmit}>
        <div>
        <label htmlFor="jobTitle">Job Title</label>
        <input id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Job Title..."/>
        </div>
        <div>
        <label htmlFor="hirer">Employer</label>
        <input id="hirer" name="hirer" value={formData.hirer} onChange={handleChange} placeholder="Job Employer..."/>
        </div>
        <div>
        <label htmlFor="startDate">Start Date</label>
        <input type="date" onChange={handleChange} name="startDate" value={formData.startDate} id="startDate" />
        </div>
        <div>
            <label htmlFor="endDate">End Date</label>
        <input type="date" onChange={handleChange} value={formData.endDate} name="endDate" id="endDate" />
        </div>
        <ReactQuill className='workQuill' theme="snow" placeholder="Job Description..." value={formData.description} onChange={handleQuillChange}></ReactQuill>
        <button type="submit" >Add Work Experience</button>
       {workExperience.length>0 && <Button style={{backgroundColor: "transparent", border: "1px solid #FFF", color: "#FFF", transition: "transform 0.3s ease"}} variant="outlined" onClick={handleClickOpen}>
        Show Work Experience
      </Button>
        }
        <button onClick={handleNext}>Go To Next Section</button>
    </form>
    
    </div>
     )
}