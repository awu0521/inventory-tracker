import { ItemType } from "../../../src/domain/enums/ItemType";
import { ItemComponent } from "../../../src/domain/models/ItemComponent";
import { ItemContainer } from "../../../src/domain/models/ItemContainer";
import { Item } from "../../../src/domain/models/Item";
import { expect } from "chai";

describe('ItemContainer', () => {
    let itemContainer: ItemContainer;
    let component1: ItemComponent;
    let component2: ItemComponent;
    let component3: ItemComponent;

    before(() => {
        component1 = new ItemContainer('c1', 1,
            ItemType.BULK, {length: 1, width: 1, height: 1});
        component2 = new ItemContainer('c2', 2,
            ItemType.DOCUMENT, {length: 2, width: 2, height: 2});
        component3 = new Item('i1', 3,
            ItemType.FRAGILE, {length: 3, width: 3, height: 3});
    });

    beforeEach(() => {
        itemContainer = new ItemContainer('testContainer', 0,
            ItemType.BULK, {length: 0, width: 0, height: 0});
    });

    it('should add a component', () => {
        itemContainer.add(component1);
        expect(itemContainer.getComponents().length).to.eq(1);
    });

    it('should add multiple components', () => {
        itemContainer.add(component1);
        itemContainer.add(component2);
        expect(itemContainer.getComponents().length).to.eq(2);
    });
});