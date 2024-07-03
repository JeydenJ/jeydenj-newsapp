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
    <div className="p-4 border border-gray-200 rounded-md shadow-md">
      <div className="mb-2">
        {isEditingTitle ? (
          <div className="flex flex-col">
            <input
              type="text"
              value={editedTitle}
              onChange={handleTitleChange}
              className="border border-gray-300 p-2 rounded-md w-full mb-2"
            />
            <button
              onClick={handleTitleSave}
              className="text-blue-500 hover:underline"
            >
              Save Title
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={() => setIsEditingTitle(true)}
              className="text-blue-500 hover:underline"
            >
              Edit Title
            </button>
          </div>
        )}
      </div>

      <div className="mb-2">
        {isEditingAuthor ? (
          <div className="flex flex-col">
            <input
              type="text"
              value={editedAuthor}
              onChange={handleAuthorChange}
              className="border border-gray-300 p-2 rounded-md w-full mb-2"
            />
            <button
              onClick={handleAuthorSave}
              className="text-blue-500 hover:underline"
            >
              Save Author
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p className="text-gray-600">By {author}</p>
            <button
              onClick={() => setIsEditingAuthor(true)}
              className="text-blue-500 hover:underline"
            >
              Edit Author
            </button>
          </div>
        )}
      </div>

      <p className="text-gray-500 mb-2">{new Date(publishedAt).toLocaleDateString()}</p>
      <p className="mb-2">{description}</p>
      <p className="text-blue-600 mb-2">Source: {source}</p>
      <a href={url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
        Read full article
      </a>
    </div>
  );
};

export default NewsArticle;
