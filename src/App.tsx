import React, { useState, useEffect} from 'react';
import Select, { MultiValue } from 'react-select'

import Note from './Note';
import Button from './Button';
import NoteList from './NoteList';

import s from './App.module.scss';
import { v1 } from 'uuid';

export type notesType = {
  id: string
  text: string
  tags: any[]
}

const getUniqTags = (notes: notesType[]) => {
  // get array of all tags
  const allTags = notes.map(item => item.tags).reduce((arr, item) => {
    return arr.concat(item)
  }, [])

  // get array uniq tags without '#' symbol
  return [...new Set(allTags)].map(el => ({ label: el.replace('#', ''), value: el.replace('#', '') }))
}

const getSortedNotesByTags = (tagsList: string[], notes: notesType[]) => {
 return tagsList.length 
  ? notes.filter(el => {
    return el.tags.some(tag => tagsList.some(item => `#${item}` === tag))
  })
  : notes;
}

const App = () => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [notes, setNotes] = useState<notesType[]>([])
  const [activeNoteId, setActiveNoteId] = useState<string>('0') 
  const [tagsList, setTagsList] = useState<string[]>([]) 

  const activeNote = notes.find(el => el.id === activeNoteId) 

  const uniqTags = getUniqTags(notes)

  useEffect(() => {
    if (!notes.length) {
      const actualNotes = localStorage.getItem('notes')
      const nextNotes = actualNotes ? JSON.parse(actualNotes) : []
      nextNotes.length && setNotes(nextNotes)
      nextNotes.length && setActiveNoteId(nextNotes[0]?.id)
    } else {
      const value = JSON.stringify(notes)
      localStorage.setItem('notes', value)
    }
  }, [notes])

  const onEditNoteClick = () => setEditMode(true)

  const onNoteBlur = (newText: string, id: string| undefined)=>{
    const answer = Array.from(newText.matchAll(/\#[а-яА-яa-zA-Z0-9_]*/gm)).map(el => el[0])
    setNotes(notes.map(el => el.id === id ? { ...el, text: newText ? newText : 'empty note', tags: answer } : el))
    setEditMode(false)
  }

  const onDeleteNoteClick = (id: string) => {
    const index = notes.findIndex(el => el.id === id)
    const nextId  = notes[index + 1] ? notes[index + 1].id : notes[0].id
    const nextNotes = notes.filter(el => el.id !== id)
debugger
    if(!nextNotes.length){
      localStorage.removeItem('notes')
    }

    setActiveNoteId(nextId)
    setNotes(nextNotes)
  }

  const onAddNoteClick = () => {
    const id = v1()
    setNotes([{ id: id, text: '', tags: [] }, ...notes])
    setActiveNoteId(id)
    setEditMode(true)
  }

  const onSelectNoteClick = (id: string)=>{
    setActiveNoteId(id)
  }

  const onSelectChange = (selectedOptions: MultiValue<{ label: any; value: any; }>) =>{
    setTagsList(selectedOptions.map(el => el.value))
  }


  return (
    <div className={s.App}>
      <Select
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            border: '2px solid #a7a5a5',
            borderRadius:'8px'
          }),
        }}
        isMulti
        name="colors"
        options={uniqTags}
        onChange={onSelectChange}
      />
    {notes.length ?   <div className={s.notesContainer}>
        <NoteList 
          data={getSortedNotesByTags(tagsList, notes)}
          onAddNoteClick={onAddNoteClick} 
          onSelectNoteClick={onSelectNoteClick}
          onDeleteNoteClick={onDeleteNoteClick}
        />
        <Note 
          editMode={editMode}
          note={activeNote}
          onEditNoteClick={onEditNoteClick} 
          onNoteBlur={onNoteBlur}
          onDeleteNoteClick={onDeleteNoteClick}
        />
      </div> : <Button onClickHandler={onAddNoteClick} className={s.button}>Add note</Button>}
    </div>
  );
}

export default App;
