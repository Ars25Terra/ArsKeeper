import {ICryptoTokenDeal, INote, ITodo} from "../../models/Models";
import {SafeAreaView, TextInput, View, Text, KeyboardAvoidingView} from "react-native";
import {CryptoNote} from "../Crypto/CryptoNote/CryptoNote";
import React, {useEffect, useRef, useState} from "react";
import binanceService from "../../services/BinanceService";
import {IModable} from "./NotesUtils";
import {IconButton} from "../IconButton/IconButton";
import {BLUE_COLOR} from "../../utils/ColorConsts";
import {TodoList} from "./TodoList";
import {createNote, editNote} from "../../services/NoteService";

interface IProps {
    note: INote
}

interface IAction {
    onBackButtonClick: () => void
    onChangeNote: (note: INote) => void
    onDeleteNote: (note: INote) => void
}

/**
 * Edit Note Component
 */
export const EditNote = ({note, mode, onBackButtonClick, onChangeNote, onDeleteNote}: IProps & IAction & IModable) => {

    const [tokenPrice, setTokenPrice] = useState('0.00')
    const captionElement = useRef<TextInput>(null)
    const [captionPlaceHolderText, setCaptionPlaceHolderText] = useState<string>('Enter caption...')

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (note.data?.cryptoToken) {
                binanceService.getPriceBySymbol(note.data?.cryptoToken?.name?.replace('$', ''))
                    .then(value => setTokenPrice(value))
            }
        }, 2000)
        return () => clearInterval(intervalId)
    }, [note])

    const handleChangeCaption = (caption: string) => {
        onChangeNote({...note, data: {...note.data, caption: caption}})
    }

    const handleChangeText = (text: string) => {
        onChangeNote({...note, data: {...note.data, text: text}})
    }

    const handleChangeCryptoDeal = (deal: ICryptoTokenDeal) => {
        if (note.data.cryptoToken) {
            const newNote = {
                ...note,
                data: {
                    ...note.data,
                    cryptoToken: {
                        ...note.data.cryptoToken,
                        deals: [...note.data.cryptoToken.deals, deal]
                    }
                }
            }
            onChangeNote(newNote)
        }
    }

    const handleOnNoteIconClick = () => {
        setCaptionPlaceHolderText('Enter caption...')
        createNote().then(note => {
            const newNote = {...note, data: {...note.data, type: 'note', caption: '', text: '', cryptoToken: undefined}}
            editNote(newNote)
            onChangeNote(newNote)
        })
    }

    const handleOnCryptoIconClick = () => {
        if (!note.data.caption) {
            captionElement.current?.focus()
            setCaptionPlaceHolderText('Enter token (starting with $)...')
            return
        }
        setCaptionPlaceHolderText('Enter caption...')
        onChangeNote({...note, data: {...note.data, text: `${note.data.caption} `}})
    }

    const handleTodoIconClick = () => {
        createNote().then(note => {
            const newNote = {...note, data: {...note.data, todos: [], text: '', type: 'todos'}}
            editNote(newNote)
            onChangeNote(newNote)
        })
        setCaptionPlaceHolderText('Enter caption...')
    }

    const handleOnChangeTodos = (todos: ITodo[]) => {
        const newNote = {...note, data: {...note.data, todos: todos}}
        onChangeNote(newNote)
    }

    return <SafeAreaView style={{width: '100%', height: '100%'}}>
        <View style={{padding: 20, flex: 0.75}}>
            <View style={{margin: 10}}>
                {note.data.type != 'crypto' && <TextInput placeholder={captionPlaceHolderText}
                                                          value={note.data.caption}
                                                          ref={captionElement}
                                                          style={{fontSize: 20}}
                                                          maxLength={40}
                                                          onChangeText={handleChangeCaption}/>}
                {note.data.type === 'crypto' &&
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{note.data.caption}</Text>}
            </View>
            {
                note.data.type === 'note' && <View style={{margin: 10}}>
                    <TextInput placeholder={'Enter your text...'}
                               value={note.data.text}
                               multiline
                               scrollEnabled={true}
                               style={{maxHeight: 500, textAlignVertical: 'top', fontSize: 18}}
                               onChangeText={handleChangeText}/>
                </View>
            }
            {
                note.data.cryptoToken && <View style={{margin: 10}}>
                    <CryptoNote cryptoNote={note.data.cryptoToken}
                                mode={mode}
                                tokenPrice={tokenPrice}
                                onChangeDeal={handleChangeCryptoDeal}/>
                </View>
            }
            {
                note.data.type === 'todos' && <View style={{margin: 10}}>
                    <TodoList todos={note.data.todos ?? []} onChangeTodos={handleOnChangeTodos}/>
                </View>
            }
        </View>
        <KeyboardAvoidingView
            style={{
                display: 'flex',
                flex: 0.3,
                flexDirection: 'row',
                bottom: 0,
                justifyContent: 'center',
                width: '100%'
            }}
            behavior={'height'}
            keyboardVerticalOffset={0}>
            <IconButton name={'arrow-left'}
                        size={30}
                        backgroundColor={'gray'}
                        color={'white'}
                        onPress={onBackButtonClick}/>
            <IconButton name={'sticky-note'}
                        size={30}
                        disabled={note.data.type === 'note'}
                        backgroundColor={note.data.type === 'note' ? BLUE_COLOR : 'gray'}
                        onPress={handleOnNoteIconClick}
                        color={'white'}
            />
            <IconButton name={'btc'}
                        size={30}
                        disabled={note.data.type === 'crypto'}
                        backgroundColor={note.data.type === 'crypto' ? BLUE_COLOR : 'gray'}
                        onPress={handleOnCryptoIconClick}
                        color={'white'}
            />
            <IconButton name={'list-ol'}
                        size={30}
                        disabled={note.data.type === 'todos'}
                        backgroundColor={note.data.type === 'todos' ? BLUE_COLOR : 'gray'}
                        onPress={handleTodoIconClick}
                        color={'white'}
            />
            <IconButton name={'trash-alt'}
                        size={30}
                        backgroundColor={'gray'}
                        color={'white'}
                        onPress={() => {
                            onDeleteNote(note)
                        }}
            />
        </KeyboardAvoidingView>
    </SafeAreaView>
}
