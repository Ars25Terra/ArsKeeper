import {GestureHandlerRootView, Swipeable} from "react-native-gesture-handler";
import React, {useState} from "react";
import {View, TouchableHighlight} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import {BLUE_COLOR} from "../../utils/ColorConsts";

interface IProps {
    pages: JSX.Element[]
}

export const Swiper = (props: IProps) => {

    const [index, setIndex] = useState(0)

    const SwiperPage = ({index} : {index: number}) => {
        return props.pages[index]
    }

    return <GestureHandlerRootView style={{width: '100%', height: '100%'}}>
        <View style={{flexDirection: 'row', width: '100%', height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {props.pages.map((page, idx) => {
                return <TouchableHighlight key={idx}
                                           underlayColor={BLUE_COLOR}
                                           style={{marginLeft: 20,
                                               backgroundColor: idx === index ? BLUE_COLOR : 'transparent',
                                               borderWidth: 0,
                                               borderRadius: 100}}
                                           onPress={() => {setIndex(idx)}}>
                        <FontAwesome5
                                     style={{backgroundColor: idx === index ? BLUE_COLOR : 'transparent',
                                             borderWidth: 0,
                                             borderRadius: 100}}
                                     color={'black'}
                                     name={'circle'} size={16}/>
                </TouchableHighlight>
            })}
        </View>
        <Swipeable key={Math.random()} containerStyle={{flex: 1}}
                   onSwipeableWillOpen={direction => {
                       if (direction === 'right') {
                           setIndex(index+1)
                       } else {
                           setIndex(index-1)
                       }
                   }}
                   renderRightActions={() => props.pages[index+1] ? <SwiperPage index={index+1}/> : undefined}
                   renderLeftActions={() => props.pages[index-1] ? <SwiperPage index={index-1}/> : undefined}
        >
            {props.pages[index]}
        </Swipeable>
    </GestureHandlerRootView>
}
