import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const BlogPost = () => {
  const { blog_id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = 'http://localhost:8000';

  const fetchBlog = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/blogs/${blog_id}`);
      setBlog(response.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
      toast.error("Failed to fetch blog post. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [blog_id]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-2xl text-gray-600">Blog post not found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <article className="bg-white rounded-lg shadow-lg p-6">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <div className="flex items-center justify-between text-gray-600">
            <div className="space-y-1">
              <p className="font-medium">By {blog.author}</p>
              <p>{new Date(blog.date).toLocaleDateString('en-US', { 
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}</p>
            </div>
            <div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                {blog.category}
              </span>
            </div>
          </div>
        </header>

        {blog.featuredImage && (
          <div className="mb-8">
            <img 
              src={blog.featuredImage} 
              alt={blog.title}
              className="w-full max-h-[40vh] object-contain rounded-lg"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            children={blog.content}
            components={{
              h1: ({node, children, ...props}) => (
                <div className="mt-12 mb-8 pb-4 border-b-2 border-gray-200">
                  <h1 {...props} className="text-4xl font-bold text-gray-900">{children}</h1>
                </div>
              ),
              h2: ({node, children, ...props}) => (
                <div className="mt-10 mb-6">
                  <h2 {...props} className="text-3xl font-bold text-gray-800">{children}</h2>
                </div>
              ),
              h3: ({node, children, ...props}) => (
                <div className="mt-8 mb-4">
                  <h3 {...props} className="text-2xl font-semibold text-gray-800">{children}</h3>
                </div>
              ),
              
              p: ({node, ...props}) => <p {...props} className="text-gray-800 leading-relaxed mb-4" />,
              
              ul: ({node, ...props}) => <ul {...props} className="pl-6 mb-6 space-y-3" />,
              ol: ({node, ...props}) => <ol {...props} className="pl-6 mb-6 space-y-3" />,
              li: ({node, children, ...props}) => (
                <li {...props} className="relative pl-2">
                  <span className="absolute left-[-1.25rem] top-2 w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                  {children}
                </li>
              ),
              
              blockquote: ({node, ...props}) => (
                <blockquote {...props} className="border-l-4 border-blue-500 pl-4 italic my-4" />
              ),
              
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <div className="my-6">
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, '')}
                      style={dracula}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-lg"
                      {...props}
                    />
                  </div>
                ) : (
                  <code className="bg-gray-100 rounded px-2 py-1 text-sm" {...props}>
                    {children}
                  </code>
                );
              },

              hr: ({node, ...props}) => <hr {...props} className="my-8 border-t-2 border-gray-200" />,
            }}
          />
        </div>

        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {blog.resources && blog.resources.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Resources</h3>
            <ul className="space-y-2">
              {blog.resources.map((resource, index) => (
                <li key={index} className="text-blue-600 hover:text-blue-800">
                  <a 
                    href={resource} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <span className="underline">{resource}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <footer className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-gray-600">
            <p className="flex items-center">
              <span className="font-medium">Reading time:</span>
              <span className="ml-2">{blog.readingTime} minutes</span>
            </p>
            <p className="flex items-center">
              <span className="font-medium">Grade Level:</span>
              <span className="ml-2">{blog.gradeLevel}</span>
            </p>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default BlogPost;