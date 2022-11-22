import {View, Text, TouchableHighlight} from "react-native";
import {INote} from "../../models/Models";
import moment from "moment";
import {BLUE_COLOR} from "../../utils/ColorConsts";
import CountryFlag from "react-native-country-flag";
import {FontAwesome5} from "@expo/vector-icons";
import {useState} from "react";

interface IProps {
    travelNote?: INote
}

interface IActions {
    onTravelNoteOpen: (note: INote) => void
    onDeleteTravelNote: (note: INote) => void
}

export const TravelGridItem = ({travelNote: note, onTravelNoteOpen, onDeleteTravelNote}: IProps & IActions) => {

    const  [showDeleteIcon, setShowDeleteIcon] = useState<boolean>(false)

    return <TouchableHighlight
                underlayColor={BLUE_COLOR}
                style={{
                    borderWidth: 1,
                    borderStyle: 'solid',
                    margin: 10,
                    padding: 10,
                    borderRadius: 10,
                    borderColor: 'silver'

                }}
                onLongPress={() => {setShowDeleteIcon(!showDeleteIcon)}}
                onPress={() => note && onTravelNoteOpen(note)}>
        <View>
            {showDeleteIcon && <TouchableHighlight style={{
                top: -20,
                left: -20,
                backgroundColor: 'maroon',
                height: 25,
                position: 'absolute',
                width: 24,
                borderRadius: 100}}
                                onPress={() => note ? onDeleteTravelNote(note) : false}>
                <FontAwesome5 name={'times-circle'} color={'white'} size={24}/>
            </TouchableHighlight>}
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
                {note?.data?.travel?.name}
            </Text>
            <View style={{position: 'absolute', right: 0, borderColor: 'silver', borderWidth: 1}}>
                <CountryFlag isoCode={note?.data.travel?.country ?? 'ru'}
                             size={15}/>
            </View>
            <Text style={{color: 'silver'}}>
                {`${moment(note?.data?.travel?.days[0]?.date).format('DD.MM.yyyy')} - ${moment(note?.data?.travel?.days[note?.data?.travel?.days.length - 1]?.date).format('DD.MM.yyyy')}`}
            </Text>
        </View>
    </TouchableHighlight>

}
