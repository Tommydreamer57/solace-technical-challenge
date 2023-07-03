import { useEffect, useState } from 'react';
import { useDataContext } from '../../contexts/Data';

export default function SearchBar({
  onAddNote,
}) {

  const {
    searchText,
    fetchNotes,
    clearSearch,
  } = useDataContext();

  const [searchInput, setSearchInput] = useState(searchText);

  useEffect(() => {
    setSearchInput(searchText);
  }, [searchText]);

  return (
    <section className='Main-search-bar'>
      <input
        value={searchInput}
        onChange={({ target: { value } }) => setSearchInput(value)}
        onKeyDown={({ key }) => {
          if (key === 'Enter') fetchNotes(searchInput);
        }}
      />
      <button
        onClick={() => fetchNotes(searchInput)}
      >
        Search
      </button>
      <button
        onClick={() => clearSearch()}
        disabled={!searchText}
      >
        Clear
      </button>
      <button
        onClick={onAddNote}
      >
        Add
      </button>
    </section>
  );
}
