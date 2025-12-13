import React, { useState, useEffect } from 'react';
import apiRequest from '../../utils/apiRequest';
import { FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProgrammePage = () => {
    const [programme, setProgramme] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProgramme = async () => {
            try {
                const res = await apiRequest.get('/programme/settings');
                setProgramme(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchProgramme();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    if (!programme || !programme.isActive) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Registration Closed</h1>
                <p className="text-gray-600 dark:text-gray-300 text-center max-w-md">
                    The Summer Youth Programme is currently not accepting new registrations. Please check back later or contact us for more information.
                </p>
                <Link to="/" className="mt-8 btn-primary">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-primary-600 p-8 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{programme.title}</h1>
                        <p className="text-primary-100 text-lg">Join us for an unforgettable summer experience!</p>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <FaCalendarAlt className="text-primary-600 dark:text-primary-400 text-xl mt-1 mr-3" />
                                    <div>
                                        <h3 className="font-bold text-gray-800 dark:text-white">Dates</h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {new Date(programme.startDate).toLocaleDateString()} - {new Date(programme.endDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <FaClock className="text-primary-600 dark:text-primary-400 text-xl mt-1 mr-3" />
                                    <div>
                                        <h3 className="font-bold text-gray-800 dark:text-white">Registration Deadline</h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {new Date(programme.registrationDeadline).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <FaMapMarkerAlt className="text-primary-600 dark:text-primary-400 text-xl mt-1 mr-3" />
                                    <div>
                                        <h3 className="font-bold text-gray-800 dark:text-white">Location</h3>
                                        <p className="text-gray-600 dark:text-gray-300">{programme.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <FaMoneyBillWave className="text-primary-600 dark:text-primary-400 text-xl mt-1 mr-3" />
                                    <div>
                                        <h3 className="font-bold text-gray-800 dark:text-white">Fee</h3>
                                        <p className="text-gray-600 dark:text-gray-300">{programme.fee}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="prose dark:prose-invert max-w-none mb-8">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">About the Programme</h3>
                            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{programme.description}</p>
                        </div>

                        <div className="text-center">
                            <Link to="/register" className="inline-block w-full sm:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-lg">
                                Register Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgrammePage;
