import {TextInput, View, Button, ScrollView} from "react-native";
import {ITodo} from "../../models/Models";
import {Todo} from "./Todo";
import {useState} from "react";

interface IProps {
    todos: ITodo[]
}

interface IActions {
    onChangeTodos: (todos: ITodo[]) => void
}

export const TodoList = (props: IProps & IActions) => {

    const [newTodo, setNewTodo] = useState<ITodo>({
        todoText: '',
        isDone: false
    })

    const handleOnChangeTodo = (todo: ITodo, idx: number) => {
        const newTodos = props.todos.map((item, index) => {
            if (index === idx) {
                return todo
            }
            return item
        })
        props.onChangeTodos(newTodos)
    }

    const handleNewTodoTextChange = (text: string) => {
        setNewTodo({...newTodo, todoText: text})
    }

    const handleAddTodo = () => {
        const newTodos = [...props.todos, newTodo]
        setNewTodo({
            todoText: '',
            isDone: false
        })
        props.onChangeTodos(newTodos)
    }

    return <View style={{width: '100%', height: '100%'}}>
        <View style={{flex: 0.75, height: '10%'}}>
            <ScrollView scrollEnabled={true}>
                {props.todos.map((item, index) =>
                    <Todo key={`${item.todoText}${index}`} todo={item}
                          onChange={(todo) => handleOnChangeTodo(todo, index)}/>)}
            </ScrollView>
        </View>
        <View style={{flex: 0.4, bottom: 10}}>
            <TextInput onChangeText={handleNewTodoTextChange}
                       style={{marginBottom: 20, marginTop: 20}}
                       value={newTodo.todoText}
                       multiline
                       placeholder={'Enter todo...'}/>
            <Button title={'Add Todo'} disabled={!newTodo.todoText} onPress={handleAddTodo}/>
        </View>
    </View>
}
