import { useEffect, useState } from 'react';
import { CreateOutline, TrashOutline } from 'react-ionicons';
import { useDataContext } from '../contexts/Data';

export default function Note({ id, content }) {

  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);

  const [inputValue, setInputValue] = useState(content);

  useEffect(() => {
    setInputValue(content);
  }, [editing]);

  const { deleteNote, updateNote } = useDataContext();

  if (deleting) return (
    <div className="Note">
      <div className="Note-content">
        Are you sure you want to delete this note?
      </div>
      <button
        className="Note-button"
        onClick={() => setDeleting(false)}
      >
        Cancel
      </button>
      <button
        className="Note-button"
        onClick={() => deleteNote(id)}
      >
        Delete
      </button>
    </div>
  );

  else if (editing) return (
    <div className="Note">
      <div className="Note-content">
        <input
          className="Note-edit-input"
          value={inputValue}
          onChange={({ target: { value } }) => setInputValue(value)}
          autoFocus
        />
      </div>
      <button
        className="Note-button"
        onClick={() => setEditing(false)}
      >
        Cancel
      </button>
      <button
        className="Note-button"
        onClick={() => {
          updateNote(id, inputValue);
          setEditing(false);
        }}
      >
        Save
      </button>
    </div>
  );

  else return (
    <div className="Note">
      <div className="Note-content">
        {content}
      </div>
      <button
        className="Note-button"
        onClick={() => setEditing(true)}
        title='Edit'
      >
        <CreateOutline />
      </button>
      <button
        className="Note-button"
        onClick={() => setDeleting(true)}
        title='Delete'
      >
        <TrashOutline />
      </button>
    </div>
  )
}
