const mongoose = require("mongoose")

// Updated to include whatever was in recipe. That way it doubles as each post which contains a recipe
const PostSchema = new mongoose.Schema({
   username:{
       type: String,
       required: [true, "Please Enter a Username For the Post."]
   },
   desc:{
       type: String,
       max:500
   },
   recipeName:{
       type: String,
       required : [true, "Please Give the Recipe a Name."]
   },
   ingredients:{
        type: Array,
        default: [],
        required: [true, "Please Enter the Ingredients List"]
   },
   directions:{
        type: String,
        required : [true, "Please Enter the Directions for the Recipe."]
    },
   likes:{
       type: Array,
       default: []
   },
   servingCount:{
        type: String,
    },
    prepTime:{
        type: String,
    },
    cookTime:{
        type: String,
    },
   img:{
       type: String
   }
},
 {timestamps: true}
);

module.exports = mongoose.model("Post", PostSchema);
