import logo from './logo.svg';
import {useState} from 'react';
import './App.css';

function App() {

  const API_KEY = "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";

  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  
  const callOpenAIAPI = async () => {
    console.log("calling");
    const APIBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        {
          "role": "system",
          "content": "You will be provided lecture notes. Generate a summary that includes: A title for the topic of the notes at the top and sections with bullet points for content."
        },
        {
          "role": "user",
          "content": notes,
        }
      ],
      "temperature": 0,
      "max_tokens": 200,
      "top_p": 1,
      "frequency_penalty": 0,
      "presence_penalty": 0,
    }
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + API_KEY
      },
      body: JSON.stringify(APIBody),
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setSummary(data.choices[0].message.content);
    });

  }
  return (
    <div className="App">
      <textarea
        onChange={(e) => setNotes(e.target.value)}
        placeholder="notes..."
        cols= {50}
        rows = {20}
      />
      <button onClick={callOpenAIAPI}>Summarize</button>
      {summary !== "" ? 
        <h3>{summary}</h3>  
        :
        null
      }
    </div>
  );
}

export default App;
