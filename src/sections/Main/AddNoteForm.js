import { useState } from "react";
import { useDataContext } from "../../contexts/Data";

export default function AddNoteForm({ onCancel }) {

  const [newNoteContent, setNewNoteContent] = useState('');

  const { createNote } = useDataContext();

  return (
    <form
      className="Main-form"
      onSubmit={e => {
        e.preventDefault();
        createNote(newNoteContent);
        onCancel();
      }}
    >
      <textarea
        className="Main-textarea"
        placeholder="Type your note here..."
        value={newNoteContent}
        onChange={({ target: { value } }) => setNewNoteContent(value)}
        autoFocus
      />
      <div>
        <button
          className="Main-form-button"
          onClick={onCancel}
          type="button"
        >
          Cancel
        </button>
        <button
          className="Main-form-button"
          disabled={(newNoteContent.length < 20) || (newNoteContent.length > 300)}
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
  )
}
