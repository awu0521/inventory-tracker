export interface ItemComponentJSON {
    name: string,
    contents: Array<ItemComponentJSON>,
    weight: number,
    type: string,
    dimensions: {
        length: number,
        width: number,
        height: number},
    desc: string
}