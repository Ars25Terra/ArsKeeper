import {View, StyleSheet, Text} from "react-native";
import {useState} from "react";
import TokenPrice from "../TokenPrice/TokenPrice";

interface IMainCryptoScreenProps {
    /**
     * List of watched crypto token names to display
     */
    tokenNamesList: string[]
}

interface IMainCryptoScreenActions {
    /**
     * Call-back to update list of watched crypto token names to display
     */
    onUpdateTokenNamesList: (list: string[]) => void
}

/**
 * Main Screen for Crypto Section
 */
const MainCryptoScreen = (props: IMainCryptoScreenProps & IMainCryptoScreenActions): JSX.Element => {
    /**
     * Watched crypto tokens state
     */
    const [tokens, setTokens] = useState<string[]>(props.tokenNamesList)

    /**
     * Handling of changing token to watch
     */
    const onChangeToken = (token: string, index: number) => {
        let arr: string[] = tokens.slice()
        arr[index] = token
        setTokens(arr.slice())
        props.onUpdateTokenNamesList(arr)
    }

    return <View style={styles.container}>
        <Text style={styles.title}>Watching Crypto:</Text>
        <View style={styles.body}>
            {props.tokenNamesList.map((token, index) => {
                return <TokenPrice key={index}
                                   symbol={token}
                                   onChangeToken={(token) => onChangeToken(token, index)}/>
            })}
        </View></View>
}

const styles = StyleSheet.create({
    title: {
        marginBottom: 20,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#26D07C',
        textShadowColor: 'black',
        textShadowRadius: 20
    },
    container: {
        flex: 1,
        top: 50,
        flexDirection: 'column',
        alignItems: 'center',
    },
    body: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
})

export default MainCryptoScreen