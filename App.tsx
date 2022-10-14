import {StatusBar} from 'expo-status-bar';
import {StyleSheet, SafeAreaView, Platform} from 'react-native';
import MainCryptoScreen from "./app/components/Crypto/MainCryptoScreen/MainCryptoScreen";
import {getWatchedCryptoList, putArrayInStorage} from "./app/utils/StorageUtils";
import {WATCH_CRYPTO} from "./app/utils/Consts";
import {useState} from "react";

export default function App() {

    /**
     * Flag that the app is loaded for the first time or force refreshed
     */
    const [firstLoad, setFirstLoad] = useState<boolean>(true)
    /**
     * State of Watched Crypto Tokens
     */
    const [tokens, setTokens] = useState(['BTC', 'ETH', 'SOL', 'TWT'])

    /**
     * Update stored and current watched crypto tokens list
     */
    const onUpdateTokenNamesList = (list: string[]) => {
        putArrayInStorage(WATCH_CRYPTO, list)
        setTokens(list)
    }

    /**
     * If loaded first time - read stored crypto tokens names to display
     */
    if (firstLoad) {
        setFirstLoad(false)
        getWatchedCryptoList().then(res => {
            if (res) {
                setTokens(JSON.parse(res))
            }
        })
    }

    return (
        <SafeAreaView style={styles.body}>
            <StatusBar style="auto"/>
            <MainCryptoScreen tokenNamesList={tokens}
                              onUpdateTokenNamesList={onUpdateTokenNamesList}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        color: 'red',
        alignItems: 'baseline',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#36454f',
        ...Platform.select({
            web: {
                fontFamily: 'Georgia, serif'
            },
            android: {
                fontFamily: 'Roboto',
                fontWeight: 'bold'
            },
            ios: {

            }
        }),

    },
})
