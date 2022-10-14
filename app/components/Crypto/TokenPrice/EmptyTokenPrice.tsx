import {StyleSheet, Text, TouchableOpacity} from "react-native";

interface IEmptyTokenPriceProps {

}

interface IEmptyTokenPriceActions {
    onPress: () => void
}

const EmptyTokenPrice = (props: IEmptyTokenPriceProps & IEmptyTokenPriceActions): JSX.Element => {
    return <TouchableOpacity onPress={props.onPress} style={styles.container}>
        <Text>+</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#566573',
        flexWrap: 'wrap',
        height: 40,
        borderStyle: 'dashed',
        borderColor: 'silver',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        width: 85
    }
})

export default EmptyTokenPrice