import {View, Text, TouchableOpacity, TextInput, StyleSheet} from "react-native";
import {Badge} from "@react-native-material/core";
import React, {useEffect, useState} from "react";
import BinanceService from "../../../services/BinanceService";

interface ITokenPriceProps {
    /**
     * Token symbol
     */
    symbol: string
}

interface ITokenPriceActions {
    /**
     * Change name of token
     */
    onChangeToken?: (token: string) => void
    /**
     * Remove token
     */
    onRemoveToken: () => void
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

    const [token, setToken] = useState(props.symbol)

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
            onBlur={() => {
                toggleEditMode()
            }}
            onPress={props.onChangeToken && toggleEditMode}>
            <View style={styles.panelContainer}>
                <Text style={{color: 'white', fontSize: 12}}>{`${props.symbol.toUpperCase()}: `}</Text>
                {price && <Text style={{color: 'white', fontSize: 12}}>{`${price}$`}</Text>}
                {price && priceIcon()}
            </View>
        </TouchableOpacity>
        : <View style={styles.editModeView}>
            <View style={styles.editModeContainer}>
                <TextInput style={styles.input}
                           onBlur={(_) => {
                               toggleEditMode()
                               props.onChangeToken && props.onChangeToken(token)
                           }}
                           onEndEditing={toggleEditMode}
                           onChangeText={(text) => {
                               setToken(text)
                               setPrice('')
                           }
                           }
                           value={token}/>
            </View>
            <TouchableOpacity onPress={() => {
                props.onRemoveToken()
                toggleEditMode()
            }
            }>
                <Badge style={styles.deleteButton} label="X" color="error"/>
            </TouchableOpacity>
        </View>
}

const styles = StyleSheet.create({
    editModeView: {
        flexDirection: 'row'
    },
    deleteButton: {
        width: 25,
        height: 25,
        padding: 1,
        position: 'absolute',
        top: -5,
        left: -20
    },
    panelContainer: {
        flexDirection: 'row'
    },
    editModeContainer: {
        margin: 5
    },
    viewModeContainer: {
        margin: 5,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        height: 40,
        borderRadius: 8,
        padding: 5
    },
    input: {
        width: 100,
        height: 40,
        padding: 10,
        color: 'white',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 8,
        backgroundColor: '#566573',
    },
});

export default TokenPrice
