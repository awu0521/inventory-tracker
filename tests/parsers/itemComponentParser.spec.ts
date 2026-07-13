import { testItem1, testItem2 } from "../fixtures/items";
import { parseComponent } from "../../src/parsers/itemComponentParser";
import { Item } from "../../src/domain/models/Item";
import { expect } from "chai";
import { ItemComponent } from "../../src/domain/models/ItemComponent";
import { testContainer1, testContainer2 } from "../fixtures/itemContainers";
import { ItemContainer } from "../../src/domain/models/ItemContainer";
import { parseType } from "../../src/parsers/itemTypeParser";

describe('itemComponentParser', () => {

    it('should parse correct Item JSON ', () => {
        const item: Item = parseComponent(testItem1);

        expect(item.getName()).to.eq(testItem1.name);
        expect(item.getTotalWeight()).to.eq(testItem1.weight);
        expect(item.getType()).to.eq(parseType(testItem1.type));
        expect(item.getDimensions()).to.eq(testItem1.dimensions);
        expect(item.getDesc()).to.eq(testItem1.desc);
    });

    it('should parse correct ItemContainer JSON with one Item in contents', () => {
        const itemContainer: ItemComponent = parseComponent(testContainer1);

        expect(itemContainer.getName()).to.eq(testContainer1.name);
        expect((itemContainer as ItemContainer).getComponents()).to.deep.eq([parseComponent(testItem2)]);
        // testContainer has testItem2 in it
        expect(itemContainer.getTotalWeight()).to.eq(testContainer1.weight + testItem2.weight);
        expect(itemContainer.getType()).to.eq(parseType(testContainer1.type));
        expect(itemContainer.getDimensions()).to.eq(testContainer1.dimensions);
        expect(itemContainer.getDesc()).to.eq(testContainer1.desc);
    });

    // test for ItemContainer with two Items from ItemComponentJSON
    it('should parse correct ItemContainer JSON with two Items in contents', () => {
        const itemContainer: ItemComponent = parseComponent(testContainer2);

        expect(itemContainer.getName()).to.eq(testContainer2.name);
        expect((itemContainer as ItemContainer).getComponents()).to.deep.eq([parseComponent(testItem1), parseComponent(testItem2)]);
        // testContainer has testItem2 in it
        expect(itemContainer.getTotalWeight()).to.eq(testContainer2.weight + testItem1.weight + testItem2.weight);
        expect(itemContainer.getType()).to.eq(parseType(testContainer2.type));
        expect(itemContainer.getDimensions()).to.eq(testContainer2.dimensions);
        expect(itemContainer.getDesc()).to.eq(testContainer2.desc);
    });

});
