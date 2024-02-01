interface InputData{
    query?: string
}
export const fetchProducts = async({query}:InputData) =>{
    if (query === undefined){
        const data = await fetch(`${process.env.NEXT_PUBLIC_API}product/`,{
        method: "GET"
    }).then((res)=>{
        return res.json()
    }).then((data)=>{
        return data
    })
    return data
    }else{
        const data = await fetch(`${process.env.NEXT_PUBLIC_API}product/?category=${query}`,{
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
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}cart/?user_id=${id}`,{
        method:'GET'
    }).then((res)=>{
        return res.json()
    }).then((data)=>{
        return data
    })
    return data
}
export const fetchProduct = async(id:number) =>{
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}product/prod?id=${id}`,{
        method: 'GET'
    }).then((res)=>{
        return res.json()
    }).then((data)=>{
        return data
    })
    return data
}
