import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY; // Make sure to set this in your .env file
const BASE_URL = 'https://newsapi.org/v2';

export const fetchTopHeadlines = async (country: string = 'us') => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        country,
        apiKey: API_KEY
      }
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    return [];
  }
};

export const fetchEverything = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: query,
        apiKey: API_KEY
      }
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return [];
  }
};
