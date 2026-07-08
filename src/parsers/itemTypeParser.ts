import { ItemType } from "../domain/enums/ItemType";

export function parseType(typeString: string): ItemType {
    if (typeString.trim().toLowerCase() === "fragile") return ItemType.FRAGILE;
    else if (typeString.trim().toLowerCase() === "document") return ItemType.DOCUMENT;
    else if (typeString.trim().toLowerCase() === "organic") return ItemType.ORGANIC;

    return ItemType.BULK
}