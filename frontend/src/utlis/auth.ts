interface formData{
    username: string,
    email: string,
    password: string
}
export const getUserAuth = (formData: formData):any =>{
    console.log(formData)
    const data = fetch(`http://localhost:8080/user/auth`,{
        method: 'POST',
        headers:{
            'Content-type':'application/json', 
            'Accept':'application/json'
        },
        body: JSON.stringify(formData)
    }).then((res)=>{
        return res.json()
    }).then((data)=>{
        console.log(data)
        return data
    })
    return data
}
export const registerUserAuth = (formData: formData):any =>{
    console.log(formData)
    const data = fetch(`http://localhost:8080/user/`,{
        method: 'POST',
        headers:{
            'Content-type':'application/json', 
            'Accept':'application/json'
        },
        body: JSON.stringify(formData)
    }).then((res)=>{
        return res.json()
    }).then((data)=>{
        console.log(data)
        return data
    })
    return data
}