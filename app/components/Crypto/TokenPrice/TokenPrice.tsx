import {View, Text, TouchableOpacity, TextInput, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import BinanceService from "../../../services/BinanceService";

interface ITokenPriceProps {
    symbol: string
}

interface ITokenPriceActions {
    onChangeToken?: (token: string) => void
}

/**
 * Component to display crypto token price
 */
const TokenPrice = (props: ITokenPriceProps & ITokenPriceActions) => {
    /**
     * Current Token Price State
     */
    const [price, setPrice] = useState<string>('0.00')
    /**
     * The price state of Token at the beginning of the day
     */
    const [oldPrice, setOldPrice] = useState<string>('')
    /**
     * Edit Mode State
     */
    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    const startTime = new Date()
    startTime.setHours(0, 0, 0, 0)
    const endTime = new Date()
    endTime.setHours(1, 0, 0, 0)

    useEffect(() => {
        if (props.symbol) {
            BinanceService.getPriceBySymbolOnDate(props.symbol, startTime, endTime).then(value => setOldPrice(value))
        }
    }, [props.symbol])


    useEffect(() => {
        if (props.symbol) {
            const intervalId = setInterval(() => {
                BinanceService.getPriceBySymbol(props.symbol).then(value => setPrice(value))
            }, 2000)
            return () => clearInterval(intervalId)
        }
    }, [props.symbol])

    /**
     * Icon for up or down arrow
     */
    const priceIcon = () => (parseFloat(price) > parseFloat(oldPrice ?? '0')
        ? <Text style={{color: 'limegreen', paddingLeft: 5, fontSize: 12}}>ᐃ</Text>
        : <Text style={{color: 'red', paddingLeft: 5, fontSize: 12}}>ᐁ</Text>)

    /**
     * Toggle Edit Mode
     */
    const toggleEditMode = () => {
        setIsEditMode(!isEditMode)
    }

    return !isEditMode
        ? <TouchableOpacity
            style={styles.viewModeContainer}
            onPress={props.onChangeToken && toggleEditMode}>
            <View style={styles.panelContainer}>
                <Text style={{color: 'white', fontSize: 12}}>{`${props.symbol.toUpperCase()}: `}</Text>
                {price && <Text style={{color: 'white', fontSize: 12}}>{`${price}$`}</Text>}
                {price && priceIcon()}
            </View>
        </TouchableOpacity>
        : <View style={styles.editModeContainer}>
            <TextInput style={styles.input}
                onBlur={(_) => toggleEditMode()}
                onEndEditing={toggleEditMode}
                onChangeText={(text) => {
                    setPrice('')
                    props.onChangeToken && props.onChangeToken(text)}
            }
                value={props.symbol}/>
        </View>
}

const styles = StyleSheet.create({
    panelContainer : {
        flexDirection: 'row'
    },
    editModeContainer: {
        margin: 5,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 8
    },
    viewModeContainer: {
        margin: 5,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        height: 40,
        borderRadius: 8,
        padding: 10
    },
    input: {
        width: 100,
        height: 40,
        padding: 10,
        margin: 1,
        color: 'white',
        borderWidth: 1,
        borderRadius: 8
    },
});

export default TokenPrice