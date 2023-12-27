import { useEffect, useState } from 'react';
import { getAccessToken, getProjects } from '@/app/api/task'; // Import your server functions
import { useSearchParams } from 'next/navigation';

type Subtask = {
  id: string;
  status: number;
  title: string;
  sortOrder: number;
  startDate: string;
  isAllDay: boolean;
  timeZone: string;
  completedTime: string;
};

type Task = {
id: string;
projectId: string;
title: string;
content: string;
desc: string;
isAllDay: boolean;
startDate: string;
dueDate: string;
timeZone: string;
reminders: string[];
repeatFlag: string;
priority: number;
status: number;
completedTime: string;
sortOrder: number;
items: Subtask[];
};

type Project = {
  id: string;
  name: string;
  color: string;
  closed: boolean;
  groupId: string;
  viewMode: string;
  permission: string;
  kind: string;
};

const Todo:React.FC = () => {
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [state, setState] = useState<string>('');
  const [authCode, setAuthCode] = useState<string | null>(null);
  const [accessTokenStatus, setAccessTokenStatus ] = useState<Boolean>(false);

  // useEffect(() => {
  //   // Generate a new state value and save it in the session storage
  //   const newState = Math.random().toString(36).substring(5);
  //   setState(newState);
  //   sessionStorage.setItem('state', newState);

  //   // Check if there's an authorization code in the URL
  //   const searchCode = searchParams.get('code');
  //   if (searchCode) {
  //     setAuthCode(searchCode as string);
  //   }
  //   console.log(authCode);
  //   if(authCode !== null) {
  //     getAccessToken(authCode).then(isAccessTokenAvailable => {
  //       if(isAccessTokenAvailable) {
  //         setAccessTokenStatus(true);
  //         getProjects().then(allProjects => {
  //           setProjects(allProjects);
  //           // console.log('Call going ');
  //         });
  //       }
  //     });
  //   }
  // }, []);
  useEffect(()=>{
    const getAllProjects =async () => {
      const searchCode = searchParams.get('code');
      if (searchCode) {
        setAuthCode(searchCode as string);
      }
      // if(authCode !== null) 
      if(authCode !== null){
        getAccessToken(authCode);
        const allProjects = await getProjects();
        if(allProjects.length > 0 && projects.length === 0) 
          setProjects(allProjects);
        console.log(allProjects);
      }
    }
    getAllProjects();
  },[projects,setProjects,getAccessToken])

  return (
    <div>
      {authCode ?
        (projects.map(project => (
          <p key={project.id}>{project.id}</p>
        )))
      :
       <a href="https://ticktick.com/oauth/authorize?scope=tasks:read%20tasks:write&client_id=73589AjQIa9nO2G1qg&state=state&redirect_uri=http://localhost:3000&response_type=code">Authorize</a>
      }
    </div>
  );
};
export default Todo;