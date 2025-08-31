import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function NotFound() {
  return (
      <div className="h-screen mx-auto grid place-items-center text-center px-8">
      <div>
        {/* Replace with your own SVG or Icon if not using FlagIcon */}
        <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
            <path fillRule="evenodd" d="M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054A8.25 8.25 0 0 0 18 4.524l3.11-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.77l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z" clipRule="evenodd" />
          </svg>


        </div>

        <h1 className="mt-10 text-3xl leading-snug  font-bold md:text-4xl">
          Error 404 <br /> It looks like something went wrong.
        </h1>

        <p className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
          Looks Like Page Dosen't Exsist Please visit a valid endpoint
        </p>

        <Link to="/"><Button className="btn-primary">Back to Home</Button></Link>
      </div>
    </div>
  );
}

export default NotFound;