interface InputData{
    query?: string
}
export const fetchProducts = async({query}:InputData) =>{
    if (query === undefined){
        const data = await fetch(`http://localhost:8080/product/`,{
        method: "GET"
    }).then((res)=>{
        return res.json()
    }).then((data)=>{
        return data
    })
    return data
    }else{
        const data = await fetch(`http://localhost:8080/product/?category=${query}`,{
        method: "GET"
    }).then((res)=>{
        return res.json()
    }).then((data)=>{
        return data
    })
    return data
    }
    
}
export const fetchCart = async(id:number) =>{
    const data = await fetch(`http://localhost:8080/cart/?user_id=${id}`,{
        method:'GET'
    }).then((res)=>{
        return res.json()
    }).then((data)=>{
        return data
    })
    return data
}
export const fetchProduct = async(id:number) =>{
    const data = await fetch(`http://localhost:8080/product/prod?id=${id}`,{
        method: 'GET'
    }).then((res)=>{
        return res.json()
    }).then((data)=>{
        return data
    })
    return data
}
