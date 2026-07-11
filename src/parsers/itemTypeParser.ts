import { ItemType } from "../domain/enums/ItemType";

export function parseType(typeString: string): ItemType {
    if (formatType(typeString) === "fragile") return ItemType.FRAGILE;
    else if (formatType(typeString) === "document") return ItemType.DOCUMENT;
    else if (formatType(typeString) === "organic") return ItemType.ORGANIC;

    return ItemType.BULK;
}

function formatType(typeString: string) {
    return typeString.trim().toLowerCase();
}