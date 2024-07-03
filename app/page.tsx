"use client";

import React, { useEffect, useState } from 'react';
import NewsArticle from '../src/components/NewsArticle';
import { fetchTopHeadlines } from '../services/newsService';

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadArticles = async () => {
      const fetchedArticles = await fetchTopHeadlines(); // You can also use fetchEverything('query') here
      setArticles(fetchedArticles);
      setLoading(false);
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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Top News Headlines</h1>
      <div className="space-y-4">
        {articles.map((article, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default HomePage;
