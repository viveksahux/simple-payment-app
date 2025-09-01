import { useState } from "react";  // Import useState for backend error state
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card"
import { Fields } from "./signup";
import { Link } from "react-router-dom";
import axios from 'axios';



function ResetPassword(){
    const formSchema = z.object({
        email: z.string().email("Invalid email format"),
        password: z.string()
            .min(8, "Password is required to sign in")
    });
    // Using React Hook Form with Zod validation
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });
    const [response, setResponse] = useState(null);
    const onSubmit = async (data) => {
    try {
        const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signin`,
        data, //raw json data here as our express needs
        {
            headers: {
            'Content-Type': 'application/json',
            },
        }
        );
        setResponse(response.data.message);
        

    } catch (error) {
    // ✅ Check if it's an Axios error with a response
    if (error.response && error.response.data && error.response.data.message) {
      setResponse(error.response.data.message); // Show backend error
    } else {
      setResponse("Something went wrong. Please try again.");
    }
    }
    }; 
    return(
        <div className="flex justify-center px-4 sm:px-6 md:px-8">
            <Card className="w-full max-w-md mt-10 p-6 md:max-w-lg">
                <CardHeader>
                    <CardTitle className="font-bold text-xl">Update Password</CardTitle>
                    <CardDescription>Forgot your password? No worries - set a new one here.</CardDescription>
                </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
                <Fields name="email" placeholder="Email" type="text" register={register} error={errors.email?.message}/>
                <Fields name="password" placeholder="New Password" type="text" register={register} error={errors.password?.message}/>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-2">
                {response && ( <div
                            className={`text-sm ${
                            response.toLowerCase().includes("successful")
                                ? "text-blue-600" : "text-red-500"
                            }`}
                        > <p>{response}</p> </div> )}
                <p className="text-muted-foreground text-sm">Don't have an account yet?{' '}
                    <Link to="/signup" className="underline text-blue-600 hover:text-blue-800">
                    Register now
                    </Link>
                </p>
                <p className="text-muted-foreground text-sm">Forgot your current password?{' '}
                    <Link to="/resetPassword" className="underline text-blue-600 hover:text-blue-800">
                    Reset Now
                    </Link>
                </p>
                <Button type="submit" className="btn-primary">Sign In</Button>
            </CardFooter>

            </form>
            </Card>
        </div>
    )

}

export default ResetPassword