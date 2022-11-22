export interface INote {
    id: string
    data: INoteData
}

export interface INoteData {
    caption?: string
    text?: string
    editDate: number
    type: string
    color?: string
    cryptoToken?: ICryptoToken
    todos?: ITodo[],
    travel?: ITravel
}

export interface ICryptoToken {
    name: string
    deals: ICryptoTokenDeal[]
}

export interface ICryptoTokenDeal {
    price: string
    quantity: string
    date: number
}

export interface ITodo {
    todoText: string
    isDone: boolean
}

export interface ITravel {
    name?: string
    days: ITravelDay[]
    country?: string
}

export interface ITravelDay {
    date?: number
    events: ITravelEvent[]
}

export interface ITravelEvent {
    name: string
    time?: number
    isNoTime: boolean
    address?: string
}
