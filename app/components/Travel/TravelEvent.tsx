import {View, Text, TextInput, TouchableHighlight} from "react-native";
import {ITravelEvent} from "../../models/Models";
import moment from "moment";
import {FontAwesome5} from "@expo/vector-icons";
import {BLUE_COLOR} from "../../utils/ColorConsts";

interface IProps {
    event: ITravelEvent
}

interface IActions {
    onChangeEvent: (event: ITravelEvent) => void
    onDeleteEvent: (event: ITravelEvent) => void
}

export const TravelEvent = (props: IProps & IActions) => {
    return <>
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            marginLeft: 20,
            paddingTop: 5,
            paddingBottom: 2,
            borderStyle: 'dashed',
            borderColor: 'silver',
            borderBottomWidth: 1,
            alignItems: 'center'
        }}>

            <View style={{flexDirection: 'row'}}>
            {!props.event.isNoTime && <Text style={{fontSize: 16, marginRight: 20, alignSelf: 'flex-start', marginTop: 22}}>
                {`${moment(props.event.time).format('HH:mm')}`}
            </Text>}
            <TextInput style={{fontSize: 16, flex: 0.8, marginTop: 20, marginBottom: 20}}
                       multiline
                       onChangeText={(text) => {
                           const event = {...props.event, name: text}
                           props.onChangeEvent(event)}
            }>
                {props.event.name}
            </TextInput>
            <View style={{flex: 0.35}}>
                <TouchableHighlight underlayColor={BLUE_COLOR}
                                style={{
                                        alignSelf: 'flex-start',
                                        position: 'absolute',
                                        top: 25,
                                        right: 40
                                }}
                                onPress={() => { props.onDeleteEvent(props.event)}}>
                 <FontAwesome5 name={'trash-alt'} color={'silver'} size={20}/>
            </TouchableHighlight>
            </View>
            </View>
        </View>
    </>
}
