import React from 'react';

const BlogSidebar = ({ categories, onSearch, onCategorySelect }) => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Blog Categories</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li 
              key={category}
              onClick={() => onCategorySelect(category)}
              className="cursor-pointer py-2 px-3 rounded hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Quick Search</h3>
        <input
          type="text"
          placeholder="Search blogs..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default BlogSidebar;