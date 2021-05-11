const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


class FeedbackService {
    /**
     * Constructor
     * @param {*} datafile Path to a JSOn file that contains the feedback data
     */
    constructor(datafile) {
        this.datafile = datafile;
    }

    /**
     * Get all feedback items
     */
    async getList() {
        const data = await this.getData();
        return data;
    }

    /**
     * Add a new feedback item
     * @param {*} name The name of the user
     * @param {*} title The title of the feedback message
     * @param {*} message The feedback message
     */
    async addEntry(name, title, message) {
        const data = (await this.getData()) || [];
        data.unshift({ name, title, message });
        return writeFile(this.datafile, JSON.stringify(data));
    }

    /**
     * gets top size items - todo: fix
     * @param {*} size 
     * @returns 
     */
    async getNLatestComments(size) {
        const data = await this.getData();
        const feedbacks = data.filter(item => {
            return data.indexOf(item) < 3;
        });
        return feedbacks.map(item => {
            return {
                name: item.name,
                title: item.title,
                message: item.message
            }
        });
    }

    /**
     * Fetches feedback data from the JSON file provided to the constructor
     */
    async getData() {
        const data = await readFile(this.datafile, 'utf8');
        if (!data) return [];
        return JSON.parse(data);
    }
}

module.exports = FeedbackService;
