const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create recipe Schema & model
const RecipeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    ingredients: {
        type: [String]
    },
    vegan:{
        type: Boolean
    }
});

const Recipe = mongoose.model('recipe', RecipeSchema);

module.exports = Recipe;