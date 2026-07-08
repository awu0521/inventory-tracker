import { ItemType } from "../domain/enums/ItemType";
import { Item } from "../domain/models/Item";
import { ItemComponent } from "../domain/models/ItemComponent";
import { ItemContainer } from "../domain/models/ItemContainer";
import { Dimensions } from "../domain/types/Dimensions";
import { ItemComponentJSON } from "../domain/types/ItemComponentJSON";
import { parseType } from "./itemTypeParser";

// converts JSON into an ItemComponent object with the specified attributes.
export function parseComponent(parsed: ItemComponentJSON): ItemComponent {

    console.log("parsed object:", parsed);
    console.log("parsed.type:", parsed.type);
    console.log("keys:", Object.keys(parsed));

    let name: string = '';
    let weight: number = 0;
    let type: ItemType = ItemType.BULK;
    let dimensions: Dimensions = {length: 0, width: 0, height: 0};
    let desc: string = '';

    name = parsed.name;
    weight = parsed.weight;
    type = parseType(parsed.type);
    dimensions = parsed.dimensions;
    desc = parsed.desc;

    // TODO: convert contents of ItemComponent JSON data into item components inside of ItemComponent
    // if (parsed.contents) parse item recursively (in case item is item container).

    // if parsed.contents.length === 0, return new Item(name, weight, type, dimensions, desc);
    // else call recursively and return that object.

    if (parsed.contents.length === 0) return new Item(name, weight, type, dimensions, desc);

    let itemContainer: ItemContainer = new ItemContainer(name, weight, type, dimensions, desc);

    // checks all item component JSON inside contents and recursively forms item components to add.
    for (const component of parsed.contents) {
        let itemComponent: ItemComponent = parseComponent(component);
        itemContainer.add(itemComponent);
    }

    return itemContainer as ItemComponent;
}