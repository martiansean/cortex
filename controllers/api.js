const express = require("express");
const mongoose = require("mongoose");
const {ensureAuthenticated} = require('../helpers/auth');
const router = express.Router();

//load the user and questions models
require("../models/User");
const User = mongoose.model("users");

require("../models/Question");
const Question = mongoose.model("questions");

//get route
router.get('/subject',ensureAuthenticated, (req,res) => {
  Question.find({}).then(questions => {
    res.send(questions)
    // console.log(req.user)
  })
})

router.get('/question/:id',ensureAuthenticated, (req,res) => {
  Question.findOne({_id:req.params.id}).then(question => {
    res.send(question)
  })
})

router.post('/question', (req,res) => {
  const newQuestion = new Question({
    title : req.body.title,
    answer : req.body.answer,
    level : req.body.level
  })
  newQuestion.save().then(() => {
    res.send("question added")
  })

})

let counter
//FLAG ERROR
router.post('/question/:id', ensureAuthenticated,(req,res) => {
  Question.findOne({_id:req.params.id}).then(question => {
    // console.log(question)
    counter = 0
    for(k in req.user.completed){
      // console.log(k)
      k = req.user.completed[k]
      // console.log(k)
      if(k.id == question._id){
        // console.log("TRUE")
        counter += 1
      } 
    }
    // console.log(req.user.completed)
    // console.log(counter)
    if(counter > 0){
      res.send({text:"completed"})
    } else {
      if(req.body.answer == question.answer){
          User.findOne({_id:req.user._id}).then(user => {
            user.score = user.score + 10
            user.completed.push({id:question._id})
            user.save().then(() => {
              res.send({text:"correct"})
              // console.log(req.user)
            })
          })
        }
        else {
          res.send({text:"incorrect"})
        }
    }
  })
})
//END FLAG



router.get('/rank', ensureAuthenticated,(req,res) => {
  User.find({}).sort({'score':-1}).select({"email":1,"score":2}).limit(10).then(users => {
    // console.log(users)
    res.send(users)
  })
})

module.exports = router;
