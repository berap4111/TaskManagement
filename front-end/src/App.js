
import './App.css';
import Navbar from './components/navbar/Navbar.js';
import Home from './components/home/Home.js';
import Footer from './components/footer/Footer.js';
import AboutUs from './components/about-us/AboutUs.js';
import Signup from './components/signup/Signup.js'
import Todo from './components/todo/Todo.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/signIn/SignIn.js';
import { useEffect } from 'react';
import { useDispatch } from "react-redux"
import { authAction } from "./store";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const id = sessionStorage.getItem("id")
    if (id) {
      dispatch(authAction.login())
    }
  }, [dispatch]);

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 flex flex-col bg-fixed bg-cover" style={{ backgroundImage: "url('path-to-your-image.jpg')" }}>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/signUp' element={<Signup />} />
            <Route path='/todo' element={<Todo />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/logout' element={<Home />} />
          </Routes>
          <Footer />
        </Router>
      </div>


    </>
  );
}

export default App;
