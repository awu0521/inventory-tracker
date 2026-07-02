import { ItemType } from "../../../src/domain/enums/ItemType.js";
import { Item } from "../../../src/domain/models/Item.js";
import { ItemComponent } from "../../../src/domain/models/ItemComponent.js";
import { expect } from "chai";

describe('Item', () => {
    let itemComponent: ItemComponent;

    beforeEach(() => {
        itemComponent = new Item('i1', 1, ItemType.BULK,
            {length: 1, width: 1, height: 1}
        );
    });

    it('should get the total weight of itself', () => {
        expect(itemComponent.getTotalWeight()).to.eq(1);
    });
});