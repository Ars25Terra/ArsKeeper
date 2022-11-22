import {SafeAreaView, Text, View} from "react-native";
import {TravelGrid} from "./TravelGrid";
import {useState} from "react";
import {INote, ITravelDay} from "../../models/Models";
import {EditTravel} from "./EditTravel";
import moment from "moment";
import {editNote} from "../../services/NoteService";

export const TravelComponent = () => {
    const [travelNote, setTravelNote] = useState<INote>()

    const handleChangeStartDate = (date: Date | undefined | string) => {
        if (travelNote) {
            const days: ITravelDay[] = [
                {date: moment(date).valueOf(), events: []}
            ]
            const updatedNote = {
                ...travelNote, id: travelNote?.id,
                data: {
                    ...travelNote?.data, editDate: moment.now(), type: 'travel',
                    travel: {
                        ...travelNote?.data.travel,
                        days: days
                    }
                }
            }
            editNote(updatedNote)
            setTravelNote(updatedNote)
        }
    }

    const handleChangeEndDate = (date: Date | undefined | string) => {
        if (travelNote && travelNote.data.travel?.days) {
            const updatedNote = {...travelNote,
                data: {...travelNote.data,
                    travel: {...travelNote.data.travel,
                        days: [travelNote.data.travel?.days[0]]
                }
            }}

            const startMoment = moment(travelNote.data.travel?.days[0].date)
            const endMoment = moment(date)
            const diff: number = endMoment.diff(startMoment, 'days')
            for (let i=1; i < diff; i++) {
                let newDay = moment(startMoment).add(i, 'days')
                updatedNote?.data?.travel?.days.push({date: newDay.valueOf(), events: []})
            }
            updatedNote?.data?.travel?.days.push({date: moment(date).valueOf(), events: []})
            editNote(updatedNote)
            setTravelNote(updatedNote)
        }
    }

    const handleChangeTravelNote = (note: INote) => {
        editNote({...note})
        setTravelNote({...note})
    }

    return <SafeAreaView style={{width: '100%', height: '100%', margin: 14, backgroundColor: 'white'}}>
        <View>
            <Text style={{fontWeight: 'bold', fontSize: 24, marginBottom: 20}}>
                Travel Keeper
            </Text>
        </View>
        {
            !travelNote && <TravelGrid  onTravelNoteOpen={setTravelNote}
                                        onAddTravelClick={(travelNote) => {
                                            setTravelNote(travelNote)
                                        }}/>
        }
        {
            travelNote && <EditTravel travelNote={travelNote}
                                      onChangeTravelNote={handleChangeTravelNote}
                                      onChangeStartDate={handleChangeStartDate}
                                      onBackButtonClick={() => {
                                          setTravelNote(undefined)
                                      }}
                                      onChangeEndDate={handleChangeEndDate}/>
        }
    </SafeAreaView>
}
