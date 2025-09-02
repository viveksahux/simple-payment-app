import GetUsers from "./users";
import { useState, useEffect } from "react";
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card"
import axios from "axios"      

function Dasboard(){
  const [balance, setBalance] = useState(null);     // state to hold the balance
  const [loading, setLoading] = useState(true);     // optional: show loading state

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/payments/balance`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance("Error"); // fallback value
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);
  return(

    <div className="flex justify-center items-start p-2 mt-7 w-full overflow-x-auto">
      <Card className="w-full sm:max-w-xl md:max-w-2xl shadow-xl">
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription className="text-md font-semibold">
            Your Balance:{" "}
            {loading
              ? "Loading..."
              : balance !== "Error"
              ? `₹${balance}`
              : "Unable to fetch balance"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GetUsers />
        </CardContent>
      </Card>
    </div>
  )


}
 
export default Dasboard;