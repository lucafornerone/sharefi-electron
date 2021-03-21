/** 
 * A module that represents a system item
 * @module Item 
 */

/** A class that allows to create the representation of a system item */
class Item {

	/**
     * Creates a representation of a system item
     * @param  {Number}   id     	 The file system specific "Inode" number for the item - for more information: {@link https://nodejs.org/api/fs.html#fs_stats_ino Node.js}
	 * @param  {ItemType} type       Item's type
	 * @param  {String}   path       Item's absolute path (no device - apart from the owner - will see the item's absolute path)
	 * @param  {Number}   [bytes]    Optional item's total bytes (null for folder)
     * @param  {Number}   [totFiles] Optional item's total files (null for file)
     * @param  {String}   [tag]      Optional description to more easily identify one or more items
     */
	constructor(id, type, path, bytes, totFiles, tag) {
		this.id = id;
		this.type = type;
		this.path = path;
		this.bytes = bytes;
		this.totFiles = totFiles;
		this.tag = tag;
	}

}

module.exports = Item;