import {StyleSheet, TextInput, View} from "react-native";
import {MaskedTextInput} from "react-native-mask-text";
import {useRef, useState} from "react";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface IProps {
    calendarValue?: Date | undefined
    minimumDate?: Date
    mode?: "date" | "time" | "datetime"
    placeholder?: string
    fontSize?: number
}

interface IActions {
    onCalendarChange: (date: Date) => void
}

export const DatePickerComponent = (props: IProps & IActions) => {

    const styles = StyleSheet.create({
        textInput: {
            fontSize: props.fontSize
        }
    })

    const [isOpen, setOpen] = useState<boolean>(false)
    const [_, setDate] = useState<Date | undefined>(props.calendarValue)
    const inputTextRef = useRef<TextInput>(null)
    const [textInputDate, setTextInputDate] = useState('')
    const [textInputTime, setTextInputTime] = useState<Date | undefined>(props.calendarValue)

    return <View style={{display: 'flex', justifyContent:'space-between', flexDirection: 'row', width: '100%'}}>
        <View style={{alignSelf: 'flex-start', display: 'flex'}}>
            {isOpen && <DateTimePickerModal
                isVisible={isOpen}
                mode={props.mode}
                onConfirm={(date) => {
                    switch (props.mode) {
                        case 'date':
                            setOpen(false)
                            setDate(date)
                            setTextInputDate(moment(date).format('DD.MM.yyyy'))
                            props.onCalendarChange(date)
                            break
                        case 'time':
                            setOpen(false)
                            setTextInputTime(date)
                            props.onCalendarChange(date)
                            break
                    }
                }}
                minimumDate={props.minimumDate}
                date={props.calendarValue}
                onCancel={() => {
                    setOpen(false)
                }}/>}
            {(props.mode === 'date' || props.mode === 'datetime')
                && <MaskedTextInput
                             style={styles.textInput}
                             onFocus={() => { setOpen(true) }}
                             onBlur={() => {
                                     setOpen(false)
                                     props.onCalendarChange(moment(textInputDate, 'DD.MM.yyyy').toDate())
                             }}
                             keyboardType={'numeric'}
                             placeholder={props.placeholder}
                             mask={'99.99.9999'}
                             ref={inputTextRef}
                             onChangeText={(text) => {
                                 setTextInputDate(text)
                             }}
                             value={props.calendarValue ? moment(props.calendarValue).format('DD.MM.yyyy') : undefined}/>}
            {props.mode === 'time' && <TextInput value={moment(props.calendarValue).format('HH:mm')}
                                                       style={styles.textInput}
                                                       onFocus={() => { setOpen(true) }}
                                                       onBlur={() => {
                                                           setOpen(false)
                                                           if (textInputTime) {
                                                               props.onCalendarChange(textInputTime)
                                                           }
                                                       }}
                                                       onChangeText={() => {}}/>}
        </View>
    </View>
}


