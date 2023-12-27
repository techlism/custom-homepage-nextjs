"use server"
// My failed attempt to create an API to have an to do list.
// Seems like I am not able to figure out how to work with OAuth2 (AS of now)
import axios from 'axios';
import qs from 'qs';
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
  

async function getAccessToken(authCode : string):Promise<void> {
        const url = `https://ticktick.com/oauth/token`;
        const data = {
            client_id: process.env.TICK_TICK_CLIENT_ID,
            client_secret: "7MkojR%dk2y^tn5Cx%MIJ&CO)&9$7OKQ",
            code: authCode,
            grant_type: process.env.GRANT_TYPE,
            scope: `${process.env.SCOPE_READ} ${process.env.SCOPE_WRITE}`,
            redirect_uri: `${process.env.REDIRECT_URI}&state=${process.env.STATE_VAR}`
        };
        const encoded = qs.stringify(data)
        
        // try {
            const response = await axios.post(url, qs.stringify(data), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            console.log(response);
            process.env.ACCESS_TOKEN = response.data.access_token;
        // } 
        // catch (error) {
        //     throw new Error(`Cannot get access token from TickTick : ${error}`);
        // }
    // }

}



// Function to get all projects
async function getProjects(): Promise<Project[]> {
    const url = `${process.env.API_BASE_URL}/open/v1/project`;
    console.log(url);
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(`Error in getProjects: ${error}`);
        return [];
    }
}

async function getAllTasks(projectId: string): Promise<Task[]> {
    const url = `${process.env.API_BASE_URL}/open/v1/project/${projectId}/task`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error(`Error in getAllTasks: ${error}`);
        return [];
    }
}

// Function to create a task
async function createTask(projectId: string, title: string): Promise<Task> {
    const url = `${process.env.API_BASE_URL}/open/v1/project/${projectId}/task`;

    try {
        const response = await axios.post(url, 
            { title }, 
            {
                headers: {
                    'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data;
    } catch (error) {
        throw new Error(`Error in createTask: ${error}`)
    }
}

// Function to update a task
async function updateTask(projectId: string, taskId: string, title: string): Promise<Task> {
    const url = `${process.env.API_BASE_URL}/open/v1/project/${projectId}/task/${taskId}`;

    try {
        const response = await axios.put(url, 
            { title }, 
            {
                headers: {
                    'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data;
    } catch (error) {
        throw new Error(`Error in updateTask: ${error}`);
    }
}

// Function to delete a task
async function deleteTask(projectId: string, taskId: string): Promise<void> {
    const url = `${process.env.API_BASE_URL}/open/v1/project/${projectId}/task/${taskId}`;

    try {
        const response = await axios.delete(url, 
            {
                headers: {
                    'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error(`Error in deleteTask: ${error}`);
    }
}

export {getAccessToken,getProjects,getAllTasks,deleteTask,createTask,updateTask};