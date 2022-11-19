import {Button, SafeAreaView, Text, TextInput, View} from "react-native";
import {ICryptoToken, ICryptoTokenDeal} from "../../../models/Models";
import moment from "moment";
import {useState} from "react";
import {sortCryptoDeals} from "../../../utils/Utils";
import {CryptoPL} from "./CryptoPL";
import {ENoteMode, IModable} from "../../Notes/NotesUtils";

const CryptoNoteDeal = (deal: ICryptoTokenDeal) => {
    return <View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text>{deal.quantity}</Text>
            <Text> x </Text>
            <Text style={{fontWeight: 'bold'}}>{deal.price}$</Text>
            <Text> - </Text>
            <Text style={{color: 'silver'}}>{moment(deal.date).format('DD.MM.yyyy HH:mm')}</Text>
        </View>

    </View>
}

interface IProps {
    cryptoNote: ICryptoToken
    tokenPrice?: string
}

interface IActions {
    onChangeDeal?: (deal: ICryptoTokenDeal) => void
}

const currDeal: ICryptoTokenDeal = {
    price: '',
    date: moment.now(),
    quantity: ''
}

export const CryptoNote = ({cryptoNote, tokenPrice, mode, onChangeDeal}: IProps & IActions & IModable) => {

    const [deal, setDeal] = useState<ICryptoTokenDeal>(currDeal)

    const handleChangeDealPrice = (price: string) => {
        setDeal({...deal, price: price})
    }

    const handleChangeDealQuantity = (qty: string) => {
        setDeal({...deal, quantity: qty})
    }

    return <SafeAreaView style={{width: '100%', height: '100%'}}>
        <View style={{flex: 1}}>
            <CryptoPL mode={mode} cryptoNote={cryptoNote} currentTokenPrice={tokenPrice}/>
            {mode === ENoteMode.EDIT && cryptoNote.deals
                .sort((a,b) => sortCryptoDeals(a, b))
                .map((deal, index) => <CryptoNoteDeal key={`${deal.date + index}`}
                                                                   price={deal.price}
                                                                   quantity={deal.quantity}
                                                                   date={deal.date}/>)}
        </View>
        {mode === ENoteMode.EDIT && <View style={{flex: 0.4}}>
            <TextInput keyboardType={'numeric'}
                       placeholder={'Enter price in USD...'}
                       value={deal.price}
                       onChangeText={handleChangeDealPrice}/>
            <TextInput keyboardType={'numeric'}
                       placeholder={'Enter quantity...'}
                       value={deal.quantity}
                       onChangeText={handleChangeDealQuantity}/>
            <Button disabled={!deal.price || !deal.quantity}
                    title={'Add Trade'}
                    onPress={(_) => {
                        onChangeDeal && onChangeDeal(deal)
                        setDeal({...deal, price: '', quantity: ''})
                    }}/>
        </View>}

    </SafeAreaView>
}
