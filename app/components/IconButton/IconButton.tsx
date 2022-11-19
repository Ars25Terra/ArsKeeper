import {FontAwesome5} from "@expo/vector-icons";
import {TouchableHighlight, View} from "react-native";
import React from "react";
import {BLUE_COLOR} from "../../utils/ColorConsts";

interface IProps {
    name: string
    size: number
    color: string
    backgroundColor: string
    disabled?: boolean
}

interface IActions {
    onPress?: () => void
}

export const IconButton = (props: IProps & IActions) => {
    return  <View >
        <TouchableHighlight underlayColor={BLUE_COLOR}
                            style={{ backgroundColor: props.backgroundColor,
                                     width: 78,
                                     height: 105,
                                     alignItems: 'center',
                                     borderRadius: 0,
                                     justifyContent: 'center' }}
                            disabled={props.disabled}
                            onPress={props.onPress}>
            <FontAwesome5 {...props}/>
        </TouchableHighlight>
    </View>
}
