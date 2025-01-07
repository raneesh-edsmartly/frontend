import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={blog.featuredImage || '/assets/blog/placeholder.jpg'} 
        alt={blog.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
        <p className="text-gray-600 mb-2">
          {new Date(blog.date).toLocaleDateString()}
        </p>
        <p className="text-gray-500 mb-4">
          {blog.content.substring(0, 150)}...
        </p>
        <div className="flex justify-between items-center">
          <span className="text-blue-500">{blog.category}</span>
          <Link 
            to={`/blogs/${blog._id}`} 
            className="text-blue-500 hover:underline"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;