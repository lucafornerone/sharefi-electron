/**
 * A module that contains items' functions
 * @module itemService
 *
 * @requires ItemType
 */

// App modules
var items = require('../shares/items');
const ItemType = require('../enums/ItemType');

/**
 * Get total items
 * @return {Number} Total items
 */
function getTotalItems() {
	return items.length;
}

/**
 * Get items
 * @return {Item[]} Items
 */
function getItems() {
	return items;
}

/**
 * Get item by id and type
 * @param  {Number}   id   Item's id
 * @param  {ItemType} type Item type
 * @return {Item}          Item
 */
function getItemByIdAndType(id, type) {
	return items.find((item) => item.type === type && item.id === id);
}

/**
 * Add new item
 * @param  {Item} item New item to add
 * @return {Void}
 */
function addItem(item) {
	items.unshift(item);
}

/**
 * Get item index by id and type
 * @param  {Number}   id   Item's id
 * @param  {ItemType} type Item type
 * @return {Number}        Item's index
 */
function getItemIndexByIdAndType(id, type) {
	return items.findIndex((item) => item.type === type && item.id === id);
}

/**
 * Remove item by index
 * @param  {Number} index Item's index
 * @return {Void}
 */
function removeItem(index) {
	items.splice(index, 1);
}


module.exports = {
	getTotalItems,
	getItems,
	getItemByIdAndType,
	addItem,
	getItemIndexByIdAndType,
	removeItem
}