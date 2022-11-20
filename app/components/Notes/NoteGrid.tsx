import {INote} from "../../models/Models";
import {ViewNote} from "./ViewNote";
import {ENoteMode} from "./NotesUtils";
import MasonryList from '@react-native-seoul/masonry-list';

interface IProps {
    notes: INote[];
}

interface IActions {
    onNoteClick: (note: INote) => void
}

export const NoteGrid = ({ notes, onNoteClick }: IProps & IActions) => {
    return <MasonryList data={notes as INote[]}
                   key={'notesGrid'}
                   keyExtractor={(item) => item.id}
                   numColumns={2}
                   renderItem={({item}) => <ViewNote key={(item as INote).id}
                                                                  note={item as INote}
                                                                  mode={ENoteMode.VIEW}
                                                                  onClick={onNoteClick}/>}/>
}
