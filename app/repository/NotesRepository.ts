import {NOTES_TABLE_NAME} from "./RepositoryConsts";
import {db} from "../services/DBService";
import {ResultSet} from "expo-sqlite";
import {
    CREATE_NOTE_QUERY,
    CREATE_NOTES_TABLE_QUERY, DELETE_NOTE_QUERY, GET_ALL_NOTES_QUERY, GET_NOTE_QUERY,
    UPDATE_NOTE_QUERY
} from "./SQLQueries";

export const createTable = async () => {
    await db.exec([CREATE_NOTES_TABLE_QUERY], false, (error, _) => {
        if (error) {
            throw new Error(`Could not create table ${NOTES_TABLE_NAME}`)
        }
    });
};

export const createNote = async (args: string): Promise<string> => {
    let insertedId = '-1'
    return new Promise((resolve, reject) => {
        db.exec([CREATE_NOTE_QUERY(args)], false, (error, data) => {
            if (error) {
                console.error('Repo: Create New Note ERROR =>', error)
                reject(() => {throw new Error('Could not create new ViewNote')})
            }
            insertedId = String(((data as unknown) as ResultSet[])[0].insertId)
            resolve(insertedId)
        })
    })
}

export const editNote = async (args: (string | number)[]) => {
    await db.exec([UPDATE_NOTE_QUERY(args)], false, (_, __) => {
    })
}

export const getNotes = async ():Promise<ResultSet> => {
        return new Promise((resolve, reject) => {
            db.exec([GET_ALL_NOTES_QUERY], true, (error, res) => {
                if (error || res && res[0].hasOwnProperty('error')) {
                    console.error('Repo: GetNotes => Error', error, res)
                    reject(() => {
                        throw new Error(`Could not read notes`)
                    })
                } else {
                    const rows: ResultSet[] = (res as unknown) as ResultSet[]
                    resolve(rows[0])
                }
            })
        })
}

export const deleteNode = async (id: string) => {
    await db.exec([DELETE_NOTE_QUERY(id)], false, (_, __) => {
    })
}

export const getNoteById = async (id: string):Promise<ResultSet> => {
    return new Promise((resolve, reject) => {
        db.exec([GET_NOTE_QUERY([id])], true, (error, res) => {
            if (error || res && res[0].hasOwnProperty('error')) {
                reject(() => {
                    throw new Error(`Could not read ${id ? 'ViewNote with id: ' : 'notes'}${id ? id : ''}`)
                })
            } else {
                const rows: ResultSet[] = (res as unknown) as ResultSet[]
                resolve(rows[0])
            }
        })
    })
}
