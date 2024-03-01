import React, { useState, useEffect } from 'react';

function App() {
  const [userInput, setUserInput] = useState('');
  const [modelResponse1, setModelResponse1] = useState(null);
  const [modelResponse2, setModelResponse2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Replace with your chosen model and API endpoint
  const modelURL1 = "https://api-inference.huggingface.co/models/gpt2";
  const apiKey = "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"; // Replace with your Hugging Face API key

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Fetch response from first model
      const response1 = await fetch(modelURL1, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: userInput,
        }),
      });

      const data1 = await response1.json();
      setModelResponse1(data1[0].generated_text);

      // Fetch response from second model
      const response2 = await fetch(modelURL1, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: userInput,
        }),
      });

      const data2 = await response2.json();
      setModelResponse2(data2[0].generated_text);
    } catch (error) {
      console.error(error);
      setModelResponse1("Error: Could not process your request.");
      setModelResponse2("Error: Could not process your request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Ask foundation models</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userInput">Enter your text:</label>
        <input
          type="text"
          id="userInput"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Submit'}
        </button>
      </form>

      <div className="response-container">
        <div className="response">
          <h1>Model1's Response</h1>
          {modelResponse1 && (
            <p>
              {modelResponse1}
            </p>
          )}
        </div>
        <div className="response">
        <h1>Model2's Response</h1>
          {modelResponse2 && (
            <p>
              {modelResponse2}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
