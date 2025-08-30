import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Signup } from './pages/signup';
import Signin from "./pages/signin";
import NotFound from "./pages/notFound";
import LandingPage from "./pages/landing";
import ResetPassword from "./pages/resetPassword";
import { Navbar1 } from "./pages/navbar";
import Dasboard from './pages/dashboard';
// import { Footer } from './pages/footer';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar1/>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dasboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </>   
  )
}


export default App;
