import {INote} from "../models/Models";
import moment from "moment";
import {
    createNote as repoCreateNote,
    editNote as repoEditNote,
    getNotes as repoGetNotes,
    deleteNode as repoDeleteNode
} from "../repository/NotesRepository";
import {ResultSet} from "expo-sqlite";

/**
 * Create new empty ViewNote
 */
export const createNote = (): Promise<INote> => {
    return new Promise((resolve, reject) => {
        let newNote: INote = {
            id: '',
            data: {
                text: '',
                type: 'note',
                caption: '',
                editDate: moment.now()
            }
        }
        repoCreateNote(JSON.stringify(newNote.data)).then((id) => {
            newNote = {...newNote, id: id}
            resolve(newNote)
        }).catch(error => reject(error))

    })
}

export const editNote = (note: INote) => {
    const updatedNote = {...note, data: {...note.data, editDate: moment.now()}}
    const args = [JSON.stringify(updatedNote.data), note.id]
    console.log('Service: Edit Note Args =>', args)
    repoEditNote(args)
}

export const deleteNote = (note: INote) => {
    console.log('Service: ', note.id)
    repoDeleteNode(note.id)
}

export const getNotes = async (): Promise<INote[]> => {
    return new Promise((resolve, _) => {
        let result: INote[] = []
        repoGetNotes().then((data: ResultSet) => {
            console.log('Service: Get All Notes Promise Resolve =>', data.rows)
            data.rows.forEach(item => {
                result.push(
                    {
                        id: item.rowid,
                        data: JSON.parse(item.note_data)
                    }
                )
            })
            console.log('Service: Get All Notes Result =>', result)
            resolve(result.sort((a, b) => b.data.editDate - a.data.editDate))
        })
    })
}
