import React, { useState, useEffect } from 'react';
import apiRequest from '../../utils/apiRequest';
import { FaPlus, FaTrash, FaFileAlt } from 'react-icons/fa';

const ReportManager = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newReport, setNewReport] = useState({
        title: '',
        content: '',
        type: 'General',
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const res = await apiRequest.get('/reports');
            setReports(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this report?')) {
            try {
                await apiRequest.delete(`/reports/${id}`);
                setReports(reports.filter(r => r.id !== id));
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await apiRequest.post('/reports', newReport);
            setReports([res.data, ...reports]);
            setShowForm(false);
            setNewReport({ title: '', content: '', type: 'General', date: new Date().toISOString().split('T')[0] });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Reports & Meetings</h1>
                <button onClick={() => setShowForm(!showForm)} className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                    <FaPlus className="mr-2" /> New Report
                </button>
            </div>

            {showForm && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Report Title"
                                value={newReport.title}
                                onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                            <select
                                value={newReport.type}
                                onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="General">General</option>
                                <option value="Meeting">Meeting Minutes</option>
                                <option value="Activity">Activity Report</option>
                                <option value="Financial">Financial</option>
                            </select>
                        </div>
                        <textarea
                            placeholder="Report Content..."
                            value={newReport.content}
                            onChange={(e) => setNewReport({ ...newReport, content: e.target.value })}
                            rows="4"
                            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        ></textarea>
                        <div className="flex justify-end space-x-2">
                            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Save Report</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report) => (
                    <div key={report.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                                <FaFileAlt className="text-xl" />
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(report.date).toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{report.title}</h3>
                        <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 mb-3 uppercase tracking-wide">{report.type}</span>
                        <p className="text-gray-600 dark:text-gray-300 text-sm flex-1 line-clamp-3">{report.content}</p>
                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">Read More</button>
                            <button onClick={() => handleDelete(report.id)} className="text-red-500 hover:text-red-700">
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReportManager;
