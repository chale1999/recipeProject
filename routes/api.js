const express = require('express');
const router = express.Router();


router.post('/login', function(req, res){
    res.send({type: 'working!'});
    /* incoming: login, password
   outgoing: id, firstName, lastName, error
  var error = '';
  const { login, password } = req.body;
  const db = client.db();
  const results = await 
  db.collection('Users').find({Login:login,Password:password}).toArray();
  var id = -1;
  var fn = '';
  var ln = '';
  if( results.length > 0 )
  {
    id = results[0].UserId;
    fn = results[0].FirstName;
    ln = results[0].LastName;
  }
  var ret = { id:id, firstName:fn, lastName:ln, error:''};
  res.status(200).json(ret);
  */

});


// get a list of recipes from the database
router.get('/recipes', function(req, res){
    res.send({type: 'GET'});

});

// add a new recipe to the database
router.post('/recipes', function(req, res){
    res.send({type: 'POST'});

});

// update a recipe in the database
router.put('/recipes/:id', function(req, res){
    res.send({type: 'PUT'});

});

// delete a recipe from the database
router.delete('/recipes/:id', function(req, res){
    res.send({type: 'DELETE'});

});

module.exports = router;