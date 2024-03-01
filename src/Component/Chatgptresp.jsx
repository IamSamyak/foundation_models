import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatGPT = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Replace with your ChatGPT API endpoint and secret key
      const url = 'https://api.openai.com/v1/completions';
      const apiKey = 'YOUR_OPENAI_API_KEY';

      const data = {
        model: 'text-davinci-003', // Adjust model based on your needs
        prompt: input,
        max_tokens: 150, // Adjust token limit as needed
        temperature: 0.7, // Adjust temperature for desired creativity
      };

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      };

      const response = await axios.post(url, data, { headers });
      setResponse(response.data.choices[0].text.trim());
    } catch (error) {
      console.error(error);
      setResponse('Error fetching response.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatgpt-container">
      <h1>Ask ChatGPT</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your question"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Ask'}
        </button>
      </form>

      {response && <p className="response">{response}</p>}
    </div>
  );
};

export default ChatGPT;
