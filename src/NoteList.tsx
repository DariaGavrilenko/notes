import delImage from './img/delete.png'

import { notesType } from './App'

import Button from './Button'

import s from './NoteList.module.scss'

type NoteListPropsType = {
    data: notesType[] | null | undefined
    onAddNoteClick:()=>void
    onSelectNoteClick:(id:string)=>void
    onDeleteNoteClick:(id:string)=>void
}

const getCuttedText = (text: string)=> text.length > 15 ? text.slice(0,15) + '...' : text

const NoteList = ({data, onAddNoteClick, onSelectNoteClick, onDeleteNoteClick }:NoteListPropsType) =>  (
        <div className={s.list__container} >
            <Button className={s.list__addButton} onClickHandler={onAddNoteClick}>+ add</Button>
            {data?.map((el,index) => <ul className={s.list}  key={index}>
                <li className={s.list__item} onClick={()=>{
                    onSelectNoteClick(el.id)}}>{el.text ? getCuttedText(el.text)  : 'empty note'}
                    <Button className={s.note__button} 
                    onClickHandler={(e)=>{
                        e.stopPropagation()
                        onDeleteNoteClick(el.id)}}>
                        <img src={delImage} alt="delete" className={s.note__icon} />
                    </Button>
                </li>
            </ul>)}

        </div>
    )


export default NoteList