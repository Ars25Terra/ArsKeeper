import {NoteGrid} from "./NoteGrid";
import {SafeAreaView} from "react-native";
import {INote} from "../../models/Models";

interface IProps {
    notes: INote[]
}

interface IActions {
    onNoteClick: (note: INote) => void
}

export const NoteGridContainer = ({ notes: allNotes, onNoteClick }: IProps & IActions) => {
    return <SafeAreaView style={{padding: 10, display: 'flex', height: '95%'}}>
        <NoteGrid notes={allNotes}
                  onNoteClick={onNoteClick}/>
    </SafeAreaView>
}
