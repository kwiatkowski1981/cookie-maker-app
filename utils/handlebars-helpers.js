const handlebarsHelpers = {
    'find-price': (entries, selectedItem) => {
        const found = entries.find(el => el[0] === selectedItem);
        if (!found) {
            throw new Error(`Cannot find price of "${selectedItem}".`);
        }
        const [, price] = found;
        return price;
    },
    pricify: price => price.toFixed(2),
    isNotOnList: (array, element) => !array.includes(element),
    isOnList: (array, element) => array.includes(element),
    not: arg => !arg,
};


module.exports = {
    handlebarsHelpers,
}


