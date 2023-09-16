import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react'

const baseUrl = 'http://localhost:3001';

const getNotes = async () => {
  const request = await axios.get(baseUrl + '/api/notes');
  return request.data;

}

const App = () => {
  const [notes, setNotes] = useState()

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await getNotes();
      setNotes(response);
    }

    fetchNotes();
  }, [])

  return (
    <div className="App">
      <h1>Notes</h1>
      {notes && notes.map(note => <p key={note.id}>{note.content}</p>)}
    </div>
  );
}
export default App;