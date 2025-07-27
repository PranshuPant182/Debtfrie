import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Edit, Calendar, Phone, Mail, MapPin, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
    const [submissions, setSubmissions] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    // Replace with your actual API base URL
    const API_BASE = `${import.meta.env.VITE_API_BASE_URL}`;

    // Fetch dashboard stats
    const fetchStats = async () => {
        try {
            const response = await fetch(`${API_BASE}/dashboard/stats`);
            const data = await response.json();
            if (data.success) {
                setStats(data.data);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    // Fetch submissions
    const fetchSubmissions = async (page = 1, status = 'all', search = '') => {
        try {
            setLoading(true);
            let url = `${API_BASE}/submissions?page=${page}&limit=10`;
            if (status !== 'all') url += `&status=${status}`;
            if (search) url += `&search=${search}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.success) {
                setSubmissions(data.data);
                setTotalPages(data.totalPages);
                setCurrentPage(data.currentPage);
            }
        } catch (error) {
            console.error('Error fetching submissions:', error);
        } finally {
            setLoading(false);
        }
    };

    // Update submission status
    const updateSubmissionStatus = async (id, newStatus, notes = '') => {
        try {
            const response = await fetch(`${API_BASE}/submissions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus, notes }),
            });

            if (response.ok) {
                fetchSubmissions(currentPage, statusFilter, searchTerm);
                fetchStats();
            }
        } catch (error) {
            console.error('Error updating submission:', error);
        }
    };

    // Fetch single submission details
    const fetchSubmissionDetails = async (id) => {
        try {
            const response = await fetch(`${API_BASE}/submissions/${id}`);
            const data = await response.json();
            if (data.success) {
                setSelectedSubmission(data.data);
            }
        } catch (error) {
            console.error('Error fetching submission details:', error);
        }
    };

    useEffect(() => {
        fetchStats();
        fetchSubmissions();
    }, []);

    useEffect(() => {
        fetchSubmissions(1, statusFilter, searchTerm);
    }, [statusFilter, searchTerm]);

    const getStatusColor = (status) => {
        const colors = {
            'new': 'bg-blue-100 text-blue-800',
            'contacted': 'bg-yellow-100 text-yellow-800',
            'in-progress': 'bg-purple-100 text-purple-800',
            'resolved': 'bg-green-100 text-green-800',
            'closed': 'bg-gray-100 text-gray-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (amount) => {
        return amount.replace(/₹|,/g, '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-[#02102f] text-white p-6">
                <h1 className="text-3xl font-bold">Debtfrie Admin Dashboard</h1>
                <p className="text-gray-300 mt-2">Manage form submissions and track customer interactions</p>
            </div>

            <div className="max-w-7xl mx-auto p-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-2xl font-bold text-[#02102f]">{stats.totalSubmissions || 0}</h3>
                        <p className="text-gray-600">Total Submissions</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-2xl font-bold text-blue-600">{stats.todaySubmissions || 0}</h3>
                        <p className="text-gray-600">Today's Submissions</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-2xl font-bold text-green-600">
                            {stats.statusBreakdown?.find(s => s._id === 'resolved')?.count || 0}
                        </h3>
                        <p className="text-gray-600">Resolved Cases</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-2xl font-bold text-yellow-600">
                            {stats.statusBreakdown?.find(s => s._id === 'new')?.count || 0}
                        </h3>
                        <p className="text-gray-600">New Cases</p>
                    </div>
                </div>

                {/* Controls */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, email, phone, or city..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02102f] focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <select
                                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02102f] focus:border-transparent"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="in-progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Submissions Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Customer Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Debt Information
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Submitted
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                            Loading submissions...
                                        </td>
                                    </tr>
                                ) : submissions.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                            No submissions found
                                        </td>
                                    </tr>
                                ) : (
                                    submissions.map((submission) => (
                                        <tr key={submission._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{submission.fullName}</div>
                                                    <div className="text-sm text-gray-500 flex items-center mt-1">
                                                        <Mail className="h-3 w-3 mr-1" />
                                                        {submission.email}
                                                    </div>
                                                    <div className="text-sm text-gray-500 flex items-center mt-1">
                                                        <Phone className="h-3 w-3 mr-1" />
                                                        {submission.phone}
                                                    </div>
                                                    <div className="text-sm text-gray-500 flex items-center mt-1">
                                                        <MapPin className="h-3 w-3 mr-1" />
                                                        {submission.city}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">
                                                    <div>Income: {submission.monthlyIncome}</div>
                                                    <div className="text-red-600">CC Dues: {submission.creditCardDues}</div>
                                                    <div className="text-orange-600">Loan Dues: {submission.loanDues}</div>
                                                    <div className="text-sm text-gray-500 mt-1">
                                                        EMI Bounce: {submission.emiBounce}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(submission.status)}`}>
                                                    {submission.status}
                                                </span>
                                                {submission.emailSent && (
                                                    <div className="text-xs text-green-600 mt-1">✓ Email sent</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                <div className="flex items-center">
                                                    <Calendar className="h-3 w-3 mr-1" />
                                                    {formatDate(submission.createdAt)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => fetchSubmissionDetails(submission._id)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </button>
                                                    <select
                                                        value={submission.status}
                                                        onChange={(e) => updateSubmissionStatus(submission._id, e.target.value)}
                                                        className="text-xs border border-gray-300 rounded px-2 py-1"
                                                    >
                                                        <option value="new">New</option>
                                                        <option value="contacted">Contacted</option>
                                                        <option value="in-progress">In Progress</option>
                                                        <option value="resolved">Resolved</option>
                                                        <option value="closed">Closed</option>
                                                    </select>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
                            <div className="flex-1 flex justify-between sm:hidden">
                                <button
                                    onClick={() => fetchSubmissions(currentPage - 1, statusFilter, searchTerm)}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => fetchSubmissions(currentPage + 1, statusFilter, searchTerm)}
                                    disabled={currentPage === totalPages}
                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Page <span className="font-medium">{currentPage}</span> of{' '}
                                        <span className="font-medium">{totalPages}</span>
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => fetchSubmissions(page, statusFilter, searchTerm)}
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === currentPage
                                                        ? 'z-10 bg-[#02102f] border-[#02102f] text-white'
                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Submission Details Modal */}
                {selectedSubmission && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                            <div className="mt-3">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">Submission Details</h3>
                                    <button
                                        onClick={() => setSelectedSubmission(null)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                            <p className="mt-1 text-sm text-gray-900">{selectedSubmission.fullName}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Email</label>
                                            <p className="mt-1 text-sm text-gray-900">{selectedSubmission.email}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                                            <p className="mt-1 text-sm text-gray-900">{selectedSubmission.phone}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">City</label>
                                            <p className="mt-1 text-sm text-gray-900">{selectedSubmission.city}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Monthly Income</label>
                                            <p className="mt-1 text-sm text-gray-900">{selectedSubmission.monthlyIncome}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Status</label>
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedSubmission.status)}`}>
                                                {selectedSubmission.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Additional Information</label>
                                        <p className="mt-1 text-sm text-gray-900">{selectedSubmission.additionalInfo || 'N/A'}</p>
                                    </div>

                                    {selectedSubmission.paymentInfo && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Payment Information</label>
                                            <pre className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">
                                                {JSON.stringify(selectedSubmission.paymentInfo, null, 2)}
                                            </pre>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Submission Date</label>
                                        <p className="mt-1 text-sm text-gray-900">{formatDate(selectedSubmission.createdAt)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
