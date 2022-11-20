import {SafeAreaView, View} from "react-native";
import {useEffect, useState} from "react";
import {NoteGridContainer} from "./NoteGridContainer";
import {EditNote} from "./EditNote";
import {createNote, deleteNote, editNote, getNotes} from "../../services/NoteService";
import {INote} from "../../models/Models";
import {ENoteMode} from "./NotesUtils";
import { AntDesign } from '@expo/vector-icons';

/**
 * Container component for all Notes functionality
 * @constructor
 */
export const NotesComponent = () => {
    const [note, setNote] = useState<INote>()

    const [notes, setNotes] = useState<INote[]>([])
    useEffect(() => {
        (async function () {
            try {
                await getNotes().then(res => {
                    setNotes(res);
                });
            } catch (e) {
                console.warn(e);
            }
        })()

    }, [note]);

    const handlePressNewNote = () => {
        createNote().then(note => setNote(note))
    }

    const handleSaveNewNoteClick = (note: INote) => {
        console.log('Notes Component: note =>', note)
        editNote(note)
    }

    const handleNewNoteBackButtonClick = () => {
        setNote(undefined)
    }

    const getCryptoToken = (note: INote): string => {
        if (note.data.text) {
            const tokeName = note.data.text.match(/^\$[a-zA-Z0-9]+[ \f\t\v]$/g) ?? []
            return tokeName[0]?.trim()
        }
        return ''
    }

    const findExistingCryptoNote = (tokenName: string): INote | false => {
       return notes.find(note => note.data.cryptoToken?.name === tokenName.trim().toUpperCase()) ?? false
    }

    const handleChangeNote = (note: INote) => {
        console.log('ChangeNote: Note.Deals => ', note.data.cryptoToken?.deals)
        const tokenName = getCryptoToken(note)
        let updatedNote = {...note}
        if (tokenName) {
            console.log('In New Crypto')
            const existingNote = findExistingCryptoNote(tokenName)
            if (existingNote) {
                deleteNote(updatedNote)
                setNote(existingNote)
                return
            }
            updatedNote = {
                ...updatedNote, data: {...updatedNote.data,
                    type: 'crypto',
                    caption: tokenName.trim().toUpperCase(),
                    text: tokenName.trim().toUpperCase(),
                    cryptoToken: {name: tokenName.trim().toUpperCase(), deals: []}
                }
            }
        }
        setNote(updatedNote)
        handleSaveNewNoteClick(updatedNote)
    }

    const handleOnNoteClick = (note: INote) => {
        setNote(note)
    }

    const handleDeleteNote = (note: INote) => {
        deleteNote(note)
        setNote(undefined)
    }

    return <SafeAreaView>
        {!note && <>
            <NoteGridContainer notes={notes} onNoteClick={handleOnNoteClick}/>
            <View style={{position: 'absolute', bottom: 60, right: 20}}>
                <AntDesign name="pluscircle" size={80} color="gray" onPress={handlePressNewNote}/>
            </View>
        </>}
        {note && <EditNote note={note}
                           mode={ENoteMode.EDIT}
                           onChangeNote={handleChangeNote}
                           onDeleteNote={handleDeleteNote}
                           onBackButtonClick={handleNewNoteBackButtonClick}/>}
    </SafeAreaView>
}
