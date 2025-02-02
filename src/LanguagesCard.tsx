import { useContext, useState } from "react"
import { CVContext, CVContextType } from "./CVContextProvider"
import { useNavigate } from "react-router";
export default function LanguagesCard(){
    const {languages,addNewLang,editLang,deleteLang} = useContext<CVContextType>(CVContext);
    const [formData,setFormData ] = useState<string | undefined>(undefined)
    const [editLangData,seteditLangData] = useState<{data: string, index: number} | null>(null);
    const navigate = useNavigate();
    const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) : void =>{
        console.log(event);

        seteditLangData(prev=>{
            return {data: event.target.value,index: prev?.index ?? 0};
        })
    }
    const handleEditCommit = (interest: string,index: number) : void =>{
        editLang(index,interest)
        seteditLangData(null);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> ) : void =>{
        setFormData(event.target.value);
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) : void =>{
        event.preventDefault();
        if(formData){
            addNewLang(formData);
            setFormData("");
        }
    }
    const handleEditAutoCommit = (event: React.KeyboardEvent<HTMLInputElement>): void =>{
        if(event.key==="Enter" && editLangData){
            editLang(editLangData.index,editLangData.data)
            seteditLangData(null);
        }
    }
    const ElementsDisplay = editLangData ? (
        <div>
          <input value={editLangData.data} onKeyDown={handleEditAutoCommit}  onChange={handleEditChange} />
          <button
            onClick={() => handleEditCommit(editLangData.data, editLangData.index)}
          >
            Confirm Edit
          </button>
          <button onClick={() => seteditLangData(null)}>Cancel Edit</button>
        </div>
      ) : (
        languages.map((interest, index) => (
          <div className="languagesCard" key={index}>
            <p>{interest}</p>
            <button onClick={() => seteditLangData({ data: interest, index })}>
              Edit
            </button>
            <button onClick={() => deleteLang(index)}>Delete</button>
          </div>
        ))
      );
      
//     <div>
//     <input value={editLangData.data} onChange={handleEditChange} />
//     <button onClick={()=>handleEditCommit(interest,index)} >Confirm Edit</button>
//     <button onClick={()=>seteditLangsData(null)}>Cancel Edit</button>
// </div>
    
      const handleNext = () =>{
        if(languages.length>0){
            navigate("/education")
        }
      }
    return(
        <div>
            {ElementsDisplay}
       {editLangData===null && <form onSubmit={handleSubmit} className="languagesForm">

                <input value={formData} onChange={handleChange}/>
                <button type="submit">Add New Language</button>
            </form>}
            <button onClick={handleNext} >Go To Next Step</button>
        </div> 
    )
    
}