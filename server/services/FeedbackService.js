const FeedbackModel = require('../models/FeedbackModel');

class FeedbackService {

    async getAllFeedbacks() {
        return FeedbackModel.find({}).then(allfeedbacks => {
            return allfeedbacks;
        }).catch(err => {
            throw new Error(err.message);
        });
    }
}

module.exports = FeedbackService;
