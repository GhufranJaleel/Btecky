const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");


getNotes().forEach(note =>{
    const noteElement = createNotesElement(note.id, note.content,note.title);
    notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNotes());

function getNotes(){
return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes){
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNotesElement(id, content, title){
    const MainElement = document.createElement("div");
    const titleElement = document.createElement("input");
    titleElement.classList.add("note-title"); 
    titleElement.type = "text";
    titleElement.value = title;
    titleElement.placeholder = "Enter Title";
    const contentElement = document.createElement("textarea");
    contentElement.classList.add("note"); 
    contentElement.value = content;
    contentElement.placeholder = "Empty Sticky Note";


    contentElement.addEventListener("change",()=>{
      updateNote(id,contentElement.value);
    });


    MainElement.addEventListener("dblclick", ()=>{
        const doDelete = confirm("Are you sure you wish to delete this sticky notes?");
        
        if (doDelete){
            deleteNote(id, MainElement);
        }
    });

    titleElement.addEventListener("change", ()=>{
        updateNote(id,titleElement.value);
      });

     
  
      MainElement.append(titleElement)
      MainElement.append(contentElement)

    return MainElement;

    
}
  
   

function addNotes(){
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        title: "",
        content: ""
    };

    const noteElement = createNotesElement(noteObject.id, noteObject.content, noteObject.title);
    
    notesContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject);
    saveNotes(notes)

}

function updateNote(id,MainElement){
    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = MainElement;
    targetNote.title = MainElement;
    saveNotes(notes);
}


function deleteNote(id, MainElement){
    const notes = getNotes().filter(note => note.id != id);

    saveNotes(notes);
    notesContainer.removeChild(MainElement);
}