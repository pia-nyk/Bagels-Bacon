const MenuModel = require('../models/MenuModel');

/**
 * Logic for fetching menu information
 */
class MenuService {

    async getAllMenuItems() {
        return MenuModel.find({}).then(allMenuItems => {
            return allMenuItems;
        }).catch(err => {
            throw new Error(err.message);
        });
    }

    async getFamousItems() {
        return MenuModel.find({ isFamous: true }, (famousItems => {
            try {
                return famousItems;
            } catch (err) {
                throw new Error(err.message);
            }
        }));
    }
}

module.exports = MenuService;
