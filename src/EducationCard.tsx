import React from 'react';
import { useContext, useEffect, useState } from "react"
import { CVContext, CVContextType, Education } from "./CVContextProvider";
import { useNavigate,Navigate } from "react-router";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

 type editData = {
    name: string,
    startYear: number,
    endYear: number,
    place: string,
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
export default function EducationCard(){
    const [open, setOpen] = React.useState(false); // for dialog

  const handleClickOpen = () => { // open dialog
    setOpen(true);
  };

  const handleClose = () => { // close dialog
    setOpen(false);
  };
    const defaultEd = {
        name: "",
    startYear: 0,
    endYear: 0,
    place: ""
    }
    const navigate = useNavigate();
    const {languages,education,updateEducation,editEducation,deleteEducation} = useContext<CVContextType>(CVContext);
    const [formData,setFormData] = useState<Education>(defaultEd);
    const [editData,setEditData] = useState<editData>(null);

    console.log(formData);

    useEffect(()=>{
        const storedExp = localStorage.getItem('education');
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
            updateEducation(formData);
            setFormData(defaultEd)
            console.log("successfully added")
        }
        else console.log("need to fill all fields");
    }
    // if(allKeysHaveValue){
    //     localStorage.setItem('education', JSON.stringify(education))
    //     console.log("you went next page");
    // navigate("/education"); // next but i hgaven't done it already
        
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
                editEducation(editData.index,{
                    name: editData.name, 
                    startYear: editData.startYear, 
                    endYear: editData.endYear, 
                    place: editData.place, 
                }) // object without the index
                }
            }
            const handleNext = ()=>{
              if(education.length>0){
                navigate('/cv')
              }
            }
            if(languages.length===0){
             return <Navigate to="/languages"/>
            }

     return (
        <div>
        { education.length>0 && (
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
        <DialogTitle><h3>{editData ? "Edit Education" : "Educations"}</h3> </DialogTitle>
        <DialogContent>
          <DialogContentText>
           
            {editData===null ?   education.map((ed,index)=>{
                return (

                    <div key={index}>
                        <h1>{index+1}</h1>
                        <p>Education: {ed.name}</p>
                        <p>Place: {ed.place}</p>
                        <p>Start Year: {ed.startYear} / End Year: {ed.endYear}</p>
                        <button onClick={()=>setEditData({
                            name: ed.name, 
                            startYear: ed.startYear, 
                            endYear: ed.endYear, 
                            place: ed.place,
                            index: index
                            })}>Edit</button>
                            <button onClick={()=>deleteEducation(index)}>Delete</button>
                    </div>
            )

            }) :  (
                    <div>
                        <p>Education: <input name="name" onChange={handleEditChange}  value={editData.name}/></p>
                        <p>Start Year: <input name="startYear" onChange={handleEditChange} value={editData.startYear}/> / End Year: <input name="endYear" onChange={handleEditChange} value={editData.endYear}/></p>
                        <p>Place:  <input name="place"  onChange={handleEditChange} value={editData.place}/></p>
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
        <label htmlFor="name">Education</label>
        <input required id="name" name="name" value={formData.name} onChange={handleChange} placeholder="University of Economics in..."/>
        </div>
        <div>
        </div>
        <div>
        <label htmlFor="startYear">Start Year</label>
        <input required type="number"  min={1980} max={2024} onChange={handleChange} name="startYear" value={formData.startYear ? formData.startYear : ""} id="startYear" />
        </div>
        <div>
            <label htmlFor="endYear">End Year</label>
        <input required type="number" min={1981} max={2025} onChange={handleChange} value={formData.endYear ? formData.endYear : ""}  name="endYear" id="endYear" />
        </div>
        <input required  placeholder="Education place..." name="place" value={formData.place} onChange={handleChange}></input>
        <button type="submit" >Add Education</button>
       {education.length>0 && <Button style={{backgroundColor: "transparent", border: "1px solid #FFF", color: "#FFF", transition: "transform 0.3s ease"}} variant="outlined" onClick={handleClickOpen}>
        Show Education
      </Button>
        }
        <button onClick={handleNext}>Go To Next Section</button>
    </form>
    
    </div>
     )
}