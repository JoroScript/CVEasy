import { useContext, useState } from "react"
import { CVContext, CVContextType } from "./CVContextProvider"
import { useNavigate } from "react-router";
export default function SkillsCard(){
    const {skills,addNewSkill,editSkill,deleteSkill} = useContext<CVContextType>(CVContext);
    const [formData,setFormData ] = useState<string | undefined>(undefined)
    const [editSkillData,setEditSkillData] = useState<{data: string, index: number} | null>(null);
    const navigate = useNavigate();
    const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) : void =>{
        console.log(event);

        setEditSkillData(prev=>{
            return {data: event.target.value,index: prev?.index ?? 0};
        })
    }
    const handleEditCommit = (interest: string,index: number) : void =>{
        editSkill(index,interest)
        setEditSkillData(null);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> ) : void =>{
        setFormData(event.target.value);
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) : void =>{
        event.preventDefault();
        if(formData){
            addNewSkill(formData);
            setFormData("");
        }
    }
    const handleEditAutoCommit = (event: React.KeyboardEvent<HTMLInputElement>): void =>{
        if(event.key==="Enter" && editSkillData){
            editSkill(editSkillData.index,editSkillData.data)
            setEditSkillData(null);
        }
    }
    const ElementsDisplay = editSkillData ? (
        <div>
          <input value={editSkillData.data} onKeyDown={handleEditAutoCommit}  onChange={handleEditChange} />
          <button
            onClick={() => handleEditCommit(editSkillData.data, editSkillData.index)}
          >
            Confirm Edit
          </button>
          <button onClick={() => setEditSkillData(null)}>Cancel Edit</button>
        </div>
      ) : (
        skills.map((interest, index) => (
          <div className="skillsCard" key={index}>
            <p>{interest}</p>
            <button onClick={() => setEditSkillData({ data: interest, index })}>
              Edit
            </button>
            <button onClick={() => deleteSkill(index)}>Delete</button>
          </div>
        ))
      );
      
//     <div>
//     <input value={editSkillData.data} onChange={handleEditChange} />
//     <button onClick={()=>handleEditCommit(interest,index)} >Confirm Edit</button>
//     <button onClick={()=>setEditSkillsData(null)}>Cancel Edit</button>
// </div>
    
      const handleNext = () =>{
        if(skills.length>0){
            navigate("/languages")
        }
      }
    return(
        <div>
            {ElementsDisplay}
       {editSkillData===null && <form onSubmit={handleSubmit} className="skillsForm">

                <input value={formData} onChange={handleChange}/>
                <button type="submit">Add New Skill</button>
            </form>}
            <button onClick={handleNext} >Go To Next Step</button>
        </div> 
    )
    
}