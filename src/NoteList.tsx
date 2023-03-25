import s from './NoteList.module.scss'
import del from './img/delete.png'
import Button from './Button'
import { notesType } from './App'

type NoteListPropsType = {
    data: notesType[] | null | undefined
    setRequiredId:(id:number)=>void
    deleteNote:(id:number)=>void
    addNote:()=>void
 }


const NoteList = ({data,setRequiredId, deleteNote, addNote}:NoteListPropsType) => {
    const cutText = (text:string) =>{
      return  text.length > 15 ? text.slice(0,15) + '...' : text
    }
    return (
        <div className={s.list__container} >
            <Button className={s.list__addButton} onClickHandler={addNote}>+ add</Button>
            {data?.map((el,index) => <ul className={s.list}  key={index}>
                <li className={s.list__item} onClick={()=>setRequiredId(el.id)}>{el.text ? cutText(el.text)  : 'empty note'}
                    <Button className={s.note__button} onClickHandler={()=>deleteNote(el.id)}>
                        <img src={del} alt="delete" className={s.note__icon} />
                    </Button>
                </li>
            </ul>)}

        </div>
    )
}

export default NoteList