import React  from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import womenEmpowerment from './Components/Services/empowerment/womenEmpowerment';
import Education from './Components/Services/education/Education';
import store from './redux/store';

function App() {

  return (
    <div className="App">
      <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news/:id" element={<FullNews />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/addnews" element={<AddNewNews />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/login" element={<Login  />} />
          <Route path='services/*' element={<Home />}>
            <Route path='awareness' element={<Awareness />} />
            <Route path='empowerment' element={<womenEmpowerment />} />
            <Route path='education' element={<Education />} />
          </Route>
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
