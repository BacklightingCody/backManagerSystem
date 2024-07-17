import request from '@/utils/request'

export const login=(username:string,password:string)=>{
    return request.post('/login',{
        username,password
    })
}
export const getInfo=()=>{
    return request.post('/getinfo')
}

export const logout=()=>{
    return request.post('/logout')
}

export const changePassword=(data:{oldpassword:string,newpassword:string,repassword:string})=>{
    return request.post('/updatepassword',data)
}
