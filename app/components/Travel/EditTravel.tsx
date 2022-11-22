import {SafeAreaView, SectionList, TextInput, Text, View, Button} from "react-native";
import {INote, ITravelDay, ITravelEvent} from "../../models/Models";
import moment from "moment";
import {DatePickerComponent} from "../DatePickerComponent/DatePickerComponent";
import {TravelEvent} from "./TravelEvent";
import {AddEvent} from "./AddEvent";
import {CountryPicker} from "react-native-country-codes-picker";
import {useState} from "react";
import {isoCountry} from 'iso-country';
import CountryFlag from "react-native-country-flag";

interface IProps {
    travelNote: INote
}

interface IActions {
    onChangeTravelNote: (travelNote: INote) => void
    onChangeStartDate: (date: Date | undefined) => void
    onChangeEndDate: (date: Date | undefined) => void
    onBackButtonClick: () => void
}

export const EditTravel = (props: IProps & IActions) => {
    const sectionListData = props.travelNote.data.travel?.days.map((day) => {
        return {
            title: moment(day.date).format('dddd DD.MM.YY'),
            data: day.events.sort((a, b) => {
                if (a.isNoTime) {
                    return -1
                }
                if (a.isNoTime) {
                    return 1
                }
                if (a.isNoTime && !b.isNoTime) {
                    return -1
                }
                if (!a.isNoTime && b.isNoTime) {
                    return 1
                }
                if (a.time && b.time) return a.time - b.time

                return 0
            })
        }
    })

    const handleChangeTravelName = (name: string) => {
        const updatedNote = {
            ...props.travelNote, data: {
                ...props.travelNote.data,
                travel: {
                    ...props.travelNote.data.travel,
                    name: name, days: props.travelNote.data.travel?.days ?? []
                }
            }
        }
        props.onChangeTravelNote(updatedNote)
    }

    const handleAddEventButtonClick = (newEvent: ITravelEvent, day: ITravelDay | undefined) => {
        if (day) {
            const findDate = props.travelNote.data.travel?.days.find(d => {
                return d?.date?.valueOf() === moment(day.date ? new Date(day.date).setHours(0, 0, 0, 0) : undefined).valueOf()
            })
            if (findDate) {
                const index = props.travelNote.data.travel?.days.indexOf(findDate)
                findDate.events.push(newEvent)
                if (index != undefined && index >= 0) {
                    const updatedNote: INote = {...props.travelNote}
                    const newDays = [...updatedNote.data.travel?.days ?? []]
                    newDays[index] = findDate
                    props.onChangeTravelNote(updatedNote)
                }
            }
        }
    }

    const [isCountryPickerOpen, setCountryPickerOpen] = useState<boolean>(false)

    const endDate: (Date | undefined) = props.travelNote?.data?.travel?.days[props.travelNote?.data?.travel?.days?.length - 1]?.date
        ? moment(props.travelNote.data.travel?.days[props.travelNote.data.travel?.days.length - 1]?.date).toDate()
        : undefined

    return <SafeAreaView style={{marginLeft: 15, width: '85%', height: '100%'}}>
        <View style={{flex: 1, height: '100%'}}>
            <TextInput value={props.travelNote.data.travel?.name}
                       onChangeText={handleChangeTravelName}
                       style={{fontSize: 24, marginBottom: 10}}
                       placeholder={'Enter travel name...'}/>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CountryPicker show={isCountryPickerOpen}
                               pickerButtonOnPress={(country) => {
                                   setCountryPickerOpen(false)
                                   const note: INote = {
                                       ...props.travelNote,
                                       data: {
                                           ...props.travelNote.data,
                                           travel: {
                                               ...props.travelNote.data.travel,
                                               country: country.code,
                                               days: [...props.travelNote.data.travel?.days ?? []]
                                           }
                                       }
                                   }
                                   props.onChangeTravelNote(note)
                               }}
                               lang={'en'}/>
                <TextInput onFocus={() => {
                    setCountryPickerOpen(true)
                }}
                           style={{fontSize: 20, marginBottom: 10}}
                           value={isoCountry(props.travelNote.data.travel?.country ?? 'ru')?.name}
                           placeholder={'Choose country...'}/>
                <View style={{position: 'absolute', right: 0, borderColor: 'silver', borderWidth: 1}}>
                    <CountryFlag isoCode={props.travelNote.data.travel?.country ?? 'ru'}
                                 size={15}/>
                </View>
            </View>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: 10
            }}>
                <View style={{alignSelf: 'flex-start'}}>
                    <DatePickerComponent
                        placeholder={'Enter start date...'}
                        mode={'date'}
                        fontSize={20}
                        minimumDate={new Date(moment.now())}
                        calendarValue={props.travelNote.data.travel?.days[0]?.date
                            ? new Date(props.travelNote.data.travel?.days[0]?.date)
                            : undefined}
                        onCalendarChange={(date) => {
                            props.onChangeStartDate(date)
                        }}/>
                </View>
                <View style={{alignSelf: 'flex-end', display: 'flex'}}>
                    {props.travelNote.data.travel?.days[0]?.date
                        && <DatePickerComponent
                            mode={'date'}
                            fontSize={20}
                            placeholder={'Enter trip end date...'}
                            calendarValue={endDate}
                            onCalendarChange={(date) => {
                                props.onChangeEndDate(date)
                            }}
                            minimumDate={new Date(moment(props.travelNote.data.travel?.days[0]?.date).valueOf())}/>}
                </View>
            </View>
            {props.travelNote.data.travel?.days && props.travelNote.data.travel?.days.length >= 2 &&
                <View style={{marginBottom: 20, flex: 0.9}}>
                    <SectionList
                        renderItem={(item) => <TravelEvent
                            onDeleteEvent={(_) => {
                                const note = {...props.travelNote}
                                const currDay = note.data.travel?.days.find(day => day.date === moment(item.section.title, 'dddd DD.MM.YY').valueOf())
                                if (currDay) {
                                    const eventIndex = currDay.events.indexOf(item.item)
                                    currDay.events.splice(eventIndex, 1)
                                    props.onChangeTravelNote(note)
                                }
                            }}
                            onChangeEvent={(event) => {
                                const note = {...props.travelNote}
                                const currDay = note.data.travel?.days.find(day => day.date === moment(item.section.title, 'dddd DD.MM.YY').valueOf())
                                if (currDay) {
                                    const eventIndex = currDay.events.indexOf(item.item)
                                    currDay.events[eventIndex] = event
                                    props.onChangeTravelNote(note)
                                }
                            }}
                            event={item.item}
                            key={String(item.item.time)}/>}
                        scrollEnabled
                        renderSectionHeader={({section: {title}}) => {
                            return <><Text style={{
                                marginTop: 10,
                                fontSize: 20,
                                fontWeight: 'bold',
                                borderTopLeftRadius: 10,
                                padding: 10,
                                color: moment(moment.now()).startOf('day').valueOf() === moment(title, 'dddd DD.MM.YY').startOf('day').valueOf() ? 'black' : 'gray',
                                backgroundColor: 'silver'
                            }}>
                                {title}
                            </Text>
                                <AddEvent
                                    onAddButtonClick={(event) => handleAddEventButtonClick(event, props.travelNote.data.travel?.days.find(day => day.date === moment(title, 'dddd DD.MM.YY').valueOf()))}
                                    eventDay={props.travelNote.data.travel?.days.find(day => day.date === moment(title, 'dddd DD.MM.YY').valueOf())}
                                    onChangeTravelNote={props.onChangeTravelNote}/>
                            </>
                        }}
                        sections={sectionListData ?? []}/>
                </View>
            }
            <View style={{flex: 0.5, bottom: -5}}>
                <Button title={'Back'} onPress={() => {
                    props.onBackButtonClick()
                }}/>
            </View>
        </View>
    </SafeAreaView>
}
