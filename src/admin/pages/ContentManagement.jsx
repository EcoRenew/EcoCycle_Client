import React from 'react';
import ArticlesManagement from '../components/ArticlesManagement';
import MaterialsManagement from '../components/MaterialsManagement';
import CategoriesManagement from '../components/CategoriesManagement';

const ContentManagement = ({ type }) => {
  // Determine content type based on route parameter or prop
  const contentType = type || 'all';

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {contentType === 'articles' && <ArticlesManagement />}
      {contentType === 'categories' && <CategoriesManagement />}
      {contentType === 'materials' && <MaterialsManagement />}
      {contentType === 'all' && (
        <div className="grid grid-cols-1 gap-8">
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Content Management</h1>
          <p className="text-slate-500">
            Please select a specific content type from the navigation menu.
          </p>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;