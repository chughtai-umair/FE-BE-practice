import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import FormComponent from "./components/FormComponent";
import RegisterComponent from "./components/RegisterComponent";
import SignInComponent from "./components/SignInComponent";
import Dashboard from "./components/Dashboard";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import LaptopList from "./components/dashboard/LaptopList";
import AddLaptop from "./components/dashboard/AddLaptop";
import reactLogo from "./assets/react.svg";
import "./App.css";

const Home = () => (
  <div className="h-screen w-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 flex items-center justify-center overflow-hidden">
    <div className="text-center px-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-12 border border-white/20 max-w-2xl">
        <h1 className="text-6xl font-bold text-white mb-6">Welcome Home</h1>
        <p className="text-xl text-blue-100 mb-8">
          Professional React Application with Modern Design
        </p>
        <div className="space-y-4">
          <Link
            to="/signin"
            className="block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-200 font-semibold shadow-lg transform hover:scale-105"
          >
            Get Started
          </Link>
          <Link
            to="/form"
            className="block bg-white/10 border border-white/30 text-white px-8 py-4 rounded-lg hover:bg-white/20 transition duration-200 font-medium backdrop-blur-sm"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="overflow-x-hidden">
      <Router>
        <Routes>
          {/* Full screen pages without navigation */}
          <Route path="/signin" element={<SignInComponent />} />
          <Route path="/register" element={<RegisterComponent />} />

          {/* Dashboard routes with sidebar */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="laptops" element={<LaptopList />} />
            <Route path="add-laptop" element={<AddLaptop />} />
          </Route>

          {/* Pages with navigation */}
          <Route
            path="/*"
            element={
              <div className="min-h-screen w-screen overflow-x-hidden">
                <nav className="bg-white/95 backdrop-blur-lg shadow-lg border-b border-white/20 fixed top-0 left-0 right-0 z-50">
                  <div className="w-full px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                          <img
                            className="h-8 w-8"
                            src={reactLogo}
                            alt="React Logo"
                          />
                          <span className="ml-2 text-xl font-bold text-gray-800">
                            MyApp
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-8">
                        <Link
                          to="/"
                          className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200 hover:bg-blue-50"
                        >
                          Home
                        </Link>
                        <Link
                          to="/form"
                          className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200 hover:bg-blue-50"
                        >
                          Contact
                        </Link>
                        <Link
                          to="/signin"
                          className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200 hover:bg-blue-50"
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/register"
                          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-200 shadow-sm"
                        >
                          Register
                        </Link>
                      </div>
                    </div>
                  </div>
                </nav>

                <main className="w-full pt-16">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/form" element={<FormComponent />} />
                  </Routes>
                </main>
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
