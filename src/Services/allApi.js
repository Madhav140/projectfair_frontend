import { BASE_URL } from "./baseurl"
import { commonApi } from "./commonApi"

//register api
export const registerAPI = async(user)=>{
   return await commonApi('POST',`${BASE_URL}/user/register`,user,"")
}

//login api
export const loginAPI = async(user)=>{
   return await commonApi('POST',`${BASE_URL}/user/login`,user,"")
}

//addproject api
export const addProjectAPI = async(reqbody,reqheader)=>{
   return await commonApi('POST',`${BASE_URL}/projects/add`,reqbody,reqheader)
}

//get homeproject
export const gethomeProject = async()=>{
   return await commonApi('GET',`${BASE_URL}/project/home-project`)
}

//get allproject
export const getallProject = async(searchkey,reqHeader)=>{
   //we are sending the search key as query parameter = path?key=value
   return await commonApi('GET',`${BASE_URL}/project/all-project?search=${searchkey}`,"",reqHeader)
}

//get USERproject
export const getuserProject = async(reqHeader)=>{
   return await commonApi('GET',`${BASE_URL}/user/all-project`,"",reqHeader)
}

//Edit project
export const editProjectAPI = async(projectId,reqBody,reqHeader)=>{
   //project id is passed as path parameter
   return await commonApi('PUT',`${BASE_URL}/project/edit/${projectId}`,reqBody,reqHeader)
}


//delete project
export const deleteuserProject = async(projectID,reqHeader)=>{
    //project id is passed as path parameter
   return await commonApi('DELETE',`${BASE_URL}/project/remove/${projectID}`,{},reqHeader)
}

//Edit profile
export const editProfileAPI = async(userId,reqBody,reqHeader)=>{
   //project id is passed as path parameter
   return await commonApi('PUT',`${BASE_URL}/user/edit/${userId}`,reqBody,reqHeader)
}



