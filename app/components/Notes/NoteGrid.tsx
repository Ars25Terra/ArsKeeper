import {FlatList, SafeAreaView} from "react-native";
import {INote} from "../../models/Models";
import {ViewNote} from "./ViewNote";
import {ENoteMode} from "./NotesUtils";

interface IProps {
    notes: INote[];
}

interface IActions {
    onNoteClick: (note: INote) => void
}

export const NoteGrid = ({ notes, onNoteClick }: IProps & IActions) => {
    return <SafeAreaView>
        <FlatList
                  key={'notesGrid'}
                  numColumns={2}
                  scrollEnabled
                  keyExtractor={(item) => item.id}
                  data={notes}
                  renderItem={({item}) => <ViewNote key={item.id}
                                                                                    note={item}
                                                                                    mode={ENoteMode.VIEW}
                                                                                    onClick={onNoteClick}/>}/>
    </SafeAreaView>
}
