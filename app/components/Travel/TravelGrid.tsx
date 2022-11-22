import {Button, FlatList, SafeAreaView, View} from "react-native";
import {useEffect, useState} from "react";
import {INote} from "../../models/Models";
import {createNote, deleteNote, editNote, getNotes} from "../../services/NoteService";
import {TravelGridItem} from "./TravelGridItem";

interface IActions {
    onAddTravelClick: (travel: INote) => void
    onTravelNoteOpen: (note: INote) => void
}

export const TravelGrid = (props: IActions) => {
    const [travels, setTravels] = useState<(INote | undefined)[]>([])

    const handleAddTravelClick = () => {
        createNote().then(note => {
            const newTravelNote = {...note, data: {...note.data, type: 'travel', travel: {name: '', country: 'RU', days: []}}}
            editNote(newTravelNote)
            props.onAddTravelClick(newTravelNote)
        })

    }

    async function refreshNotes() {
        try {
            await getNotes().then(res => {
                if (res) {
                    const list = res.filter(note => note.data.type === 'travel' && note.data.travel)
                    if (list.length > 0) {
                        setTravels(list ?? [])
                    }
                }
            })
        } catch (e) {
            console.warn(e);
        }
    }

    useEffect(() => {
        refreshNotes()
    }, []);

    return <SafeAreaView style={{margin: 10, width: '87%', height: '100%'}}>
        <FlatList style={{flex: 1, height: '80%'}}
                  scrollEnabled
                  data={travels.sort((a, b) => {
                      if (a && b && a?.data?.travel?.days[0]?.date && b?.data?.travel?.days[0]?.date) {
                          return a?.data?.travel?.days[0]?.date - b.data.travel?.days[0]?.date
                      }
                      return 0
                  })}
                  renderItem={item => <TravelGridItem onTravelNoteOpen={props.onTravelNoteOpen}
                                                      onDeleteTravelNote={(note) => {
                                                          deleteNote(note)
                                                          refreshNotes()
                                                      }}
                                                      travelNote={item.item}/>}/>
        <View style={{flex: 0.45, display: 'flex'}}>
            <Button title={'Add Travel'} onPress={handleAddTravelClick}/>
        </View>
    </SafeAreaView>
}
