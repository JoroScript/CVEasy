import { createContext, useState} from "react"
interface Props{
    children: React.ReactNode
}
export type PersonalInfo = {
    name: string,
    lastName: string,
    age: number | null
    email: string,
    phone: string,
    address: string,
    personImg: string | undefined
}
export type Resume = {
     title: string,
     description: string
} 
export type  Education = {
    name: string,
    place: string,
    startYear: number,
    endYear: number
}
export type WorkExperience = {
    jobTitle: string,
    startDate: string,
    endDate: string,
    description: string,
    hirer: string    
} 

 export type CVContextType = {
    personalInfo: PersonalInfo,
    resume: Resume,
    workExperience: WorkExperience[],
    interests: string[],
    skills: string[],
    education: Education[],

    updatePersonalInfo: (info: PersonalInfo)=>void,
    updateResume: (info: Resume)=>void,

    updateWorkExperience: (info: WorkExperience) => void,
    editWorkExperience: (index: number,toAdd: WorkExperience) => void,
    deleteWorkExperience: (index: number) => void,
    
    addNewInterest: (info: string) => void,
    editInterest: (index: number,info: string) => void,
    deleteInterest: (index: number) => void,
    addNewSkill: (info: string) => void,
    editSkill: (index: number,info: string) => void,
    deleteSkill: (index: number) => void
    
    updateEducation: (info: Education) => void
    editEducation: (index: number,toAdd: Education) => void
    deleteEducation: (index: number) => void


}
export const DefaultContextValues :CVContextType = {
    personalInfo: {
        name: "",
        lastName: "",
        age: null,
        email: "",
        phone: "",
        address: "",
        personImg: undefined
    },
    resume: {
        title: "",
        description: ""
    },

    workExperience: [],
    interests: [],
    skills: [],
    education: [],
    updatePersonalInfo: ()=>null,
    updateResume: ()=>null,

    updateWorkExperience: ()=>null,
    editWorkExperience: ()=>null,
    deleteWorkExperience: ()=>null,

    addNewInterest: ()=>null,
    editInterest: ()=>null,
    deleteInterest: ()=>null,

    addNewSkill: ()=>null,
    editSkill: ()=>null,
    deleteSkill: ()=>null,

    updateEducation: ()=>null,
    editEducation: ()=>null,
    deleteEducation: ()=>null,

    

}
export const CVContext = createContext<CVContextType>(DefaultContextValues)
//context needs to be exported - when useContext is used 
// if there is a contextProvider it uses the value from the contextProvider
// else it uses the defaultContextValues passed to the createContext

export default function CVContextProvider(props: Props){


    const [personalInfo,setPersonalInfo] = useState<PersonalInfo>(DefaultContextValues.personalInfo);
    const [resume,setResume] = useState<Resume>(DefaultContextValues.resume);
    const [workExperience,setWorkExperience] = useState<WorkExperience[]>(DefaultContextValues.workExperience)
    const [interests,setInterests] = useState<string[]>(DefaultContextValues.interests);
    const [skills,setSkills] = useState<string[]>(DefaultContextValues.skills);
    const [education,setEducation] = useState<Education[]>(DefaultContextValues.education);
    const updatePersonalInfo  = (data: PersonalInfo) => {
        setPersonalInfo(data);
    } 

    const updateResume  = (data: Resume) => {
        setResume(data)
    } 
    // workExperience functions
    const updateWorkExperience = (data: WorkExperience) =>{
        setWorkExperience(prev=>[...prev,data])
    }
    const editWorkExperience= (index: number,toAdd: WorkExperience) =>{
        setWorkExperience(prev=>{
            const newExp=[...prev];
            newExp.splice(index,1,toAdd)
            return newExp;
        })
    }
    const deleteWorkExperience = (index: number) =>{
        setWorkExperience(prev=>{
            const newExp = [...prev]
            newExp.splice(index,1)
            return newExp
        })
    }

    // Education functions

    const updateEducation = (data: Education) =>{
        setEducation(prev=>[...prev,data])
    }
    const editEducation= (index: number,toAdd: Education) =>{
        setEducation(prev=>{
            const newEd=[...prev];
            newEd.splice(index,1,toAdd)
            return newEd;
        })
    }
    const deleteEducation = (index: number) =>{
        setEducation(prev=>{
            const newEd = [...prev]
            newEd.splice(index,1)
            return newEd
        })
    }

    // interests functions
    const addNewInterest = (data: string) =>{
        setInterests(prev=>[...prev,data]);
    }

    const editInterest = (index: number, data: string)=>{
        setInterests(prev=>{
            const newInterests=[...prev];
            newInterests.splice(index,1,data);
            return newInterests;
        })
    }

    const deleteInterest = (index: number) =>{
        setInterests(prev=>{
            const newInterests=[...prev];
            newInterests.splice(index,1);
            return newInterests;
        })
    }

    const addNewSkill = (data: string) =>{
        setSkills(prev=>[...prev,data]);
    }

    const editSkill = (index: number, data: string)=>{
        setSkills(prev=>{
            const newSkills=[...prev];
            newSkills.splice(index,1,data);
            return newSkills;
        })
    }

    const deleteSkill = (index: number) =>{
        setSkills(prev=>{
            const newSKills=[...prev];
            newSKills.splice(index,1);
            return newSKills;
        })
    }

    return(
        <CVContext.Provider value={{personalInfo,
            resume,
            updatePersonalInfo,
            updateResume,

            workExperience,
            updateWorkExperience,
            editWorkExperience,
            deleteWorkExperience,

           interests,
           addNewInterest,
           editInterest,
           deleteInterest,

           skills,
           addNewSkill,
           editSkill,
           deleteSkill,

           education,
           updateEducation,
           editEducation,
           deleteEducation

        }}>
        {props.children}
        </CVContext.Provider>
    )
}
