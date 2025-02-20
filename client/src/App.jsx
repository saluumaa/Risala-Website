import React  from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import News from './Components/News/News';
import FullNews from './Components/News/FullNews';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import Register from './Components/register/Register';
import AddNewNews from './Components/News/AddNewNews';
import Volunteer from './Components/Volunteer/Volunteer';
import Service from './Components/Services/Service';
import Awareness from './Components/Services/awareness/Awareness';
import WomenEmpowerment from './Components/Services/empowerment/WomenEmpowerment';
import Education from './Components/Services/education/Education';
import SummerYouth from './Components/summerPrograme/SummerYouth';
import store from './redux/store';
import Profile from './Components/profile/Profile';
import Chat from './Components/chat/Chat';

function App() {

  return (
    <div className="App">
      <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />  
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<FullNews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/addnews" element={<AddNewNews />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/login" element={<Login  />} />
          {/* <Route path='services' element={<Service />}> */}
            <Route path='awareness' element={<Awareness />} />
            <Route path='empowerment' element={<WomenEmpowerment />} />
            <Route path='education' element={<Education />} />
        {/* </Route> */}
          <Route path="/register" element={<Register />} />
          <Route path="/summerYouth" element={<SummerYouth />} />
          <Route path="/profile" element={<Profile />} />
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
