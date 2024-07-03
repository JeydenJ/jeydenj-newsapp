"use client";

import React, { useEffect, useState } from 'react';
import NewsArticle from '../src/NewsArticle';
import { fetchTopHeadlines } from '../services/newsService';

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const fetchedArticles = await fetchTopHeadlines();
        console.log('Articles loaded in useEffect:', fetchedArticles); // Log to verify data
        setArticles(fetchedArticles);
      } catch (error) {
        console.error('Error loading articles:', error);
      } finally {
        setLoading(false);
      }
    };
  
    loadArticles();
  }, []);

  const handleTitleChange = (index: number, newTitle: string) => {
    setArticles(prevArticles => {
      const updatedArticles = [...prevArticles];
      updatedArticles[index].title = newTitle;
      return updatedArticles;
    });
  };

  const handleAuthorChange = (index: number, newAuthor: string) => {
    setArticles(prevArticles => {
      const updatedArticles = [...prevArticles];
      updatedArticles[index].author = newAuthor;
      return updatedArticles;
    });
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (article.description && article.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Top News Headlines</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search articles..."
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
      />
      <div className="space-y-4">
        {filteredArticles.map((article, index) => {
          console.log('Rendering Article:', article); // Log each article before rendering
          return (
            <NewsArticle
              key={index} 
              title={article.title}
              author={article.author || 'Unknown'}
              publishedAt={article.publishedAt}
              description={article.description}
              source={article.source.name}
              url={article.url}
              onTitleChange={(newTitle) => handleTitleChange(index, newTitle)}
              onAuthorChange={(newAuthor) => handleAuthorChange(index, newAuthor)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
