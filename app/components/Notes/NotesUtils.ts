export enum ENoteMode {
    VIEW,
    EDIT
}

export interface IModable {
    mode: ENoteMode
}
