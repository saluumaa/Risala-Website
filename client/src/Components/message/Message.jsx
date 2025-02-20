// import React, { useState, useEffect, useRef } from 'react';
// import { FaEnvelope, FaTimes } from 'react-icons/fa';
// import './message.css';
// import { useSelector } from 'react-redux';
// import { selectUser } from '../../redux/UsersSlice'; // Assuming you have a UsersSlice for managing user data
// import apiRequest from '../../utils/apiRequest';

// const Message = ({ chats }) => {
//   console.log(chats)
//   const [open, setOpen] = useState(false);
//   const [chat, setChat] = useState(null);
//   const currentUser = useSelector(selectUser) || null; // Get the current user from the store
//   const messageEndRef = useRef();

 
//   // Fetch chat data
//   const handleOpenChat = async (id, receiver) => {
//     try {
//       let res;
//       if(currentUser.role === 'admin') {
//         res = await apiRequest.get(`/chats/`);
//         setChat({ ...res.data, receiver });
//         setOpen(true);
        
//       } else if(currentUser.role === 'user') {
//       const res = await apiRequest.get(`/chats/${id}`);
//       console.log(res.data)
//       setChat({ ...res.data, receiver });
//       setOpen(true); 
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const text = form.text.value;

//     if (!text) return; // Prevent sending empty messages

//     try{
//       const res = await apiRequest.post("/messages/"+chat._id, {text})
//       setChat(prev =>({...prev, messages: [...prev.messages, res.data]}))
//       e.target.text.value = ""
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   useEffect(() => {
//     if (chat) {
//       messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [chat]);

//   const toggleMessageBox = () => {
//     setOpen(!open);
//   };

//   // Format message timestamps
//   const format = (timestamp) => {
//     return new Date(timestamp).toLocaleTimeString();
//   };

//   return (
//     <div className='message-container'>
   
//     <div className='message-header' >
//       {chats.map((chat) => (
//         <button 
//         className={`message-btn ${open ? 'disabled' : ''}`}
       
//         onClick={() => handleOpenChat(chat._id, chat.receiver)}
//         disabled={open}
//       >
//         <span className='fa-envelope'><FaEnvelope /></span>
//         <span>Send Message</span>
//       </button>
//       ))}
      
     
//     </div>
 

//       {open && chat && (
//         <div className='message-box'>
//           <div className='close-btn' onClick={toggleMessageBox}>
//             <p>{chat.receiver?.username}</p>
//             <FaTimes className='fa-times' />
//           </div>

//           <div className='chat-list'>
//             <p>Please enter your message and we will get back to you as soon as possible.</p>
//             {chat.messages?.map((message) => (
//               <div
//                 className="chatMessage"
//                 style={{
//                   alignSelf: message.userId === currentUser._id ? 'flex-end' : 'flex-start',
//                   textAlign: message.userId === currentUser._id ? 'right' : 'left',
//                 }}
//                 key={message._id}
//               >
//                 <p>{message.text}</p>
//                 <span>{format(message.createdAt)}</span>
//               </div>
//             ))}
//             <div ref={messageEndRef}></div>
//           </div>

//           <form className='msg-form' onSubmit={handleSubmit}>
//             <input
//               type='text'
//               placeholder='Your message'
//               name='text'
//             />
//             <button className='send-btn'>
//               Send
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Message;





import React, { useState, useEffect, useRef } from 'react';
import { FaEnvelope, FaTimes } from 'react-icons/fa';
import './message.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/UsersSlice'; // Assuming you have a UsersSlice for managing user data
import apiRequest from '../../utils/apiRequest';

const Message = ({ chats }) => {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState(null);
  const currentUser = useSelector(selectUser) || null; // Get the current user from the store
  const messageEndRef = useRef();

  // Filter chats based on the logged-in user's ID
  const filteredChats = chats.filter(chat => 
    currentUser.role === 'admin' 
      ? chat.receiverId === currentUser._id 
      : chat.userId === currentUser._id
  );

  // Fetch chat data based on the current user
  const handleOpenChat = async (chatId, receiver) => {
    try {
      const res = await apiRequest.get(`/chats/${chatId}`); // Get the chat by ID
      setChat({ ...res.data, receiver });
      setOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const text = form.text.value;

    if (!text) return; // Prevent sending empty messages

    try {
      const res = await apiRequest.post("/messages/" + chat._id, { text });
      setChat(prev => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.text.value = "";
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    if (chat) {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]);

  const toggleMessageBox = () => {
    setOpen(!open);
  };

  // Format message timestamps
  const format = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className='message-container'>
      <div className='message-header'>
        {currentUser.role === 'admin' ? (
          // Render chat buttons for admin
          filteredChats.map((chat) => (
            <button
              className={`message-btn ${open ? 'disabled' : ''}`}
              key={chat._id}
              onClick={() => handleOpenChat(chat._id, chat.receiver)}
              disabled={open}
            >
              <span className='fa-envelope'><FaEnvelope /></span>
              <span>Send Message to {chat.receiver?.username}</span>
            </button>
          ))
        ) : (
          // Render a single button for the user
          filteredChats.length > 0 && (
            <button
              className={`message-btn ${open ? 'disabled' : ''}`}
              onClick={() => handleOpenChat(filteredChats[0]._id, filteredChats[0].receiver)} // Open first chat for the user
              disabled={open}
            >
              <span className='fa-envelope'><FaEnvelope /></span>
              <span>Send Message</span>
            </button>
          )
        )}
        {/* Display a message if no chats are available */}
        {filteredChats.length === 0 && <p>No chats available</p>}
      </div>

      {open && chat && (
        <div className='message-box'>
          <div className='close-btn' onClick={toggleMessageBox}>
            <p>{chat.receiver?.username}</p>
            <FaTimes className='fa-times' />
          </div>

          <div className='chat-list'>
            <p>Please enter your message and we will get back to you as soon as possible.</p>
            {chat.messages?.map((message) => (
              <div
                className="chatMessage"
                style={{
                  alignSelf: message.userId === currentUser._id ? 'flex-end' : 'flex-start',
                  textAlign: message.userId === currentUser._id ? 'right' : 'left',
                }}
                key={message._id}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>

          <form className='msg-form' onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Your message'
              name='text'
            />
            <button className='send-btn'>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Message;


