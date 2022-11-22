import {Button, Text, TextInput, TouchableHighlight, View} from "react-native";
import {DatePickerComponent} from "../DatePickerComponent/DatePickerComponent";
import moment from "moment";
import CheckBox from "expo-checkbox";
import {INote, ITravelDay, ITravelEvent} from "../../models/Models";
import {useState} from "react";
import {FontAwesome5} from "@expo/vector-icons";

interface IProps {
    eventDay: ITravelDay | undefined
}

interface IActions {
    onChangeTravelNote: (note: INote) => void
    onAddButtonClick: (event: ITravelEvent) => void
}

export const AddEvent = (props: IProps & IActions) => {

    const [isAddEventOpen, setAddEventOpen] = useState<boolean>(false)
    const [newEvent, setNewEvent] = useState<ITravelEvent>({
        time: undefined,
        name: '',
        isNoTime: true,
        address: undefined
    })

    return <View>{!isAddEventOpen &&
        <View>
            <Button color={'#8cd4de'} title={'Add Event'} onPress={() => {
                setAddEventOpen(true)
            }}/>
        </View>}
        {isAddEventOpen && <View style={{
            width: '85%',
            padding: 10,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'silver',
            borderRadius: 20,
            marginTop: 20
        }}>
            <View style={{flexDirection: 'row'}}>
            {!newEvent.isNoTime && <DatePickerComponent calendarValue={moment(newEvent.time).toDate()}
                                                        placeholder={'Enter event time...'}
                                                        fontSize={20}
                                                        mode={"time"}
                                                        onCalendarChange={(time) => {
                                                            setNewEvent({...newEvent, time: moment(time).valueOf()})
                                                        }}/>}
                <TouchableHighlight style={{
                                        top: -20,
                                        right: -20,
                                        backgroundColor: 'maroon',
                                        height: 37,
                                        position: 'absolute',
                                        width: 36,
                                        borderRadius: 100}}
                                    onPress={() => {
                                        setNewEvent({
                                            time: undefined,
                                            name: '',
                                            isNoTime: false,
                                            address: undefined
                                        })
                                        setAddEventOpen(false)
                                    }}>
                    <FontAwesome5 name={'times-circle'} color={'white'} size={35}/>
                </TouchableHighlight>
            </View>
            <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 20}}>
                <CheckBox color={'#8cd4de'}
                          value={newEvent.isNoTime}
                          onValueChange={(value) => {
                                setNewEvent({...newEvent, isNoTime: value})
                          }}/>
                <Text style={{marginLeft: 10}}>No time event</Text>
            </View>
            <TextInput
                style={{marginBottom: 20}}
                onChangeText={(text) => {
                    setNewEvent({...newEvent, name: text})
                }}
                value={newEvent.name}
                placeholder={'Enter event description'}
                multiline/>
            <Button color={'#8cd4de'}
                    disabled={!newEvent.name}
                    onPress={() => {
                        setAddEventOpen(false)
                        props.onAddButtonClick(newEvent)
                        setNewEvent({
                            time: undefined,
                            name: '',
                            isNoTime: true,
                            address: undefined
                        })
                    }}
                    title={'Add event'}/>
        </View>}
    </View>
}
