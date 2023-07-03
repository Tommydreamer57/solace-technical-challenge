import { useEffect, useState } from 'react';
import Note from '../../components/Note';
import { useDataContext } from '../../contexts/Data';
import AddNoteForm from './AddNoteForm';
import './Main.css';
import SearchBar from './SearchBar';

export default function Main() {

  const {
    notes,
    clearSearch,
  } = useDataContext();

  const [addingNote, setAddingNote] = useState(false);

  useEffect(() => {
    clearSearch();
  }, [addingNote]);

  return (
    <main className="Main">
      <h2 className="Main-title">
        Notes
      </h2>
      {addingNote ? (
        <AddNoteForm
          onCancel={() => setAddingNote(false)}
        />
      ) : (
        <>
          <SearchBar
            onAddNote={() => setAddingNote(true)}
          />
          <ul className="Main-notes-list">
            {notes.map(({ id, date, content }) => (
              <li key={id} className="Main-notes-list-item">
                <Note
                  id={id}
                  content={content}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
