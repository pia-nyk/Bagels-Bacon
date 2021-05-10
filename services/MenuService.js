const fs = require("fs");
const util = require("util");

/**
 * We want to use async/await with fs.readFile - util.promisfy gives us that
 */
const readFile = util.promisify(fs.readFile);

/**
 * Logic for fetching menu information
 */
class MenuService {
    /**
     * Constructor
     * @param {*} datafile Path to a JSOn file that contains the speakers data
     */
    constructor(datafile) {
        this.datafile = datafile;
    }

    /**
     * Get item information 
     */
    async getMenuItems() {
        const data = await this.getData();
        return data.map(menuitem => {
            return {
                name: menuitem.title,
                price: menuitem.price,
                shortname: menuitem.shortname,
                description: menuitem.description,
                image: menuitem.image
            }
        });
    }

    /**
     * Returns a list of menu items with only the basic information
     */
    async getListShort() {
        const data = await this.getData();
        return data.map(menuitem => {
            return {
                name: menuitem.title,
                shortname: menuitem.shortname,
                price: menuitem.price
            };
        });
    }

    /**
     * Fetches speakers data from the JSON file provided to the constructor
     */
    async getData() {
        const data = await readFile(this.datafile, "utf8");
        return JSON.parse(data).menuitems;
    }

    async getFamousItems() {
        const data = await this.getData();
        const menuitems = data.filter(item => {
            return item.isFamous == 'yes';
        });
        return menuitems.map(item => {
            return {
                name: item.title,
                price: item.price,
                image: item.image
            }
        });
    }
}

module.exports = MenuService;
