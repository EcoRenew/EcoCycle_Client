import React, { useState, useEffect } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import ConfirmDialog from './ConfirmDialog';

const ArticlesManagement = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  // Mock data for now - would be replaced with API calls
  useEffect(() => {
    setArticles([
      {
        article_id: 1,
        title: 'The Importance of Recycling in 2024',
        content: 'Recycling has become more crucial than ever...',
        author: 'Admin',
        status: 'published',
        featured_image: '/images/recycling-importance.jpg',
        created_at: '2024-01-15',
        updated_at: '2024-01-15',
      },
      {
        article_id: 2,
        title: 'How to Properly Sort Your Recyclables',
        content: 'Proper sorting is essential for effective recycling...',
        author: 'Admin',
        status: 'draft',
        featured_image: '/images/sorting-guide.jpg',
        created_at: '2024-01-12',
        updated_at: '2024-01-14',
      },
    ]);
  }, []);

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddArticle = () => {
    setSelectedArticle(null);
    setIsModalOpen(true);
  };

  const handleEditArticle = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleDeleteArticle = (article) => {
    setArticleToDelete(article);
    setIsConfirmDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      // API call would go here
      setArticles(articles.filter(a => a.article_id !== articleToDelete.article_id));
      setIsConfirmDialogOpen(false);
    } catch (error) {
      setError('Failed to delete article');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Articles</h2>
          <button
            onClick={handleAddArticle}
            className="btn bg-ecoGreen hover:bg-ecoGreen-dark text-white px-4 py-2 rounded-md flex items-center"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            <span>Add Article</span>
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ecoGreen"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Articles Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredArticles.map((article) => (
                <tr key={article.article_id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{article.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      article.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.created_at}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditArticle(article)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(article)}
                      className="text-red-600 hover:text-red-900 mr-3"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <EyeIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Article"
        message="Are you sure you want to delete this article? This action cannot be undone."
      />
    </div>
  );
};

export default ArticlesManagement;