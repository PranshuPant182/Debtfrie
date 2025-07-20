import React, { useState, useEffect } from 'react';
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

  const [blogFormData, setBlogFormData] = useState({
    author: '',
    disclaimer: '',
    title: '',
    sections: [
      {
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
    position: '',
    company: '',
    rating: 5,
    content: '',
    featured: false
  });

  const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/blogs`;
  const TESTIMONIAL_API_BASE = `${import.meta.env.VITE_API_BASE_URL}/testimonials`;

  const fetchBlogs = async () => {
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

      const blogs = await response.json();
      setBlogs(blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      showMessage('Error fetching blogs: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const mockTestimonials = [
        {
          _id: '1',
          name: 'Sarah Johnson',
          position: 'Marketing Director',
          company: 'TechCorp Inc.',
          rating: 5,
          content: 'Outstanding service and exceptional results. The team exceeded our expectations.',
          featured: true,
          imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0iIzEwQjk4MSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+U0o8L3RleHQ+PC9zdmc+',
          createdAt: new Date().toISOString(),
          status: 'Active'
        },
        {
          _id: '2',
          name: 'Michael Chen',
          position: 'CEO',
          company: 'StartupXYZ',
          rating: 4,
          content: 'Great experience working with this team. Professional and reliable.',
          featured: false,
          imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0iIzM5OEJGQyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+TUM8L3RleHQ+PC9zdmc+',
          createdAt: new Date().toISOString(),
          status: 'Active'
        }
      ];
      setTestimonials(mockTestimonials);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      showMessage('Error fetching testimonials: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeModule === 'blogs') {
      fetchBlogs();
    } else {
      fetchTestimonials();
    }
  }, [activeModule]);

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(''), 3000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBlogInputChange = (e) => {
    const { name, value } = e.target;
    setBlogFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTestimonialInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTestimonialFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSectionChange = (index, field, value) => {
    const newSections = [...blogFormData.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setBlogFormData(prev => ({
      ...prev,
      sections: newSections
    }));
  };

  const addSection = () => {
    setBlogFormData(prev => ({
      ...prev,
      sections: [...prev.sections, {
        type: 'paragraph',
        title: '',
        text: '',
        items: [],
        subitems: []
      }]
    }));
  };

  const removeSection = (index) => {
    setBlogFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('author', blogFormData.author);
      formDataToSend.append('title', blogFormData.title);
      formDataToSend.append('disclaimer', blogFormData.disclaimer);
      formDataToSend.append('sections', JSON.stringify(blogFormData.sections));
      
      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      }
      
      const response = await fetch(API_BASE, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      await fetchBlogs();
      resetBlogForm();
      setShowCreateModal(false);
      showMessage('Blog created successfully!');
    } catch (error) {
      console.error('Error creating blog:', error);
      showMessage('Error creating blog: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newTestimonial = {
        _id: Date.now().toString(),
        ...testimonialFormData,
        imageUrl: imagePreview,
        createdAt: new Date().toISOString(),
        status: 'Active'
      };
      
      setTestimonials(prev => [newTestimonial, ...prev]);
      resetTestimonialForm();
      setShowCreateModal(false);
      showMessage('Testimonial created successfully!');
    } catch (error) {
      console.error('Error creating testimonial:', error);
      showMessage('Error creating testimonial: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
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
  };

  const deleteTestimonial = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        setTestimonials(prev => prev.filter(testimonial => testimonial._id !== id));
        showMessage('Testimonial deleted successfully!');
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        showMessage('Error deleting testimonial: ' + error.message, 'error');
      }
    }
  };

  const resetBlogForm = () => {
    setBlogFormData({
      author: '',
      disclaimer: '',
      title: '',
      sections: [
        {
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
  };

  const resetTestimonialForm = () => {
    setTestimonialFormData({
      name: '',
      position: '',
      company: '',
      rating: 5,
      content: '',
      featured: false
    });
    setSelectedImage(null);
    setImagePreview('');
  };

  const Sidebar = () => (
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
          className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeModule === 'blogs'
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
          className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeModule === 'testimonials'
              ? 'bg-slate-700 text-white border-r-2 border-emerald-500'
              : 'text-slate-300 hover:text-white hover:bg-slate-700'
          }`}
        >
          <MessageSquare className="w-4 h-4 mr-3" />
          Testimonials
        </button>
        
        {/* <button className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition-colors">
          <Settings className="w-4 h-4 mr-3" />
          Settings
        </button> */}
      </nav>
    </div>
  );

  const Header = () => (
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
            onClick={() => setShowCreateModal(true)}
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
  );

  const DataTable = () => {
    const currentData = activeModule === 'blogs' ? blogs : testimonials;
    const filteredData = currentData.filter(item => {
      const searchValue = searchTerm.toLowerCase();
      if (activeModule === 'blogs') {
        return item.title?.toLowerCase().includes(searchValue) || 
               item.author?.toLowerCase().includes(searchValue);
      } else {
        return item.name?.toLowerCase().includes(searchValue) || 
               item.company?.toLowerCase().includes(searchValue);
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
              All {activeModule === 'blogs' ? 'Blog' : 'Testimonial'} Members
            </h2>
            <div className="flex items-center space-x-2">
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
                    {activeModule === 'blogs' ? 'Author' : 'Position'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {activeModule === 'blogs' ? 'Created' : 'Company'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {activeModule === 'blogs' ? 'Sections' : 'Rating'}
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
                            className="w-8 h-8 rounded-full mr-3 object-cover"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {activeModule === 'blogs' ? item.title : item.name}
                          </div>
                          {activeModule === 'testimonials' && item.featured && (
                            <div className="text-xs text-purple-600 font-medium">Featured</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activeModule === 'blogs' ? item.author : item.position || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activeModule === 'blogs' 
                        ? new Date(item.createdAt).toLocaleDateString()
                        : item.company || 'N/A'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activeModule === 'blogs' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {item.sections?.length || 0} sections
                        </span>
                      ) : (
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-1 text-xs text-gray-500">({item.rating})</span>
                        </div>
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
                          onClick={() => alert('Edit functionality')}
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
  };

  const CreateModal = () => {
    if (!showCreateModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Create New {activeModule === 'blogs' ? 'Blog' : 'Testimonial'}
            </h2>
            <button
              onClick={() => setShowCreateModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {activeModule === 'blogs' ? (
              <div className="space-y-6">
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

                  {blogFormData.sections.map((section, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <select
                          value={section.type}
                          onChange={(e) => handleSectionChange(index, 'type', e.target.value)}
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
                            onClick={() => removeSection(index)}
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
                          onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                          placeholder="Heading text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent mb-3 bg-white"
                        />
                      )}

                      {(section.type === 'paragraph' || section.type === 'heading') && (
                        <textarea
                          value={section.text || ''}
                          onChange={(e) => handleSectionChange(index, 'text', e.target.value)}
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
                            onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                            placeholder="List/Steps title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent mb-3 bg-white"
                          />
                          <textarea
                            value={section.items?.join('\n') || ''}
                            onChange={(e) => handleSectionChange(index, 'items', e.target.value.split('\n').filter(item => item.trim()))}
                            placeholder="Enter items (one per line)"
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
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
                      Position
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={testimonialFormData.position}
                      onChange={handleTestimonialInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter position/title"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={testimonialFormData.company}
                      onChange={handleTestimonialInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter company name"
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
                    name="content"
                    value={testimonialFormData.content}
                    onChange={handleTestimonialInputChange}
                    required
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter the testimonial content..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Photo
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
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={testimonialFormData.featured}
                      onChange={handleTestimonialInputChange}
                      className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Featured Testimonial
                    </span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">Featured testimonials will be highlighted prominently</p>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4 pt-6 mt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={activeModule === 'blogs' ? handleBlogSubmit : handleTestimonialSubmit}
                disabled={loading}
                className="flex items-center px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 font-medium"
              >
                {loading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Create {activeModule === 'blogs' ? 'Blog' : 'Testimonial'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <Header />
        
        {message && (
          <div className={`mx-6 mt-4 px-4 py-3 rounded-lg border-l-4 ${
            message.type === 'error' 
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
          <DataTable />
        </div>
      </div>
      
      <CreateModal />
    </div>
  );
};

export default AdminPanel;