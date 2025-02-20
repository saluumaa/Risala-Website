// import React, { useState, useEffect } from 'react'; // Import useState and useEffect
// import Message from '../message/Message';
// import apiRequest from '../../utils/apiRequest';
// import { useSelector } from 'react-redux';
// import { selectUser } from '../../redux/UsersSlice';
// import { useParams } from 'react-router-dom';


// const Chat = () => {
//   const [chats, setChats] = useState([]);
//   const currentUser = useSelector(selectUser) || null
 

//   useEffect(() => {
//     const fetchChats = async () => {
    
//       try {

//         const res = await apiRequest.get(`/chats/`);
//         setChats(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchChats(); // Call the async function to fetch chats
//   }, []);

  

//   return (
//     <div className='chat-container'>
//       <Message chats={chats} />
//     </div>
//   );
// };

// export default Chat;



import React, {useRef, useState} from "react";
import "./chat.css";
import ReactWhatsapp from 'react-whatsapp';
import { FaTimes, FaWhatsapp, FaPaperPlane, FaSmile, FaChevronDown } from "react-icons/fa";

const Chats = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        const whatsappNumber = "252634502594"; // your target number
        const whatsappMessage = `Hello, I would like to know more about your services. ${message}`;
        
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
        window.open(whatsappUrl, "_blank");

        setMessage("");
    };

    return (
        <div className="chat-wrapper">
            <section className={`chat-icon ${open ? "disabled" : ""}`}>
                <button onClick={() => setOpen(!open)} className="chat-btn" >
                    <FaWhatsapp className="fa-wahatsap" />
                    <span className="">Chat with us</span>
                </button>
                
            </section>

            {open && (
                <div className="chat-box-container">
                    <section className="chat-box">
                        <div className="chat-header">
                            <FaWhatsapp className="chat-header-whatsapp" />
                            <button onClick={() => setOpen(!open)}>
                                <FaChevronDown className="chat-header-chevron" />
                            </button>
                        </div>
                        <div className="chat-body">
                            <p>Hi there! How can we help you today?</p>
                        </div>
                        <form className="chat-footer" onSubmit={
                            handleFormSubmit
                        } >
                            <input type="text" 
                                placeholder="Type a message" 
                                className="message-input"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                               
                            />
                            <span className="smile-btn"><FaSmile /></span>
                            <button className="paper-btn"><FaPaperPlane /></button>
                        </form>
                    </section>
                    <section className="chat-box-close">
                        <button onClick={() => setOpen(!open)}>
                            <FaTimes className="chatbox-close" />
                        </button>
                    </section>
                </div>
            )
            }
        </div>
    );
};

export default Chats;
