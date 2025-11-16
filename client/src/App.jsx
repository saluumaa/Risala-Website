import React  from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import About from './Components/About/About';
// import News from './Components/News/News';
import FullNews from './Components/News/FullNews';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import Register from './Components/register/Register';
import AddNewNews from './Components/News/AddNewNews';
import Volunteer from './Components/Volunteer/Volunteer';
import Awareness from './Components/Services/awareness/Awareness';
import WomenEmpowerment from './Components/Services/empowerment/WomenEmpowerment';
import Education from './Components/Services/education/Education';
import SummerYouth from './Components/summerPrograme/SummerYouth';
import store from './redux/store';
import Profile from './Components/profile/Profile';
import Chat from './Components/chat/Chat';
import Donate from './Components/Donate/Donate';
import AdminLayout from './Components/admin/AdminLayout';
import Dashboard from './Components/admin/pages/Dashboard';
import Users from './Components/admin/pages/Users';
import Programs from './Components/admin/pages/Programs';
import Charts from './Components/admin/pages/Charts';
import SummerProgram from './Components/admin/pages/SummerProgram';



function App() {

  return (
    <div className="App">
      <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />  
          {/* <Route path="/news" element={<News />} /> */}
          <Route path="/news/:id" element={<FullNews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/addnews" element={<AddNewNews />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/login" element={<Login  />} />
      
            <Route path='awareness' element={<Awareness />} />
            <Route path='empowerment' element={<WomenEmpowerment />} />
            <Route path='education' element={<Education />} />

          <Route path="/register" element={<Register />} />
          <Route path="/summerYouth" element={<SummerYouth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/donate" element={<Donate />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="programs" element={<Programs />} />
          <Route path="charts" element={<Charts />} />
          <Route path="summerProgram" element={<SummerProgram />} />
        </Route>


        </Routes>

        <Footer />
      </BrowserRouter>
      </Provider>

      <div className="messages">
        <Chat />
      </div>
    </div>
  );
}

export default App;
