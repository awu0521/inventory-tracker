import { expect } from "chai";
import { parseType } from "../../src/parsers/itemTypeParser";
import { Item } from "../../src/domain/models/Item.ts"
import { ItemType } from "../../src/domain/enums/ItemType";

describe('itemTypeParser', () => {
    let item: Item;

    beforeEach(() => {
        item = new Item('testItem', 10, ItemType.BULK, {
            length: 1,
            width: 2,
            height: 3
        });
    });

    it('should default an invalid type entry to bulk', () => {
        item.setType(ItemType.FRAGILE);
        expect(item.getType()).to.eq(ItemType.FRAGILE);

        const type: ItemType = parseType("invalidType");
        item.setType(ItemType.BULK);

        expect(item.getType()).to.eq(type);
    });

    it('should trim and fix case of valid type entry', () => {
        const type: ItemType = parseType("  FRAgile  ");
        item.setType(ItemType.FRAGILE);

        expect(item.getType()).to.eq(type);
    });

    it('should set its type to fragile', () => {
        const type: ItemType = parseType("fragile");
        item.setType(ItemType.FRAGILE);

        expect(item.getType()).to.eq(type);
    });

    it('should set its type to document', () => {
        const type: ItemType = parseType("document");
        item.setType(ItemType.DOCUMENT);

        expect(item.getType()).to.eq(type);
    });

    it('should set its type to organic', () => {
        const type: ItemType = parseType("organic");
        item.setType(ItemType.ORGANIC);

        expect(item.getType()).to.eq(type);
    });
});
