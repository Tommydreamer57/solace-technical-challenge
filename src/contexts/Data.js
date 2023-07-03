import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const baseURL = process.env.REACT_APP_BASE_URL;

const DataContext = createContext({
  fetchingNotes: false,
  notes: [],
  searchText: '',
  fetchNotes: () => { },
  clearSearch: () => { },
  createNote: () => { },
  updateNote: () => { },
  deleteNote: () => { },
});

export const useDataContext = () => useContext(DataContext);

export default function DataProvider({ children }) {

  const [fetchingNotes, setFetchingNotes] = useState(false);
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchNotes = async (searchText = '') => {
    setFetchingNotes(true);
    const query = searchText ? `?searchText=${searchText}` : '';
    const result = await axios.get(`${baseURL}/notes${query}`);
    setSearchText(searchText);
    setNotes(result.data);
    setFetchingNotes(false);
  }

  const clearSearch = () => {
    if (searchText) fetchNotes();
  }

  const createNote = async (content = '') => {
    const result = await axios.post(`${baseURL}/note`, { content });
    // setNotes(notes => [...notes, result.data]);
    fetchNotes();
  }

  const updateNote = async (id, content = '') => {
    const result = await axios.put(`${baseURL}/note/${id}`, { content });
    // setNotes(notes => [...notes, result.data]);
    fetchNotes();
  }

  const deleteNote = async id => {
    const result = await axios.delete(`${baseURL}/note/${id}`);
    // setNotes(notes => notes.filter(({ id: nid }) => nid !== id));
    fetchNotes();
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <DataContext.Provider
      value={{
        fetchingNotes,
        notes,
        searchText,
        fetchNotes,
        clearSearch,
        createNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
