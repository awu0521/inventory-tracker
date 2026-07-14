import { ItemType } from "../domain/enums/ItemType";
import { InvalidComponentError } from "../domain/errors/InvalidComponentError";
import { Item } from "../domain/models/Item";
import { ItemComponent } from "../domain/models/ItemComponent";
import { ItemContainer } from "../domain/models/ItemContainer";
import { Dimensions } from "../domain/types/Dimensions";
import { ItemComponentJSON } from "../domain/types/ItemComponentJSON";
import { parseType } from "./itemTypeParser";

// converts JSON into an ItemComponent object with the specified attributes.
export function parseComponent(body: any): ItemComponent {

    if (!isItemComponentJSON(body)) throw new InvalidComponentError("Not valid Item Component JSON");

    const parsed: ItemComponentJSON = body as ItemComponentJSON;

    let name: string = parsed.name;
    let weight: number = parsed.weight;
    let type: ItemType = parseType(parsed.type);
    let dimensions: Dimensions = parsed.dimensions;
    let desc: string = parsed.desc;

    // if parsed.contents.length === 0, return new Item(name, weight, type, dimensions, desc);
    // else call recursively and return that object.
    if (parsed.contents.length === 0) return new Item(name, weight, type, dimensions, desc);

    let itemContainer: ItemContainer = new ItemContainer(name, weight, type, dimensions, desc);

    for (const component of parsed.contents) {
        let itemComponent: ItemComponent = parseComponent(component);
        itemContainer.add(itemComponent);
    }

    return itemContainer as ItemComponent;
}

function isItemComponentJSON(body: any): boolean {
    return body &&
        typeof body.name === "string" &&
        Array.isArray(body.contents) &&
        typeof body.weight === "number" &&
        typeof body.type === "string" &&
        typeof body.dimensions.length === "number" &&
        typeof body.dimensions.width === "number" &&
        typeof body.dimensions.height === "number" &&
        typeof body.desc === "string";
}