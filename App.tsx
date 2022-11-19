import {StatusBar} from 'expo-status-bar';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import React, {useCallback, useEffect} from "react";
import {createTable} from "./app/repository/NotesRepository";
import {NotesComponent} from "./app/components/Notes/NotesComponent";

export default function App() {
    const createDB = useCallback(async () => {
        try {
            await createTable()
        } catch (e) {
            console.log(e.message)
        }
    }, [])

    useEffect(() => {
        createDB();
    }, [createDB]);

    return (
        <SafeAreaView style={styles.body}>
            <StatusBar style="auto"/>
            <View>
                <View style={{marginTop: 50}}/>
                <NotesComponent/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        margin: 0
    },
})
