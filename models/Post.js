const mongoose = require("mongoose")

// Updated to include whatever was in recipe. That way it doubles as each post which contains a recipe
const PostSchema = new mongoose.Schema({
   userId:{
       type: String,
       required: true
   },
   desc:{
       type: String,
       max:500
   },
   recipeName:{
       type: String
   },
   ingredients:{
        type: Array,
        default: []
   },
   directions:{
        type: String
    },
   likes:{
       type: Array,
       default: []
   },
   img:{
       type: String
   }
},
 {timestamps: true}
);

module.exports = mongoose.model("Post", PostSchema);
