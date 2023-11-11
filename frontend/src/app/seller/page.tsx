"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
interface fromData{
    name: string,
    price: string,
    desc: string,
    brand: string,
    image:string,
    stock: number,
    category: string,
}
export default function Seller_Page() {
    const initialState = {
        name: "",
        price: "",
        desc: "",
        brand: "",
        image:"",
        stock: 0,
        category: "",
    }
    const [formData,setFormData] = useState<fromData>(initialState)
    const [uploadImg,setUploadImg] = useState<File | null>(null)
    const {toast} = useToast()
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const {name,value} = e.target
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
    }
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
        console.log(formData)
        e.preventDefault()
        const data = await fetch('http://localhost:8080/product/',{
            method: 'POST',
            body: JSON.stringify(formData),
            headers:{
                'Content-type':'application/json', 
                'Accept':'application/json'
            }
        }).then((res)=>{
            return res.json()
        }).then((data)=>{
            return data
        })
        handleImgSubmit(data.id)
    }
    const handleImgSubmit = async(id:any)=>{
        const form = new FormData()
        if(uploadImg){
            form.append('file',uploadImg)
        }
        const data = await fetch(`http://localhost:8080/image/img?id=${id}&name=${formData.name}&type=product`,{
            method: 'POST',
            body: form
        })
    }
    

    return (
        <div>
          
                <Card className="max-w-lg">
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>Products</CardTitle>
                            <CardDescription>
                                Welcome Back to Your Account. Continue with your email id and password.``
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Product Name</Label>
                                <Input id="name"  name="name" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="price">Price</Label>
                                <Input id="price"  name="price" value={formData.price} onChange={handleChange} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="desc">Produvt Description</Label>
                                <Input id="desc"  name="desc" value={formData.desc} onChange={handleChange} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="brand">Brand</Label>
                                <Input id="brand"  name="brand" value={formData.brand} onChange={handleChange} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="stock">Stock</Label>
                                <Input id="stock"  name="stock" value={formData.stock} onChange={handleChange} />
                            </div>
                            
                            <div className="space-y-1">
                                <Label htmlFor="category">Category</Label>
                                <Input id="category"  name="category" value={formData.category} onChange={handleChange} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="file">File</Label>
                                <Input id="file"  name="file" type="file" onChange={(e) => {
                                    if(e.target.files){
                                        setUploadImg(e.target.files[0])
                                    }
                                }}/>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Submit</Button>
                        </CardFooter>
                    </form>
                </Card>
        </div>
    )
}