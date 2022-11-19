import {Query} from "expo-sqlite";
import {NOTES_TABLE_NAME} from "./RepositoryConsts";

// export const CREATE_NOTES_TABLE_QUERY: Query = {
//     sql: `CREATE TABLE IF NOT EXISTS ${NOTES_TABLE_NAME}
//               (note_text TEXT,
//                note_caption TEXT,
//                note_edit_date NUMBER NOT NULL,
//                note_type TEXT NOT NULL,
//                note_color TEXT,
//                note_crypto_token TEXT
//               );`, args: []
// }

export const CREATE_NOTES_TABLE_QUERY: Query = {
    sql: `CREATE TABLE IF NOT EXISTS ${NOTES_TABLE_NAME}
              (note_data TEXT);`,
    args: []
}

export const UPDATE_NOTE_QUERY = ([...args]): Query => {
    return {
                sql: `UPDATE ${NOTES_TABLE_NAME} SET 
                               note_data=?
                            WHERE rowid=?;`,
                args: args
    }
}

export const CREATE_NOTE_QUERY = (args: string): Query => {
    return {
        sql: `INSERT INTO ${NOTES_TABLE_NAME} (note_data)
              VALUES (?);`,
        args: [args]
    }
}

export const GET_ALL_NOTES_QUERY: Query = {
    sql: `SELECT rowid,* FROM ${NOTES_TABLE_NAME};`,
    args: []
}

export const GET_NOTE_QUERY = ([...args]): Query => {
    return {
        sql: `SELECT rowid,*
              FROM ${NOTES_TABLE_NAME}
              WHERE rowid=?;`,
        args: args
    }
}

export const DELETE_NOTE_QUERY = (id: string): Query => {
    return {
        sql: `DELETE FROM ${NOTES_TABLE_NAME} WHERE rowid=?;`,
        args: [id]
    }
}
