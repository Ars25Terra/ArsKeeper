import {View, Text} from "react-native";
import {ITodo} from "../../models/Models";
import CheckBox from "expo-checkbox";
import {BLUE_COLOR} from "../../utils/ColorConsts";

interface IProps {
    todo: ITodo
}

interface IActions {
    onChange: (todo: ITodo) => void
}

export const Todo = (props: IProps & IActions) => {

    const handleOnChange = (value: boolean) => {
        const newTodo = {...props.todo, isDone: value}
        props.onChange(newTodo)
    }

    return <View style={{display: 'flex', flexDirection: 'row', margin: 10, width: '80%', alignItems: 'center'}}>
        <CheckBox color={BLUE_COLOR} value={props.todo.isDone} onValueChange={handleOnChange}/>
        <Text style={{
            marginLeft: 15,
            fontWeight: props.todo.isDone ? 'normal' : 'bold',
            color: props.todo.isDone ? 'gray' : 'black',
            fontSize: 18,
            flexWrap: 'wrap'
        }}>{props.todo.todoText}</Text>
    </View>
}
