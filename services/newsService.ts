import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY; // Ensure this environment variable is set
const BASE_URL = 'https://newsapi.org/v2/top-headlines'; // Correct endpoint

export const fetchTopHeadlines = async () => {
  if (!API_KEY) {
    console.error('API_KEY is not defined');
    return []; // Return an empty array if the API key is not set
  }

  try {
    const response = await fetch(`${BASE_URL}?apiKey=${API_KEY}&country=us`); // Example endpoint with parameters
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Fetched Articles:', data); // Log the data to check its structure
    return data.articles; // Assuming data.articles contains the list of articles
  } catch (error) {
    console.error('Error fetching articles:', error);
    return []; // Return an empty array or handle the error as needed
  }
};


export const fetchEverything = async (query: string) => {
  const response = await axios.get(`${BASE_URL}/everything`, {
    params: {
      apiKey: API_KEY,
      q: query,
    },
  });
  return response.data.articles;
};
