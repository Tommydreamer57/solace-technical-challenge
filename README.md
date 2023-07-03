
# Solace Technical Full Stack Project

##### By Thomas Lowry



## Stack

Front End:

- React
- Create React App
- React-ionicons

Back End:

- Web Server
  - Node
  - Cors
  - Body-parser
  - Express
  - Node-postgres (pg)
  - Nodemon
- Database
  - PostgreSQL
  - Citext
  - Managed by [Neon.tech](https://Neon.tech)



## Database Schema

Note Table

- Columns
  - `id`
    - Serial primary key
  - `date`
    - Timestamp defaulting to `current_timestamp`
  - `content`
    - Citext (case-insensitive text)
- Constraints
  - `note_content_char_length`
    - Ensures that the `content` is between 20 and 300 characters, inclusive



## Key Files/Folders

`/.env`

- Private environment variables stored in `/.env` for access by node server
  - `DATABASE_URL`
    - URL for connecting to postgres database
- Gitignored for privacy

`/server/index.js`

- Web server code is 100% in `/server/index.js`, due to the small quantity
  - Endpoints
    - GET `/notes`
      - Optional query parameter
        - `searchText`
          - A string for filtering the notes by their content, including only notes whose content contains the searcText (case insensitive)
      - Result
        - An array of `note` objects `(id<Number>, date<String>, content<String>)`, ordered from oldest to newest, filtered by the `searchText` parameter if provided
    - POST `/note`
      - Required body object
        - `content`
          - The contents of the note, which must be a string between 20 and 300 characters, inclusive
      - Result
        - The newly created `note` object
    - PUT `/note/:id`
      - Required url parameter
        - `id`
          - The id of the note to update
      - Required body object
        - `content`
          - The updated contents of the note
      - Result
        - The newly updated `note` object
    - DELETE `/note/:id`
      - Required url parameter
        - `id`
          - The id of the note to delete
      - Result
        - The deleted `note` object

`/src/App.js`

- Top-level JS file edited for this project
- All other files directly under the `/src/` directory have been left untouched, except for the following
  - `App.css`
    - I've deleted much of this file's contents
  - `reset.css`
    - I copied this from [meyerweb.com](https://meyerweb.com/eric/tools/css/reset/) to reset browser default styles

`/src/components/`

- Reusable UI components, including the following
  - `<ExternalLink/>`
    - A link that opens up a new tab, rendered as text with an open icon
  - `<Note/>`
    - A modular note component that renders a note's `content`, along with buttons to edit or delete the note
    - Edit converts the text into an input field and renders buttons to cancel or save changes
    - Delete renders a confirmation message along with buttons to cancel or confirm the deletion

`/src/contexts/`

- Contexts providing centralized data or functionality across the application
  - `DataContext`
    - Manages all CRUD operations in the application, making both data and CRUD methods available to downstream components
    - `useDataContext()`
      - hook for easily accessing data context values anywhere in the component tree
    - Context value properties
      - `fetchingNotes`
        - Boolean value indicating whether the notes are currently being fetched. Not yet referenced downstream for asynchronous UI feedback
      - `notes`
        - Array of `note` objects `(id<Number>, date<String>, content<String>)`, fetched immediately upon page load. An empty array until database response is received
      - `searchText`
        - String that was used to filter the notes requested from the database. Not necessarily the same as the current value of the search input (in the case that the user has typed in the input but not yet hit the Search button)
      - `fetchNotes(searchText?)`
        - Function that takes in an optional `searchText` parameter that is used to fetch only the notes containing the `searchText` as a substring (case insensitively). All notes are fetched if `searchText` is not provided
      - `clearSearch()`
        - Function that checks whether the current results have been filtered (searchText exists) and refetches the unfiltered notes if necessary
      - `createNote(content)`
        - Function that receives the `content` of a new note as its sole parameter, creates a note with that content, then refetches the complete notes list (the refetching may be refactored for performance at a later date)
      - `updateNote(id, content)`
        - function that receives the `id` of the note to update and a new `content` value to assign to that note
      - `deleteNote(id)`
        - Function that receives the `id` of a note to delete

`/src/sections/`

- The two main sections of the application
  - `Header`
    - The landing page of the application, with styles kept from the original create-react-app landing page
  - `Main`
    - The main section of the application containing all note-related functionalities
      - `<AddNoteForm>`
        - A form containing a textarea for inputting a new note's contents and Cancel and Add buttons for either cancelling or saving the new note and navigating back to the notes list
      - `<SearchBar>`
        - An input for entering `searchText` for filtering the notes, followed by Search, Clear, and Add buttons for applying the `searchText`, cancelling it, or creating a new note
      - Notes list
        - A list of all the notes matching the `searchText`