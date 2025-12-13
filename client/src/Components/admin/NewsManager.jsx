import React, { useState, useEffect } from 'react';
import apiRequest from '../../utils/apiRequest';
import { FaPlus, FaTrash, FaEdit, FaImage } from 'react-icons/fa';
import Editor from '../Editor';
import { useSelector } from 'react-redux';

const NewsManager = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        date: new Date().toISOString().split('T')[0],
        place: '',
        target: '',
        images: []
    });
    const [message, setMessage] = useState('');
    const currentUser = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const res = await apiRequest.get('/news');
            setNews(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this news item?')) {
            try {
                await apiRequest.delete(`/news/${id}`);
                setNews(news.filter(item => item.id !== id));
            } catch (error) {
                console.error(error);
                alert('Failed to delete news');
            }
        }
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, images: e.target.files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser || currentUser.role !== 'admin') {
            setMessage('Unauthorized');
            return;
        }

        const data = new FormData();
        data.append('title', formData.title);
        data.append('body', formData.body);
        data.append('date', formData.date);
        data.append('place', formData.place);
        data.append('target', formData.target);

        if (formData.images) {
            for (let i = 0; i < formData.images.length; i++) {
                data.append('images', formData.images[i]);
            }
        }

        try {
            const res = await apiRequest.post('/news', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setNews([res.data, ...news]);
            setShowForm(false);
            setFormData({
                title: '',
                body: '',
                date: new Date().toISOString().split('T')[0],
                place: '',
                target: '',
                images: []
            });
            setMessage('News added successfully');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error(error);
            setMessage('Failed to add news');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">News Management</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                    <FaPlus className="mr-2" /> Add News
                </button>
            </div>

            {message && (
                <div className={`p-4 mb-4 rounded-lg ${message.includes('Failed') || message.includes('Unauthorized') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {message}
                </div>
            )}

            {showForm && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Create News Article</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Place/Location"
                                value={formData.place}
                                onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            <input
                                type="text"
                                placeholder="Target Audience"
                                value={formData.target}
                                onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Images</label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>

                        <div className="bg-white text-black rounded-lg overflow-hidden">
                            <Editor value={formData.body} onChange={(val) => setFormData({ ...formData, body: val })} />
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Publish News</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item) => (
                    <div key={item.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col">
                        <div className="h-48 overflow-hidden bg-gray-200 dark:bg-gray-700 relative">
                            {item.images && item.images.length > 0 ? (
                                <img
                                    src={`http://localhost:8800/${item.images[0]}`}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    <FaImage className="text-4xl" />
                                </div>
                            )}
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(item.date).toLocaleDateString()}</span>
                                <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">{item.place}</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">{item.title}</h3>
                            <div className="mt-auto flex justify-end pt-4">
                                <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 p-2">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsManager;
