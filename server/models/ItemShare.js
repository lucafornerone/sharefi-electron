/** 
 * A module that represents a shared item (file or folder) 
 * @module ItemShare 
 */

/** A class that allows to create a shared item  */
class ItemShare {

	/**
     * Creates a representation of a shared item
     * @param  {Number}   id     	  Item's id (unique on owner device)
	 * @param  {String}   name        Item's name
	 * @param  {ItemType} type        Item's type
	 * @param  {String}   [fullName]  Optional item's full name (name and extension - null for folder)
     * @param  {String}   [extension] Optional item's extension (null for folder)
     * @param  {String}   [size]      Optional item's size (expressed in Bytes, KB, MB, GB etc. - null for folder)
	 * @param  {Number}   [bytes]     Optional item's total bytes (null for folder)
	 * @param  {Number}   [totFiles]  Optional item's total files (null for file)
     * @param  {String}   [tag]       Optional description to more easily identify one or more files
     */
	constructor(id, name, type, fullName, extension, size, bytes, totFiles, tag) {
		this.id = id;
		this.name = name;
		this.type = type;
		this.fullName = fullName;
		this.extension = extension;
		this.size = size;
		this.bytes = bytes;
		this.totFiles = totFiles;
		this.tag = tag;
	}

}

module.exports = ItemShare;