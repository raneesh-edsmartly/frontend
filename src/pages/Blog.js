import React, { useEffect, useState, useCallback } from 'react';
import BlogCard from '../components/BlogCard';
import BlogSidebar from '../components/BlogSidebar';
import Pagination from '../components/Pagination';
import axios from 'axios';
import { toast } from 'react-toastify';
import blogHeroImage from '../assets/blog/blog-hero.jpg'; // Import the image

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = 'http://localhost:8000';

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/blogs?skip=${(currentPage - 1) * 10}&limit=10`);
      setBlogs(response.data);
      setTotalPages(Math.ceil(response.data.length / 10));
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to fetch blogs. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blogs`);
      const uniqueCategories = [...new Set(response.data.map(blog => blog.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories. Please try again later.");
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, [fetchBlogs, fetchCategories]);

  const handleSearch = async (query) => {
    if (!query) {
      fetchBlogs();
      return;
    }
    try {
      const response = await axios.get(`${API_BASE_URL}/blogs/search?query=${query}`);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error searching blogs:", error);
      toast.error("Failed to search blogs. Please try again later.");
    }
  };

  const handleCategorySelect = async (category) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blogs/category/${category}`);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs by category:", error);
      toast.error("Failed to fetch blogs by category. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96">
        <img
          src={blogHeroImage}
          alt="Edsmartly Blogs"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Edsmartly Blogs
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Small Adds Up!
            </p>
          </div>
        </div>
      </div>

      {/* Featured Categories Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className="px-6 py-2 rounded-full bg-white shadow hover:shadow-md transition-shadow duration-200 text-gray-700 hover:text-blue-600"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-3/4">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                  ))}
                </div>
                {blogs.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-2xl text-gray-600">No blogs found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your search or category filters</p>
                  </div>
                )}
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={setCurrentPage} 
                />
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <BlogSidebar 
                categories={categories} 
                onSearch={handleSearch} 
                onCategorySelect={handleCategorySelect} 
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Blog;