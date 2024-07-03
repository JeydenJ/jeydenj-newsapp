import React, { useState } from 'react';

interface ArticleProps {
  title: string;
  author: string;
  publishedAt: string;
  description: string;
  source: string;
  url: string;
  onTitleChange: (newTitle: string) => void;
  onAuthorChange: (newAuthor: string) => void;
}

const NewsArticle: React.FC<ArticleProps> = ({
  title,
  author,
  publishedAt,
  description,
  source,
  url,
  onTitleChange,
  onAuthorChange
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [isEditingAuthor, setIsEditingAuthor] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(title);
  const [editedAuthor, setEditedAuthor] = useState<string>(author);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedAuthor(e.target.value);
  };

  const handleTitleSave = () => {
    onTitleChange(editedTitle);
    setIsEditingTitle(false);
  };

  const handleAuthorSave = () => {
    onAuthorChange(editedAuthor);
    setIsEditingAuthor(false);
  };

  return (
    <div className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white max-w-6xl mx-auto">
      <div className="flex flex-col mb-4">
        {isEditingTitle ? (
          <div className="flex flex-col">
            <input
              type="text"
              value={editedTitle}
              onChange={handleTitleChange}
              className="border border-gray-400 p-3 rounded-md mb-2 text-gray-700 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleTitleSave}
              className="self-start bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Save Title
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <button
              onClick={() => setIsEditingTitle(true)}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Edit Title
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col mb-4">
        {isEditingAuthor ? (
          <div className="flex flex-col">
            <input
              type="text"
              value={editedAuthor}
              onChange={handleAuthorChange}
              className="border border-gray-400 p-3 rounded-md mb-2 text-gray-700 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleAuthorSave}
              className="self-start bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Save Author
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">By {author}</p>
            <button
              onClick={() => setIsEditingAuthor(true)}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Edit Author
            </button>
          </div>
        )}
      </div>

      <p className="text-gray-500 mb-4">{new Date(publishedAt).toLocaleDateString()}</p>
      <p className="mb-4 text-gray-700">{description}</p>
      <p className="text-blue-600 mb-4">Source: {source}</p>
      <a href={url} className="text-blue-500 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
        Read full article
      </a>
    </div>
  );
};

export default NewsArticle;
