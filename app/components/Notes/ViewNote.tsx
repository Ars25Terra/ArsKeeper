import {FlatList, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {INote} from "../../models/Models";
import moment from "moment";
import {CryptoNote} from "../Crypto/CryptoNote/CryptoNote";
import {IModable} from "./NotesUtils";
import {BLUE_COLOR} from "../../utils/ColorConsts";
import {FontAwesome5} from "@expo/vector-icons";

interface IProps {
    note: INote
}

interface IActions {
    onClick: (note: INote) => void
}

export const ViewNote = (props: IProps & IActions & IModable): JSX.Element => {

    const style = StyleSheet.create({
        titleContainer: {
            flex: 1,
            flexDirection: 'row'
        },
        date: {
            color: 'silver',
            fontSize: 10,
            textAlign: 'right',
            textAlignVertical: 'bottom'
        },
        h1: {
            fontWeight: 'bold',
            fontSize: 21,
            flex: 1,
            flexWrap: 'wrap'
        },
        note: {
            display: 'flex',
            position: 'relative',
            background: props.note.data.color ?? '#fff',
            borderRadius: 7,
            padding: 10,
            left: 0,
            right: 0,
            margin: 4,
            float: 'left',
            borderStyle: 'dashed',
            borderColor: 'gray',
            borderWidth: 1,
            minWidth: '48%',
            flexDirection: 'column'
        }
    })

    const noteDate: string  = moment(props.note.data.editDate).format('DD.MM.yyyy HH:mm')
    return <TouchableHighlight underlayColor={BLUE_COLOR} onPress={() => props.onClick(props.note)} style={style.note}>
            <>
                {props.note.data.caption && <View style={style.titleContainer}>
                    <Text style={style.h1}>{props.note.data.caption}</Text>
                </View>}
                {props.note.data.text && !props.note.data.cryptoToken && <View style={style.titleContainer}>
                    <Text style={{flex: 1, flexWrap: 'wrap'}}>{props.note.data.text}</Text>
                </View>}
                { props.note.data.cryptoToken && <View style={{flex: 1, flexWrap: 'wrap', maxWidth: 100}}>
                    <CryptoNote cryptoNote={props.note.data.cryptoToken} mode={props.mode}/>
                </View> }
                {props.note.data.type === 'todos' && <View style={{flex: 1, flexWrap: 'wrap', maxWidth: 100}}>
                    <FlatList style={{marginTop: 10}} data={props.note.data.todos}
                              renderItem={(item) => <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                  {item.item.isDone && <FontAwesome5 name={'check-circle'} color={'gray'} size={15}/>}
                                  {!item.item.isDone && <FontAwesome5 name={'circle'} color={'gray'} size={15}/>}
                                  <Text style={{marginLeft: 5}}>{item.item.todoText}</Text>
                              </View>}/>
                </View>}
                <Text style={style.date}>{noteDate}</Text>
            </>
        </TouchableHighlight>
}



