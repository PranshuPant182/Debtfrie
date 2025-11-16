import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Plus, Edit, Trash2, Eye, Image, X, Save, List, MessageSquare, FileText, Star, User, Calendar, Search, Filter, MoreVertical, Settings } from 'lucide-react';

const AdminPanel = () => {
  const [activeModule, setActiveModule] = useState('blogs');
  const [activeTab, setActiveTab] = useState('view');
  const [blogs, setBlogs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [pagination, setPagination] = useState({});

  const [blogFormData, setBlogFormData] = useState({
    author: '',
    disclaimer: '',
    title: '',
    sections: [
      {
        id: Date.now(), // Add unique ID
        type: 'paragraph',
        title: '',
        text: '',
        items: [],
        subitems: []
      }
    ]
  });

  const [testimonialFormData, setTestimonialFormData] = useState({
    name: '',
    image: '',
    rating: 5,
    text: ''
  });

  // API Configuration
  const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/blogs`;
  const TESTIMONIAL_API_BASE = `${import.meta.env.VITE_API_BASE_URL}/testimonials`;

  // Convert file to base64
  const fileToBase64 = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }, []);

  // Fetch blogs function
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseJson = await response.json();

      let safeBlogs = [];

      if (Array.isArray(responseJson)) {
        safeBlogs = responseJson;
      } else if (Array.isArray(responseJson.data)) {
        safeBlogs = responseJson.data;
      } else if (Array.isArray(responseJson.items)) {
        safeBlogs = responseJson.items;
      }

      setBlogs(safeBlogs);

    } catch (error) {
      console.error('Error fetching blogs:', error);
      showMessage('Error fetching blogs: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [API_BASE]);

  // Fetch testimonials from API
  const fetchTestimonials = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const response = await fetch(`${TESTIMONIAL_API_BASE}?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log("TESTIMONIALS API DATA:", data);
      console.log("TYPE OF data.data:", typeof data.data);

      if (data.success) {
        setTestimonials(Array.isArray(data.data) ? data.data : data.data.items || []);
        setPagination(data.pagination);
      } else {
        throw new Error(data.message || 'Failed to fetch testimonials');
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      showMessage('Error fetching testimonials: ' + error.message, 'error');
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  }, [TESTIMONIAL_API_BASE]);

  useEffect(() => {
    if (activeModule === 'blogs') {
      fetchBlogs();
    } else {
      fetchTestimonials();
    }
  }, [activeModule, fetchBlogs, fetchTestimonials]);

  const showMessage = useCallback((text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(''), 3000);
  }, []);

  const handleImageUpload = useCallback(async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        showMessage('Image size must be less than 5MB', 'error');
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        showMessage('Invalid image format. Only JPEG, PNG, GIF, and WebP are allowed.', 'error');
        return;
      }

      try {
        setSelectedImage(file);
        const base64 = await fileToBase64(file);
        setImagePreview(base64);

        // Update form data for testimonials
        if (activeModule === 'testimonials') {
          setTestimonialFormData(prev => ({
            ...prev,
            image: base64
          }));
        }
      } catch (error) {
        console.error('Error converting file to base64:', error);
        showMessage('Error processing image', 'error');
      }
    }
  }, [activeModule, fileToBase64, showMessage]);

  // Memoized input handlers to prevent re-renders
  const handleBlogInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setBlogFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleTestimonialInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setTestimonialFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const handleSectionChange = useCallback((sectionId, field, value) => {
    setBlogFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, [field]: value }
          : section
      )
    }));
  }, []);

  const addSection = useCallback(() => {
    setBlogFormData(prev => ({
      ...prev,
      sections: [...prev.sections, {
        id: Date.now() + Math.random(), // Unique ID
        type: 'paragraph',
        title: '',
        text: '',
        items: [],
        subitems: []
      }]
    }));
  }, []);

  const removeSection = useCallback((sectionId) => {
    setBlogFormData(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId)
    }));
  }, []);

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let base64Image = null;

      if (selectedImage) {
        base64Image = await fileToBase64(selectedImage);
      }

      const sectionsToSend = blogFormData.sections.map(({ id, ...rest }) => rest);

      const body = {
        author: blogFormData.author,
        title: blogFormData.title,
        disclaimer: blogFormData.disclaimer,
        sections: sectionsToSend,
        image: base64Image
      };

      const url = editingItem ? `${API_BASE}/${editingItem._id}` : API_BASE;
      const method = editingItem ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      await fetchBlogs();
      resetBlogForm();
      setShowCreateModal(false);
      setEditingItem(null);
      showMessage(`Blog ${editingItem ? 'updated' : 'created'} successfully!`);
    } catch (err) {
      console.error("Error saving blog:", err);
      showMessage("Error saving blog: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };


  const handleTestimonialSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!testimonialFormData.name || !testimonialFormData.rating || !testimonialFormData.text) {
        throw new Error('Name, rating, and text are required fields');
      }

      // Ensure image is included
      if (!testimonialFormData.image && !imagePreview) {
        throw new Error('Image is required');
      }

      const submitData = {
        ...testimonialFormData,
        image: testimonialFormData.image || imagePreview,
        rating: parseFloat(testimonialFormData.rating)
      };

      const url = editingItem ? `${TESTIMONIAL_API_BASE}/${editingItem._id}` : TESTIMONIAL_API_BASE;
      const method = editingItem ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        await fetchTestimonials();
        resetTestimonialForm();
        setShowCreateModal(false);
        setEditingItem(null);
        showMessage(result.message || `Testimonial ${editingItem ? 'updated' : 'created'} successfully!`);
      } else {
        throw new Error(result.message || 'Failed to save testimonial');
      }
    } catch (error) {
      console.error('Error saving testimonial:', error);
      showMessage('Error saving testimonial: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [testimonialFormData, imagePreview, editingItem, TESTIMONIAL_API_BASE, fetchTestimonials, showMessage]);

  const deleteBlog = useCallback(async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const response = await fetch(`${API_BASE}/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        setBlogs(prev => prev.filter(blog => blog._id !== id));
        showMessage('Blog deleted successfully!');
      } catch (error) {
        console.error('Error deleting blog:', error);
        showMessage('Error deleting blog: ' + error.message, 'error');
      }
    }
  }, [API_BASE, showMessage]);

  const deleteTestimonial = useCallback(async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const response = await fetch(`${TESTIMONIAL_API_BASE}/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          setTestimonials(prev => prev.filter(testimonial => testimonial._id !== id));
          showMessage(result.message || 'Testimonial deleted successfully!');
        } else {
          throw new Error(result.message || 'Failed to delete testimonial');
        }
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        showMessage('Error deleting testimonial: ' + error.message, 'error');
      }
    }
  }, [TESTIMONIAL_API_BASE, showMessage]);

  const editItem = useCallback((item) => {
    setEditingItem(item);

    if (activeModule === 'blogs') {
      setBlogFormData({
        author: item.author || '',
        disclaimer: item.disclaimer || '',
        title: item.title || '',
        sections: (item.sections || []).map((section, index) => ({
          ...section,
          id: section.id || Date.now() + index // Ensure ID exists
        }))
      });
      if (item.imageUrl) {
        setImagePreview(item.imageUrl);
      }
    } else {
      setTestimonialFormData({
        name: item.name || '',
        image: item.image || '',
        rating: item.rating || 5,
        text: item.text || ''
      });
      if (item.image) {
        setImagePreview(item.image);
      }
    }

    setShowCreateModal(true);
  }, [activeModule]);

  const resetBlogForm = useCallback(() => {
    setBlogFormData({
      author: '',
      disclaimer: '',
      title: '',
      sections: [
        {
          id: Date.now(),
          type: 'paragraph',
          title: '',
          text: '',
          items: [],
          subitems: []
        }
      ]
    });
    setSelectedImage(null);
    setImagePreview('');
  }, []);

  const resetTestimonialForm = useCallback(() => {
    setTestimonialFormData({
      name: '',
      image: '',
      rating: 5,
      text: ''
    });
    setSelectedImage(null);
    setImagePreview('');
  }, []);

  const resetForm = useCallback(() => {
    if (activeModule === 'blogs') {
      resetBlogForm();
    } else {
      resetTestimonialForm();
    }
    setEditingItem(null);
  }, [activeModule, resetBlogForm, resetTestimonialForm]);

  // Memoized components to prevent unnecessary re-renders
  const Sidebar = useMemo(() => (
    <div className="w-64 bg-slate-800 text-white min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">DF</span>
          </div>
          <span className="text-xl font-semibold">Debt Frrie</span>
        </div>
      </div>

      <nav className="px-4 space-y-2">
        <div className="text-xs uppercase text-slate-400 px-3 py-2 font-semibold tracking-wider">
          General
        </div>

        <button
          onClick={() => {
            setActiveModule('blogs');
            setActiveTab('view');
          }}
          className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeModule === 'blogs'
            ? 'bg-slate-700 text-white border-r-2 border-emerald-500'
            : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
        >
          <FileText className="w-4 h-4 mr-3" />
          Blogs
        </button>

        <button
          onClick={() => {
            setActiveModule('testimonials');
            setActiveTab('view');
          }}
          className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeModule === 'testimonials'
            ? 'bg-slate-700 text-white border-r-2 border-emerald-500'
            : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
        >
          <MessageSquare className="w-4 h-4 mr-3" />
          Testimonials
        </button>
      </nav>
    </div>
  ), [activeModule]);

  const Header = useMemo(() => (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 capitalize">
            {activeModule}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your {activeModule} content
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-64"
            />
          </div>

          <button
            onClick={() => {
              resetForm();
              setShowCreateModal(true);
            }}
            className="flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New {activeModule.slice(0, -1)}
          </button>

          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-emerald-600" />
          </div>
        </div>
      </div>
    </div>
  ), [activeModule, searchTerm, resetForm]);

  const DataTable = useMemo(() => {
    const currentData = activeModule === 'blogs' ? blogs : testimonials;
    const filteredData = currentData?.filter(item => {
      const searchValue = searchTerm?.toLowerCase();
      if (activeModule === 'blogs') {
        return item.title?.toLowerCase().includes(searchValue) ||
          item.author?.toLowerCase().includes(searchValue);
      } else {
        return item.name?.toLowerCase().includes(searchValue) ||
          item.text?.toLowerCase().includes(searchValue);
      }
    });

    if (loading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
        </div>
      );
    }

    return (
      <div className="bg-white">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              All {activeModule === 'blogs' ? 'Blog' : 'Testimonial'} Items
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {filteredData.length} {filteredData.length === 1 ? 'item' : 'items'}
              </span>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            List of all {activeModule} with relevant information
          </p>
        </div>

        {filteredData.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {activeModule === 'blogs' ? (
                <FileText className="w-8 h-8 text-gray-400" />
              ) : (
                <MessageSquare className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <p className="text-gray-500 text-lg font-medium">No {activeModule} found</p>
            <p className="text-gray-400">Create your first {activeModule.slice(0, -1)} to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {activeModule === 'blogs' ? 'Title' : 'Name'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {activeModule === 'blogs' ? 'Author' : 'Content'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {activeModule === 'blogs' ? 'Created' : 'Rating'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {activeModule === 'blogs' ? 'Sections' : 'Created'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item, index) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {(item.imageUrl || item.image) && (
                          <img
                            src={item.imageUrl || item.image}
                            alt=""
                            className={`w-8 h-8 mr-3 object-cover ${activeModule === 'testimonials' ? 'rounded-full' : 'rounded'
                              }`}
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {activeModule === 'blogs' ? item.title : item.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activeModule === 'blogs' ? (
                        item.author
                      ) : (
                        <div className="max-w-xs truncate">
                          {item.text}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activeModule === 'blogs' ? (
                        new Date(item.createdAt).toLocaleDateString()
                      ) : (
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                            />
                          ))}
                          <span className="ml-1 text-xs text-gray-500">({item.rating})</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activeModule === 'blogs' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {item.sections?.length || 0} sections
                        </span>
                      ) : (
                        new Date(item.createdAt).toLocaleDateString()
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => alert('View functionality')}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => editItem(item)}
                          className="p-1.5 text-gray-600 hover:bg-gray-50 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => activeModule === 'blogs' ? deleteBlog(item._id) : deleteTestimonial(item._id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }, [activeModule, blogs, testimonials, searchTerm, loading, editItem, deleteBlog, deleteTestimonial]);

  const CreateModal = useMemo(() => {
    if (!showCreateModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingItem ? 'Edit' : 'Create New'} {activeModule === 'blogs' ? 'Blog' : 'Testimonial'}
            </h2>
            <button
              onClick={() => {
                setShowCreateModal(false);
                resetForm();
              }}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {activeModule === 'blogs' ? (
              <form onSubmit={handleBlogSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author *
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={blogFormData.author}
                      onChange={handleBlogInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter author name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={blogFormData.title}
                      onChange={handleBlogInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter blog title"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Disclaimer
                  </label>
                  <textarea
                    name="disclaimer"
                    value={blogFormData.disclaimer}
                    onChange={handleBlogInputChange}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter disclaimer (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blog Image
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg cursor-pointer hover:bg-emerald-100 transition-colors">
                      <Image className="w-4 h-4 mr-2 text-emerald-600" />
                      <span className="text-emerald-600 text-sm font-medium">Choose Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    {imagePreview && (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedImage(null);
                            setImagePreview('');
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Blog Sections
                    </label>
                    <button
                      type="button"
                      onClick={addSection}
                      className="flex items-center px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 hover:bg-emerald-100 transition-colors"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Section
                    </button>
                  </div>

                  {blogFormData.sections.map((section) => (
                    <div key={section.id} className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <select
                          value={section.type}
                          onChange={(e) => handleSectionChange(section.id, 'type', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                        >
                          <option value="paragraph">Paragraph</option>
                          <option value="heading">Heading</option>
                          <option value="list">List</option>
                          <option value="steps">Steps</option>
                        </select>
                        {blogFormData.sections.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSection(section.id)}
                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {section.type === 'heading' && (
                        <input
                          type="text"
                          value={section.title || ''}
                          onChange={(e) => handleSectionChange(section.id, 'title', e.target.value)}
                          placeholder="Heading text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent mb-3 bg-white"
                        />
                      )}

                      {(section.type === 'paragraph' || section.type === 'heading') && (
                        <textarea
                          value={section.text || ''}
                          onChange={(e) => handleSectionChange(section.id, 'text', e.target.value)}
                          placeholder="Enter content..."
                          rows="4"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                        />
                      )}

                      {(section.type === 'list' || section.type === 'steps') && (
                        <div>
                          <input
                            type="text"
                            value={section.title || ''}
                            onChange={(e) => handleSectionChange(section.id, 'title', e.target.value)}
                            placeholder="List/Steps title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent mb-3 bg-white"
                          />
                          <textarea
                            value={section.items?.join('\n') || ''}
                            onChange={(e) => handleSectionChange(section.id, 'items', e.target.value.split('\n').filter(item => item.trim()))}
                            placeholder="Enter items (one per line)"
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end space-x-4 pt-6 mt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      resetForm();
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 font-medium"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        {editingItem ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        {editingItem ? 'Update' : 'Create'} Blog
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleTestimonialSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={testimonialFormData.name}
                      onChange={handleTestimonialInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter customer name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating *
                    </label>
                    <select
                      name="rating"
                      value={testimonialFormData.rating}
                      onChange={handleTestimonialInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value={5}>5 Stars - Excellent</option>
                      <option value={4}>4 Stars - Very Good</option>
                      <option value={3}>3 Stars - Good</option>
                      <option value={2}>2 Stars - Fair</option>
                      <option value={1}>1 Star - Poor</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Testimonial Content *
                  </label>
                  <textarea
                    name="text"
                    value={testimonialFormData.text}
                    onChange={handleTestimonialInputChange}
                    required
                    rows="4"
                    maxLength="1000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter the testimonial content... (max 1000 characters)"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {testimonialFormData.text.length}/1000 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Photo *
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg cursor-pointer hover:bg-emerald-100 transition-colors">
                      <Image className="w-4 h-4 mr-2 text-emerald-600" />
                      <span className="text-emerald-600 text-sm font-medium">Choose Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    {imagePreview && (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-16 h-16 object-cover rounded-full border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedImage(null);
                            setImagePreview('');
                            setTestimonialFormData(prev => ({ ...prev, image: '' }));
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Upload an image (max 5MB). Supported formats: JPEG, PNG, GIF, WebP
                  </p>
                </div>

                <div className="flex justify-end space-x-4 pt-6 mt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      resetForm();
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 font-medium"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        {editingItem ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        {editingItem ? 'Update' : 'Create'} Testimonial
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }, [showCreateModal, editingItem, activeModule, blogFormData, testimonialFormData, imagePreview, loading, handleBlogSubmit, handleTestimonialSubmit, handleBlogInputChange, handleTestimonialInputChange, handleSectionChange, addSection, removeSection, handleImageUpload, resetForm]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {Sidebar}

      <div className="flex-1">
        {Header}

        {message && (
          <div className={`mx-6 mt-4 px-4 py-3 rounded-lg border-l-4 ${message.type === 'error'
            ? 'bg-red-50 border-red-400 text-red-700'
            : 'bg-green-50 border-green-400 text-green-700'
            }`}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {message.type === 'error' ? (
                  <X className="h-5 w-5" />
                ) : (
                  <div className="h-5 w-5 bg-green-400 rounded-full flex items-center justify-center">
                    <div className="h-2 w-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{message.text}</p>
              </div>
            </div>
          </div>
        )}

        <div className="p-6">
          {DataTable}
        </div>
      </div>

      {CreateModal}
    </div>
  );
};

export default AdminPanel;