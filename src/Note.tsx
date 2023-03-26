import React, { useEffect, useState } from 'react'
import HighlightWithinTextarea from 'react-highlight-within-textarea'

import delImage from './img/delete.png'
import editImage from './img/edit.png'

import { notesType } from './App'

import Button from './Button'

import s from './Note.module.scss'

type NotePropsType = {
    editMode: boolean
    note: notesType | undefined
    onEditNoteClick: () => void
    onNoteBlur: (newText: string, id: string | undefined) => void
    onDeleteNoteClick: (id: string) => void
}

const Note = ({ editMode, note, onEditNoteClick, onNoteBlur, onDeleteNoteClick }: NotePropsType) => {

    const [newText, setNewText] = useState<string>(note ? note.text : '')

    useEffect(() => {
        setNewText(note?.text || '')
    }, [note])

    return (
        <div className={s.note}>
            <div className={s.note__buttons}>
                <Button className={s.note__button} onClickHandler={() => onDeleteNoteClick(note ? note.id : '0')}>
                    <img src={delImage} alt="delete" className={s.note__icon} />
                </Button>
                <Button className={s.note__button} onClickHandler={onEditNoteClick}>
                    <img src={editImage} alt="edit" className={s.note__icon} />
                </Button>
            </div>
            {editMode ? 
            <HighlightWithinTextarea
                value={newText}
                placeholder={'Tap here to enter your text'}
                highlight={[/\#[а-яА-яa-zA-Z0-9_]*/gm]}
                onChange={(newText) => setNewText(newText)}
                onBlur={()=>onNoteBlur(newText, note?.id)}
            />
            :
            <div className={s.note__text}>
                {newText}
                {note?.tags?.map((el: string, index: number) => <ul key={index}>
                    <li>{el}</li>
                    </ul>
                )}
            </div>
            }
        </div>
    )
}

export default Note