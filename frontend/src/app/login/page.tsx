"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useMutation, useQuery } from "react-query"
import { getUserAuth, registerUserAuth } from "@/utlis/auth"
import React, { useState } from "react"
import { Router } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { useDispatch } from "react-redux"
import { logIn } from "../../../redux/features/auth-slice"
interface fromData{
    username: string,
    email: string,
    password: string
}
interface IGETAuthResponse{
    success: boolean
    message: string
}
export default function Login() {
    const dispatch = useDispatch()
    const router = useRouter()

    const initialState = {
        username: "",
        email: "",
        password:""
    }
    const [formData,setFormData] = useState<fromData>(initialState)
    const {toast} = useToast()
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const {name,value} = e.target
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
    }
   

    const handleLoginSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const data = await getUserAuth(formData)
        if(data.success){
            dispatch(logIn({user: data.user}))
            toast({
                title: 'Login Successfully',
                description: "Login "
            })
            router.push('/')
        }else{
            toast({
                title: 'Login Unsuccessfull',
                description: data.message
            })
        }
    }
    const handleRegisterSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const data = await registerUserAuth(formData)
        if(data.success){
            dispatch(logIn({user: data.user}))
            toast({
                title: 'Login Successfully',
                description: "Login"
            })
            router.push('/')
        }else{
            toast({
                title: 'Login Unsuccessfull',
                description: data.message
            })
        }
    }
    return (
        <>  
            <div className="w-full flex justify-center items-center h-full md:mt-20">
                <Tabs defaultValue="login" className="max-w-[450px] ">
                    <TabsList className="flex w-full px-5">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>

                    </TabsList>
                    <TabsContent value="login">
                        <Card>
                            <form onSubmit={(e)=>handleLoginSubmit(e)}>
                            <CardHeader>
                                <CardTitle>Login</CardTitle>
                                <CardDescription>
                                   Welcome Back to Your Account. Continue with your email id and password.``
                                </CardDescription>
                            </CardHeader>
                          
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Email</Label>
                                    <Input id="email" defaultValue="xyz@email.com" name="email" value={formData.email} onChange={handleChange}/>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="username">Password</Label>
                                    <Input id="password" defaultValue="*****" name="password" value={formData.password} onChange={handleChange}/>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">login</Button>
                            </CardFooter>
                            </form>
                        </Card>
                    </TabsContent>
                    <TabsContent value="register">
                    <Card>
                        <form onSubmit={handleRegisterSubmit}>
                            <CardHeader>
                                <CardTitle>Register</CardTitle>
                                <CardDescription>
                                   Create new Account for better experience in shopping. Use email id with appropriate password.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Username</Label>
                                    <Input id="username" name="username" defaultValue="@pedro" value={formData.username} onChange={handleChange}/>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="name">Email</Label>
                                    <Input id="email" name="email" defaultValue="xyz@email.com" value={formData.email} onChange={handleChange}/>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="username">Password</Label>
                                    <Input id="password" name="password" defaultValue="*****" value={formData.password} onChange={handleChange}/>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">Register</Button>
                            </CardFooter>
                            </form>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}