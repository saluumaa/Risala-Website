import React, { useState } from 'react';
import { FaWhatsapp, FaPaperPlane } from 'react-icons/fa';

const WhatsAppSender = () => {
    const [message, setMessage] = useState('');
    const [groupName, setGroupName] = useState('');

    const handleSend = () => {
        if (!message) return;

        // Encode the message for URL
        const encodedMessage = encodeURIComponent(message);

        // Open WhatsApp Web with the pre-filled message
        // Note: Direct group messaging via URL isn't standard without phone numbers, 
        // so we'll open the general send window where they can select the group.
        // Alternatively, if they have a specific group link, we could use that, but this is safer.
        window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Team Communication</h1>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
                <div className="flex items-center mb-6 text-green-600 dark:text-green-500">
                    <FaWhatsapp className="text-4xl mr-3" />
                    <h2 className="text-xl font-bold">Send WhatsApp Message</h2>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Compose a message below and click send. This will open WhatsApp where you can select your team group to forward the message to.
                </p>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message Content</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows="6"
                            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Type your announcement here..."
                        ></textarea>
                    </div>

                    <button
                        onClick={handleSend}
                        disabled={!message}
                        className={`w-full flex items-center justify-center py-3 px-6 rounded-lg font-bold text-white transition-all ${message
                                ? 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                                : 'bg-gray-400 cursor-not-allowed'
                            }`}
                    >
                        <FaPaperPlane className="mr-2" />
                        Open in WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WhatsAppSender;
