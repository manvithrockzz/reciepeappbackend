const mongoose = require('mongoose');
// mongoose is require as we use it as database

const foodrecipeSchema = new mongoose.Schema({
  name: String,   //name is taken as string format
  description: String, // description is taken as string format
  ingredients: String // ingredients is taken as string format
});

module.exports = mongoose.model('Recipe', foodrecipeSchema);
// this model/recipe to exported to index js to render it on server side