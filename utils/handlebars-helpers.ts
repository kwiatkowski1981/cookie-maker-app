import {Entries} from "../types/entries";

export const handlebarsHelpers = {
    'find-price': (entries: Entries, selectedItem: string): number => {
        const foundItem = entries.find(el => el[0] === selectedItem);
        if (!foundItem) {
            throw new Error(`Cannot find price of "${selectedItem}".`);
        }
        const [, price] = foundItem;
        return price;
    },
    pricify: (price: number): string => price.toFixed(2),
    // <T> typ generyczny o nazwie "T" domyslajacy sie z kontekstu co bedzie przyetrzymywal w srodku i pozwoli tylko
    // wyszukiwać elementy tego jednego typu
    isNotOnList: <T>(array: T[], element: T): boolean  => !array.includes(element),
    isOnList: <T>(array: T[], element: T): boolean => array.includes(element),
    not: (arg: boolean): boolean => !arg,
};



