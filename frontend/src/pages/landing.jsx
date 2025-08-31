import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-auto bg-white flex items-center justify-center px-6 mt-20">
      <div className="max-w-400 w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-5 md:mt-0">
        
        {/* Text Section */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Your Money, Your Way.
            <br />
            <span className="text-blue-500">Simple. Secure. Instant.</span>
          </h1>
          <p className="mt-6 text-gray-600 text-lg">
            Welcome to PayFlow — the easiest way to send, receive, and manage your money across the globe.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Image / Card Section */}
        <div>
          <Card className="shadow-xl p-2 sm:p-4 max-w-200">
            <img
              src="/landing.jpg"
              alt="Payment illustration"
              className="w-full h-auto object-cover rounded-lg"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
