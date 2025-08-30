import { useState } from "react";  // Import useState for backend error state
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom";
import axios from 'axios';

function Signup() {
    // Zod schema for validation (remains the same)
    const formSchema = z.object({
        firstname: z.string().min(1, "Firstname is required"),
        lastname: z.string().min(1, "Lastname is required"),
        username: z.string().min(2, "Username must be at least 2 characters"),
        email: z.email("Invalid email format"),
        password: z.string()
            .min(8, "Password must be at least 8 characters long")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    });

    // Using React Hook Form with Zod validation
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            username: "",
            email: "",
            password: "",
        }
    });

    // Handle form submission
    const [response, setResponse]= useState(null); //State to handle response from
    const onSubmit = async (data) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`,
        data, //raw json data here as our express needs
        {
            headers: {
            'Content-Type': 'application/json',
            },
        }
        );
        setResponse(response.data.message);

    } catch (error) {
    //Check if it's an Axios error with a response
    if (error.response && error.response.data && error.response.data.message) {
      setResponse(error.response.data.message); // Show backend error
    } else {
      setResponse("Something went wrong. Please try again.");
    }
    }
    };


    return (
        <div className="flex justify-center px-4 sm:px-6 md:px-8">
            <Card className="w-full max-w-lgw-full max-w-md mt-10 p-6 md:max-w-lg">
                <CardHeader>
                    <CardTitle className="font-bold text-xl">Sign Up</CardTitle>
                    <CardDescription>Welcome to EasyPay - Let's get started by creating a new account</CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                        <div className="md:flex space-x-4">
                            <div className="flex-1">
                                <Fields
                                    type="text"
                                    placeholder="First Name"
                                    name="firstname"
                                    register={register}
                                    error={errors.firstname?.message}
                                />
                            </div>
                            <div className="flex-1">
                                <Fields
                                    type="text"
                                    placeholder="Last Name"
                                    name="lastname"
                                    register={register}
                                    error={errors.lastname?.message}
                                />
                            </div>
                        </div>
                        <Fields
                            type="text"
                            placeholder="Username"
                            name="username"
                            register={register}
                            error={errors.username?.message}
                        />
                        <Fields
                            type="email"
                            placeholder="Email"
                            name="email"
                            register={register}
                            error={errors.email?.message}
                        />
                        <Fields
                            type="password"
                            placeholder="Password"
                            name="password"
                            register={register}
                            error={errors.password?.message}
                        />
                    </CardContent>

                    <CardFooter className="flex flex-col items-start space-y-2">
                        {response && ( 
                            <div className={`text-sm ${
                           response.toLowerCase().includes("successful")
                                ? "text-blue-600" : "text-red-500"
                            }`}
                        > <p>{response}</p> </div> )}
                        <p className="text-muted-foreground text-sm">Already have an account?{' '}
                                <Link to="/signin" className="underline text-blue-600 hover:text-blue-800">
                                Sign in
                                </Link>
                        </p>
                        <Button type="submit" className="btn-primary">Sign Up</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}

// Fields Component (no changes needed)
function Fields({ type, placeholder, name, register, error }) {
    return (
        <div className="mb-4">
            <Label htmlFor={name} className="block text-sm font-medium text-gray-700">{placeholder}</Label>
            <Input
                {...register(name)}  // Register the input field with React Hook Form
                type={type}
                id={name}
                placeholder={placeholder}
                className={`mt-1 p-2 w-full border rounded-md ${error ? 'border-red-500' : ''}`}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}  {/* Show error message */}
        </div>
    );
}

export {Fields, Signup};

