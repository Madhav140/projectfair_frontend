import axios from 'axios';


export const commonApi = async(httpRequest,url,reqbody,reqheader)=>{
    const reqConfig={
        method:httpRequest,
        url,
        data:reqbody,
        headers:reqheader?reqheader:{"Content-Type":"application/json"}  //there are two types of content to upload
    }
   return await axios(reqConfig).then((result)=>{
        return result
    }).catch((err)=>{
        return err
    })
}