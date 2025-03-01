import { useContext, useState } from "react"
import { CVContext, CVContextType } from "./CVContextProvider"
import { useNavigate,Navigate} from "react-router";

export default function InterestsCard(){
    const navigate=useNavigate();
    const {workExperience,interests,addNewInterest,editInterest,deleteInterest} = useContext<CVContextType>(CVContext);
    const [formData,setFormData ] = useState<string | undefined>(undefined)
    const [editInterestData,setEditInterestData] = useState<{data: string, index: number} | null>(null);

    const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) : void =>{
        console.log(event);

        setEditInterestData(prev=>{
            return {data: event.target.value,index: prev?.index ?? 0};
        })
    }
    const handleEditCommit = (interest: string,index: number) : void =>{
        editInterest(index,interest)
        setEditInterestData(null);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> ) : void =>{
        setFormData(event.target.value);
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) : void =>{
        event.preventDefault();
        if(formData){
            addNewInterest(formData);
            setFormData("");
        }
    }
    const handleEditAutoCommit = (event: React.KeyboardEvent<HTMLInputElement>): void =>{
        if(event.key==="Enter" && editInterestData){
            editInterest(editInterestData.index,editInterestData.data)
            setEditInterestData(null);
        }
    }
    const ElementsDisplay = editInterestData ? (
        <div>
          <input value={editInterestData.data} onKeyDown={handleEditAutoCommit}  onChange={handleEditChange} />
          <button
            onClick={() => handleEditCommit(editInterestData.data, editInterestData.index)}
          >
            Confirm Edit
          </button>
          <button onClick={() => setEditInterestData(null)}>Cancel Edit</button>
        </div>
      ) : (
        interests.map((interest, index) => (
          <div className="interestsCard" key={index}>
            <p>{interest}</p>
            <button onClick={() => setEditInterestData({ data: interest, index })}>
              Edit
            </button>
            <button onClick={() => deleteInterest(index)}>Delete</button>
          </div>
        ))
      );
      
//     <div>
//     <input value={editInterestData.data} onChange={handleEditChange} />
//     <button onClick={()=>handleEditCommit(interest,index)} >Confirm Edit</button>
//     <button onClick={()=>setEditInterestData(null)}>Cancel Edit</button>
// </div>
    
   const handleNext= () =>{
    if(interests.length>0){
      navigate("/skills");
    }
    else console.log("You need to add an interest");
   }
     {return workExperience.length>0 ? (
        <div>
            {ElementsDisplay}
       {editInterestData===null && <form onSubmit={handleSubmit} className="interestsForm">

                <input value={formData} onChange={handleChange}/>
                <button type="submit">Add New Interest</button>
            </form>}
            <button onClick={handleNext}>Go To Next Step</button>
        </div> 
    ) : <Navigate to="/workexperience" /> }
}