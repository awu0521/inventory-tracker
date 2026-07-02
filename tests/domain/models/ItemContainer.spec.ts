import { ItemType } from "../../../src/domain/enums/ItemType.js";
import { ItemComponent } from "../../../src/domain/models/ItemComponent.js";
import { ItemContainer } from "../../../src/domain/models/ItemContainer.js";
import { expect } from "chai";

describe('ItemContainer', () => {
    let itemContainer: ItemContainer;
    let component1: ItemComponent;
    let component2: ItemComponent;

    before(() => {
        component1 = new ItemContainer('c1', 1,
            ItemType.BULK, {length: 1, width: 1, height: 1});
        component2 = new ItemContainer('c2', 2,
            ItemType.DOCUMENT, {length: 2, width: 2, height: 2});
    });

    beforeEach(() => {
        itemContainer = new ItemContainer('testContainer', 5,
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

    it('should not add duplicate components', () => {
        try {
            itemContainer.add(component1);
            expect(itemContainer.getComponents().length).to.eq(1);
        } catch (e) {
            expect.fail('Should not have thrown.');
        }

        try {
            itemContainer.add(component1);
            expect.fail('Should have thrown.');
        } catch (e) {
            expect(itemContainer.getComponents().length).to.eq(1);
        }
    });

    it('should remove a component', () => {
        try {
            itemContainer.add(component1);
            expect(itemContainer.getComponents().length).to.eq(1);
            itemContainer.remove(component1);
            expect(itemContainer.getComponents().length).to.eq(0);
        } catch (e) {
            expect.fail('Should not have thrown.');
        }
    });

    it('should remove multiple components', () => {
        try {
            itemContainer.add(component1);
            itemContainer.add(component2);
            expect(itemContainer.getComponents().length).to.eq(2);
            itemContainer.remove(component1);
            expect(itemContainer.getComponents().length).to.eq(1);
            itemContainer.remove(component2);
            expect(itemContainer.getComponents().length).to.eq(0);
        } catch (e) {
            expect.fail('Should not have thrown.');
        }
    });

    it('should not remove a non-existing component', () => {
        try {
            itemContainer.add(component1);
            expect(itemContainer.getComponents().length).to.eq(1);
            itemContainer.remove(component2);
            expect.fail('Should have thrown.');
        } catch (e) {
            expect(itemContainer.getComponents().length).to.eq(1);
        }
    });

    it('should get the weight of itself', () => {
        expect(itemContainer.getTotalWeight()).to.eq(5);
    });

    it('should get the weight of itself and its components', () => {
        itemContainer.add(component1);
        itemContainer.add(component2);
        expect(itemContainer.getTotalWeight()).to.eq(8);
    });
});