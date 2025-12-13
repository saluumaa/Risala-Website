import React, { useState, useEffect } from 'react';
import apiRequest from '../../utils/apiRequest';
import { FaSave, FaPowerOff } from 'react-icons/fa';

const ProgrammeManager = () => {
    const [settings, setSettings] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        registrationDeadline: '',
        fee: '',
        location: '',
        activities: [],
        isActive: false
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await apiRequest.get('/programme/settings');
            setSettings(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleToggleActive = async () => {
        try {
            const res = await apiRequest.patch('/programme/toggle', { isActive: !settings.isActive });
            setSettings({ ...settings, isActive: res.data.isActive });
            setMessage(`Programme is now ${res.data.isActive ? 'Active' : 'Inactive'}`);
        } catch (error) {
            setMessage('Error toggling status');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiRequest.put('/programme/settings', settings);
            setMessage('Settings updated successfully');
        } catch (error) {
            setMessage('Error updating settings');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Programme Settings</h1>
                <button
                    onClick={handleToggleActive}
                    className={`flex items-center px-4 py-2 rounded-lg font-bold text-white transition-colors ${settings.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                >
                    <FaPowerOff className="mr-2" />
                    {settings.isActive ? 'Deactivate Programme' : 'Activate Programme'}
                </button>
            </div>

            {message && (
                <div className={`p-4 mb-4 rounded-lg ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Programme Title</label>
                        <input
                            type="text"
                            name="title"
                            value={settings.title}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={settings.location || ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={settings.startDate ? settings.startDate.split('T')[0] : ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={settings.endDate ? settings.endDate.split('T')[0] : ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Registration Deadline</label>
                        <input
                            type="date"
                            name="registrationDeadline"
                            value={settings.registrationDeadline ? settings.registrationDeadline.split('T')[0] : ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fee</label>
                        <input
                            type="text"
                            name="fee"
                            value={settings.fee || ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Activities (Comma separated)</label>
                        <textarea
                            name="activities"
                            value={Array.isArray(settings.activities) ? settings.activities.join(', ') : settings.activities || ''}
                            onChange={(e) => setSettings({ ...settings, activities: e.target.value.split(',').map(item => item.trim()) })}
                            rows="3"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="e.g. Football, Swimming, Quran Memorization"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Requirements (Comma separated)</label>
                        <textarea
                            name="requirements"
                            value={Array.isArray(settings.requirements) ? settings.requirements.join(', ') : settings.requirements || ''}
                            onChange={(e) => setSettings({ ...settings, requirements: e.target.value.split(',').map(item => item.trim()) })}
                            rows="3"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="e.g. Birth Certificate, Photo, Guardian Consent"
                        ></textarea>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={settings.description || ''}
                        onChange={handleChange}
                        rows="4"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                    ></textarea>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="flex items-center px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg transition-colors"
                    >
                        <FaSave className="mr-2" />
                        Save Settings
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProgrammeManager;
