import axios from 'axios';

const API = async (endPoint,method,data)=>{
    const headers={
        Accept:'application/json,text/plain,*/*',
        'Content-Type': 'application/json',
    }
    const API_BASE_URL = 'http://localhost:4001';
    const promise = new Promise(async(resolve,reject)=>{
        try{
            const request = data || {};
            let response = null;
            const config ={
                method,
                url:API_BASE_URL+endPoint,
                data:request,
                header:headers
            }
            response = await axios(config);
            if(response){
                const formattedRes = response;
                resolve(formattedRes)
            }else{
                reject()
            }
        }catch(err){
            resolve(err.response)
        }
    })
    return promise;
}

export default API;