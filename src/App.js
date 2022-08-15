import { useState } from 'react';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from "./components/NotesList";
import Search from './components/Search';
import Header from './components/Header';

const App = () => {
  const [notes, setNotes] = useState([
    {
      text: 'this is my first note',
      date: '15/04/2021',
      id: nanoid()
    },
    {
      text: 'this is my second note',
      date: '16/04/2021',
      id: nanoid()
    },
    {
      text: 'this is my third note',
      date: '17/04/2021',
      id: nanoid()
    }
  ]);

  const [searchText, setSearchText] = useState('');

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'react-notes-app-data',
			JSON.stringify(notes)
		);
	}, [notes]);

   const addNote = (text) => {
    const date = new Date();
    const newNote = {
      text: text,
      date: date.toLocaleDateString(),
      id: nanoid()
    }
    const newNotes =[...notes, newNote]
    setNotes(newNotes)
   }

   const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
   }

  return(
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList 
          notes={notes.filter((note) => note.text.toLowerCase().includes(searchText))} 
          handleAddNote={addNote} 
          handleDeleteNote={deleteNote}
          />
      </div>
    </div>
    
  )
}

export default App;