import AsyncStorage from "@react-native-async-storage/async-storage"
import {WATCH_CRYPTO} from "./Consts";

/**
 * Store Value
 */
export async function putInStorage(key: string, value: any) {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.error(e)
    }
}

/**
 * Get Value by key from Storage
 */
export async function getFromStorage(key: string): Promise<string | null> {
    try {
        return await AsyncStorage.getItem(key)
    } catch (e) {
        console.error(e)
    }
    return null
}

/**
 * Store array in storage
 */
export function putArrayInStorage(key: string, array: string[]) {
    const stringArray: string = JSON.stringify(array)
    putInStorage(key, stringArray)
}

/**
 * Get stored watched crypto tokens names
 */
export async function getWatchedCryptoList(): Promise<string | null> {
    return getFromStorage(WATCH_CRYPTO)
}

