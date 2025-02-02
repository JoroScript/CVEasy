import './index.css'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import CVContextProvider from './CVContextProvider'
import PersonalInfoCard from './PersonalInfoCard'
import ResumeCard from './ResumeCard'
import { useEffect } from 'react'
import WorkExperienceCard from './WorkExperienceCard'
import InterestsCard from './InterestsCard'
import SkillsCard from './SkillsCard'
import EducationCard from './EducationCard'
import CvCard from './CvCard'
function App() {
  useEffect(() => {
    // Clear localStorage when the page is reopened 
    localStorage.removeItem('personalInfoForm');
  }, []);
  return(

 <BrowserRouter>
 <CVContextProvider>
  <Routes>
    <Route path="/" element={<PersonalInfoCard/>}/>
    <Route path="/resume" element={<ResumeCard/>}/>
    <Route path="/workexperience" element={<WorkExperienceCard/>} />
    <Route path="/interests" element={<InterestsCard/>} />
    <Route path="/skills" element={<SkillsCard  />} />
    <Route path="/education" element={<EducationCard  />} />
    <Route path="/cv" element={<CvCard/>} />



  </Routes>
  </CVContextProvider>
 </BrowserRouter>
  )

}

export default App
