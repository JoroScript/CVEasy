    import React, { useContext, useEffect } from "react";
    import {useNavigate } from "react-router-dom";
    import { CVContextType,PersonalInfo} from "./CVContextProvider";
    import { CVContext } from "./CVContextProvider";
    import { useState } from "react";

    export default function PersonalInfoCard(){
        const navigate = useNavigate();
        const {personalInfo,updatePersonalInfo} = useContext<CVContextType>(CVContext);
        const [formData,setFormData] = useState<PersonalInfo>(personalInfo)
        useEffect(()=>{
            const storedInfo = localStorage.getItem('personalInfoForm');
            const storedForm = storedInfo ? JSON.parse(storedInfo) : null
    
            if(storedForm){
                setFormData(storedForm);
            }
    
        },[])
        function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        console.log(event.target);
        setFormData(prev=>{
            if(event.target.name==="age"){
                    return{
                        ...prev,
                        [event.target.name]: Number.parseInt(event.target.value)
                    }
            }
            else return {
                ...prev,
                [event.target.name]: event.target.value
            }
        
        })
        }
        function handleSubmit(event: React.FormEvent<HTMLFormElement>){
            event.preventDefault();
        const allKeysHaveValue = Object.values(formData).every(value => value !== "" && value!==null && value!==undefined);
            if(allKeysHaveValue){
                updatePersonalInfo(formData);
                localStorage.setItem('personalInfoForm', JSON.stringify(formData))
                console.log("you went next page");
            navigate("/resume");
                
            }
            else{
                console.log("fill out all fields")
            }
        }
        function handleImageChange(event: React.ChangeEvent<HTMLInputElement>){
         const file=event.target.files?.[0]   
         if(file){
            const reader = new FileReader();
            reader.onloadend= () =>{
                setFormData(prev=>{
                    return {
                        ...prev,
                        personImg: reader.result as string
                    }
                })
            }
            reader.readAsDataURL(file)
         } 
        }
    return(
        <form  onSubmit={handleSubmit} className="personalInfo">
            <div className="imgDiv">
            <img src={formData.personImg? formData.personImg : "https://i.pinimg.com/736x/24/50/ae/2450ae69306cfbffc1260f3d74d7163b.jpg"}></img>
            <label className="custom-file-upload" htmlFor="img">{formData.personImg===undefined ? "Upload Photo" : "Change Photo"}</label>
            <input id="img" onChange={handleImageChange} type="file"></input>
            </div>

            <div>
            <label htmlFor="firstName">First Name:</label>
            <input id="firstName" onChange={handleChange} name="name" value={formData.name}/>
            </div>
            <div>
            <label htmlFor="lastName">Last Name:</label>
            <input id="lastName" onChange={handleChange} name="lastName" value={formData.lastName}/>
            </div>

            <div className="addressDiv">
           <label htmlFor="address">Address:</label>
           <input id="address" onChange={handleChange} name="address" value={formData.address}/>
           </div>

            <div>
            <label htmlFor="email">Email:</label>
            <input id="email" type="email" onChange={handleChange} name="email" value={formData.email}/>
            </div>
           
          
           
           <div>
           <label htmlFor="phone">Phone Number:</label>
           <input id="phone" onChange={handleChange} name="phone" value={formData.phone}/>
           </div>
            <div className="ageDiv">
            <label htmlFor="age">Age:</label>
                        <input id="age"  type="range" onInput={handleChange} min={10} max={90} name="age" value={formData.age?.toString() || 20} />
                        <p>{formData?.age || "Set Age"}</p>
            </div>
         

        <button type="submit" >Go to Next Page</button>    
        </form>
    ) 
    }