var express = require("express")

var router = express.Router();

var burger = require("../models/burger.js");


router.get("/", function(req, res) {
    burger.all(function(burger_data){
        console.log(burger_data);
        res.render('index',{burger_data});
    })
   
  });


  router.post('/burgers/create', function(req, res) {
    burger.create([
      'burger_name'
    ], [
      req.body.burger_name
    ], function(result) {
      res.redirect('/');
    });
  });
  
  router.put('/burgers/:id', function(req, res) {
    
    burger.update(
      {devoured: true
      },req.params.id,
   function(result) {
        console.log(result)
      res.redirect('/');
    });
  });
  



module.exports = router;