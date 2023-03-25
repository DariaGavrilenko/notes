import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Note from './Note';
import NoteList from './NoteList';
import Select from 'react-select'

export type notesType = {
  id: number
  text: string
  tags: any[]
}

// export type DataType = {
//   notes: notesType[]
//   requiredId: number
// } 

function App() {
debugger
  const [editMode, setEditMode] = useState<boolean>(false)
  const [notes, setNotes] = useState<notesType[] | null>(null)
  const [requiredId, setRequiredId] = useState<number>(0)
  //const [data, setData] = useState<DataType | null> (null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const notNullNotes = notes ? notes : []

  //console.log(requiredId);


  useEffect(() => {
    if (!notes) {
      const actualNotes = localStorage.getItem('notes')
      const nextNotes = actualNotes ? JSON.parse(actualNotes) : []
      setNotes(nextNotes)
      setRequiredId(nextNotes[0]?.id)

    } else {
      const value = JSON.stringify(notes)
      localStorage.setItem('notes', value)
    }

  }, [notes])

  //   useEffect(() => {
  //   if (!data) {
  //     const actualNotes = localStorage.getItem('notes')
  //     const nextNotes = actualNotes ? JSON.parse(actualNotes) : {}
  //     setData(nextNotes)
  //     //setRequiredId(nextNotes[0]?.id)

  //   } else {
  //     const value = JSON.stringify(data)
  //     localStorage.setItem('notes', value)
  //   }

  // }, [data])

  // get array of all tags 
  const allTags = notNullNotes.map(item => item.tags).reduce((arr, item) => {
    return arr.concat(item)
  }, [])

  // get array uniq tags without '#' symbol
  const uniqTags = [...new Set(allTags)].map(el => ({ label: el.replace('#', ''), value: el.replace('#', '') }))

  //find chosen note 
  const chosenNote = notNullNotes.find(el => el.id === requiredId)
 // const chosenNote = notNullNotes.find(el => el.id === data?.requiredId)

  //Sort notes by tags
  const sortedNotes = selectedTags.length !== 0
    ? notNullNotes.filter(el => {
      return el.tags.some(tag => selectedTags.some(item => `#${item}` === tag))
    })
    : notNullNotes;

  //CRUD operations
  const editNoteText = (newText: string, id: number | undefined) => {
    let answer = Array.from(newText.matchAll(/\#[а-яА-яa-zA-Z0-9_]*/gm)).map(el => el[0])
    setNotes(notNullNotes.map(el => el.id === id ? { ...el, text: newText ? newText : 'empty note', tags: answer } : el))
// if(data){
//   setData({...data, notes:notNullNotes.map(el => el.id === id ? { ...el, text: newText ? newText : 'empty note', tags: answer } : el)})
// }

  }

  const deleteNote = (id: number) => {
    debugger

    const index = notNullNotes.findIndex(el => el.id === id)
    const test  = notNullNotes[index + 1] ? notNullNotes[index + 1].id : notNullNotes[0].id
     setRequiredId(test)
     setNotes(notNullNotes.filter(el => el.id !== id))
    // if(data){
    //   setData({...data, notes:notNullNotes.filter(el => el.id !== id), requiredId:test})
    // }   
  }

  const addNote = () => {
    const id = Math.random() * 6
     setNotes([{ id: id, text: '', tags: [] }, ...notNullNotes])
     setRequiredId(id)
    // if(data){
    //   setData({...data, notes:[{ id: id, text: '', tags: [] }, ...notNullNotes], requiredId:id})
    // }
    setEditMode(true)
  }

  // const setRequiredId = (id:number) => {
  //   if(data){
  //     setData({...data, requiredId:id})
  //   }
  // }



  return (
    <div className="App">
      <Select
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            border: '2px solid #a7a5a5',
            borderRadius:'8px'
          }),
        }}
        defaultValue={[uniqTags[0], uniqTags[1]]}
        isMulti
        name="colors"
        options={uniqTags}
        // unstyled
        className="basic-multi-select"
        onChange={(selectedOptions) => setSelectedTags(selectedOptions.map(el => el.value))}
      />
      <div className="notesContainer">
        <NoteList data={sortedNotes}
          setRequiredId={setRequiredId}
          deleteNote={deleteNote}
          addNote={addNote} />
        <Note note={chosenNote}
          deleteNote={deleteNote}
          editNoteText={editNoteText}
          editMode={editMode}
          setEditMode={setEditMode} />
      </div>
    </div>
  );
}

export default App;
