import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

//Define a type for the not objects -typescript allows us to define custom types
type Note = {
  id: number;
  title: string;
  content: string;
};

export default function App(){
   // State hooks for managing notes, the current title and content input,
  // and the selected note for editing
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("")
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

// useEffect hook to fetch notes from API when the component mounts
  useEffect(()=>{
    //can't use async await directly onthe useeffect function so create another function within
    const fetchNotes = async ()=>{
      try {
        const response = await fetch("http://localhost:5000/api/notes")

        const notes: Note[] = await response.json();
        setNotes(notes);  // Update the state with the fetched notes
      } catch (error) {
        console.log(error);  // Log any error that occurs during the fetch operation
      }
    };
    fetchNotes(); //Execute the fetchNotes function to load notes from database
  },[]); //[] means the app will only run this function the first time we call it

    // Handler functions to manage form inputs and interactions

    // Update the title state as the user types
  function handleTitleInput(e: any){
      setTitle(e.target.value);
  }

    // Update the content state as the user types
  function handleContentInput(e: any){
    setContent(e.target.value)
  }

   // Handle the form submission to add a new note
  async function handleAddNote(e: React.FormEvent){
    e.preventDefault();
   try {
    const response = await fetch(
      "http://localhost:5000/api/notes",{

        method:"POST",
        headers:{
          "Content-type":"application/json",
        },
        body: JSON.stringify({
          title,
          content
      })
    }
    );

    const newNote = await response.json();
     //add the new note to our note array.
     setNotes([newNote, ...notes]);
     //Empties out the title and content values from the form so the user can add new content
     setTitle("");
     setContent(""); 
    
   } catch (error) {
    console.log(error);
   }

  }

    // Handle the selection of a note to populate the form for editing
  function handleNoteClick(note: Note){
      setSelectedNote(note);
      setTitle(note.title);
      setContent(note.content);
  }

    // Handle the form submission to update an existing note
  async function handleUpdateNote(e: React.FormEvent){
    e.preventDefault();

    if(!selectedNote){
      return;
    }
    
    try {

const response = await fetch(
  `http://localhost:5000/api/notes/${selectedNote.id}`,{
    method: 'PUT',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      title,
      content,
    })
  }
)
 
  const updatedNote = await response.json();
      const updatedNotesList = notes.map((note)=>
      note.id === selectedNote.id ? updatedNote : note
      )
  
      setNotes(updatedNotesList);
      setTitle("");
      setContent("");
      setSelectedNote(null);
    } catch (error) {
      console.log(error);
    }

  

  };

    // Reset the form and selected note state when cancelling an edit
  function handleCancel(){
    setTitle("");
    setContent("");
    setSelectedNote(null);
  }

    // Handle the deletion of a note
  async function deleteNote(e: React.MouseEvent, noteID:number){
    e.stopPropagation();

    try {
      await fetch(
        `http://localhost:5000/api/notes/${noteID}`,
        {
          method: "DELETE",
        }
      );

      const notesArrayAfterDelete = notes.filter((note)=> note.id !== noteID)
      setNotes(notesArrayAfterDelete);
      
    } catch (error) {
      
    }

  }


    // Render the component
  return(
    <div className="app-container">
      <form className="note-form" onSubmit={(e)=> selectedNote ? handleUpdateNote(e) : handleAddNote(e)}>
            {/* Title input field */}
        <input 
        placeholder="Title"
        required
        onChange={handleTitleInput}
        value = {title}
        />

                {/* Content textarea field */}
        <textarea 
        placeholder="Take some notes!"
        required
        rows={10}
        onChange={handleContentInput}
        value={content}
        ></textarea>

        {/* Conditionally render buttons based on whether a note is being edited */}
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save Edit</button>
            <button onClick={handleCancel}>Cancel</button>
          </div> ) :(
            <button type={"submit"}>Save Note</button>

          )}
          </form>

                {/* Render the notes from the state */}
        <div className="notes-grid">
          {notes.map((note)=>(
          <div className="note-item" onClick={()=> handleNoteClick(note)}>
            <div className="notes-header">
              {/* add an icon here for the x, maybe MUI */}
              <button onClick={(e)=>deleteNote(e,note.id)}>x</button> 
            </div>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
          </div>
          ))}
        </div>
    </div>
  )
}