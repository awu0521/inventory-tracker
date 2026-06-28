import { ItemType } from "../../../src/domain/enums/ItemType";
import { Item } from "../../../src/domain/models/Item";
import { ItemComponent } from "../../../src/domain/models/ItemComponent";
import { expect } from "chai";

describe('ItemComponent', () => {
    let itemComponent: ItemComponent;

    beforeEach(() => {
        itemComponent = new Item('i1', 1, ItemType.BULK,
            {length: 1, width: 1, height: 1}
        );
    });

    it('should be instantiated with its specified attributes', () => {
        expect(itemComponent.getName()).to.eq('i1');
        expect(itemComponent.getType()).to.eq(ItemType.BULK);
        expect(itemComponent.getDimensions()).to.deep.eq({
            length: 1, width: 1, height: 1});
        expect(itemComponent.getDesc()).to.eq("No description provided.");
    });

    it('should get the total weight of itself', () => {
        expect(itemComponent.getTotalWeight()).to.eq(1);
    });
});