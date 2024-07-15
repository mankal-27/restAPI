const express = require('express');
const Ninja = require('../models/users');
const router = express.Router();

//Get a list of ninjas from DB
router.get('/ninjas', (req, res, next) => {
    const { lng, lat } = req.query;
    Ninja.aggregate([
        {
            $geoNear: {
                near: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                distanceField: "dist.calculated",
                maxDistance: 100000,
                spherical: true
            }
        }
    ]).then(function(ninjas){
        res.send(ninjas);
    }).catch(next); // This will pass errors to the error handler
});
//Add a New Ninja to DB
router.post('/ninjas', (req, res, next) => {
      Ninja.create(req.body).then(function(ninja){
        res.send(ninja)
      }).catch(next)

})

//Update a Ninja to DB
router.put('/ninjas/:id', (req, res,next) => {
    const userId = req.params.id
    Ninja.findByIdAndUpdate({_id: userId}, req.body).then(function(){
        Ninja.findOne({_id:userId}).then(function(ninja){
            res.send(ninja)
        })
    })
}) 

//Delete a ninja from DB
router.delete('/ninjas/:id', (req, res,next) => {
    const userId = req.params.id
    Ninja.findByIdAndDelete({_id: userId}).then(function(ninja){
        res.send(ninja);
    }).catch(next)
    //console.log(userId);
})

module.exports = router;