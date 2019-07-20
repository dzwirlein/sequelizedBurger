var express = require("express")

var router = express.Router();

var db = require("../models");


router.get("/", function(req, res) {
    db.burger.findAll({}).then(function(burger_data){
        console.log(burger_data);
        res.render('index',{burger_data});
    })
   
  });


  router.post('/burgers/create', function(req, res) {
    db.burger.create({
        burger_name: req.body.name
      })
      .then(function() {
       
        res.redirect("/");
      });
  });
  
  router.put('/burgers/:id', function(req, res) {
    
    db.burger.update(
      {
        devoured: true
      },
      { where: { id: req.params.id } }
    ).then(function(){
      res.redirect("/");
    })
  });
  



module.exports = router;