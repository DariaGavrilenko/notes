import { useEffect, useState } from 'react'
import { notesType } from './App'
import Button from './Button'
import del from './img/delete.png'
import edit from './img/edit.png'
import s from './Note.module.scss'
import HighlightWithinTextarea from 'react-highlight-within-textarea'

type NotePropsType = {
    note: notesType | undefined
    editMode: boolean
    setEditMode: (editMode: boolean) => void
    editNoteText: (newText: string, id: number | undefined) => void
    deleteNote: (id: number) => void

}

const Note = ({ note, editNoteText, deleteNote, editMode, setEditMode }: NotePropsType) => {

    const [newText, setNewText] = useState<string>(note ? note.text : '')

    useEffect(() => {
        setNewText(note?.text || '')
    }, [note])

    const onSaveHandler = () => {
        setEditMode(false)
        editNoteText(newText, note?.id)
    }

    return (
        <div className={s.note}>
            <div className={s.note__buttons}>
                <Button className={s.note__button} onClickHandler={() => deleteNote(note ? note.id : 0)}>
                    <img src={del} alt="delete" className={s.note__icon} />
                </Button>
                <Button className={s.note__button} onClickHandler={() => setEditMode(true)}>
                    <img src={edit} alt="edit" className={s.note__icon} />
                </Button>
            </div>
            {editMode ?
                <div>
                    {/* <textarea value={newText} */}
                    {/* <textarea value={'texteteteasd <mark>qweqe</mark> ajshdjahsdkjhahsd'}
                    data-provide="markdown"
                        onChange={onChangeHandle}
                        className={s.note__textarea}
                        // onBlur={onSaveHandler}
                        // autoFocus={true}
                        >
                    </textarea> */}
                    <HighlightWithinTextarea
                        value={newText}
                        placeholder={'Tap here to enter your text'}
                        highlight={[/\#[а-яА-яa-zA-Z0-9_]*/gm]}
                        onChange={(newText) => setNewText(newText)}
                        // className={s.note__textarea}
                        onBlur={onSaveHandler}
                    //autoFocus={true}
                    />
                </div>
                :
                <div className={s.note__text}>{newText}{note?.tags?.map((el: string, index: number) => <ul key={index}>
                    <li>{el}</li>
                </ul>
                )}
                </div>}
        </div>
    )
}

export default Note