import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import Landmark from '../model/landmark';
import Review from '../model/review';
import Quest from '../model/quest';


export default({ config, db }) => {
  let api = Router();

//Begin LANDMARK routes

//Create a new landmark
// '/v1/landmark/add'
api.post('/add', (req, res) => {
  let newMark = new Landmark();
  newMark.name = req.body.name;
  newMark.marktype = req.body.marktype;
  newMark.avgcost = req.body.avgcost;
  newMark.geometry.coordinates = req.body.geometry.coordinates;

  newMark.save(err => {
    if(err){
      res.send(err);
    }
    res.json({ message: "Landmark successfully documented!" });
  });
});

//Read all landmarks
// '/v1/landmark' Get ALL

api.get('/', (req,res) => {
  Landmark.find({}, (err, landmarks) => {
    if (err) {
      res.send(err);
    }
    res.json(landmarks);
  });
});

//Read one landmark
// '/v1/landmark/:id' Get one by ID
api.get('/:id', (req, res) => {
  console.log(req.body);
  Landmark.findById(req.params.id ,(err, landmark) =>{
    if (err) {
      res.send(err);
    };
    res.json(landmark);
  });
});

//Update a landmark
// '/v1/landmark/:id' Update

api.put('/:id', (req,res) => {
  Landmark.findById(req.params.id, (err, landmark) => {
    if(err){
      res.send(err);
    }
    landmark.name = req.body.name;
    landmark.save(err => {
      if(err) {
      res.send(err);
    }
    res.json({ message: "Landmark updated" });
    });
  });
});

//Delete a landmark
// '/v1/landmark/:id' Delete

api.delete('/:id', (req,res) => {
  Landmark.remove({
    _id: req.params.id
  }, (err, landmark) => {
    if(err) {
      res.send(err);
    }
    res.json({ message: "Landmark destroyed! Call Department of the Homeland!"});
  });
});

//End LANDMARK routes-----------------------


//Begin routes that handle REVIEWS of landmarks

//Add
// '/v1/landmark/review/add/:id'

api.post('/reviews/add/:id', (req,res) => {
  Landmark.findById(req.params.id, (err, landmark) => {
    if(err) {
      res.send(err);
    }
    let newReview = new Review();

    newReview.title = req.body.title;
    newReview.text = req.body.text;
    newReview.landmark = landmark._id;
    newReview.save((err, review) => {
      if (err) {
        res.send(err);
      }
      landmark.reviews.push(newReview);
      landmark.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Landmark review saved" });
      });
    });
  });
});

//

//Get reviews of particular landmark
//'/v1/landmark/reviews/:id'

api.get('/reviews/:id', (req,res) => {
  Review.find({ landmark: req.params.id}, (err, reviews) => {
    if (err){
      res.send(err);
    }
    res.json(reviews)
  })
})

//

//Update a review goes here

//

//Delete a review
api.delete('/reviews/delete/:id', (req,res) => {
  Review.remove({
    _id: req.params.id
  }, (err, review) => {
    if(err) {
      res.send(err);
    }
    res.json({ message: "Review destroyed! Call The Department of Yelp!"});
  });
});

//End routes that handle REVIEWS-----------------------


//Begin routes that handle QUESTS

//Create a new quest
// '/v1/landmark/quests/add/:id'

api.post('/quests/add/:id', (req,res) => {
  Landmark.findById(req.params.id, (err, landmark) => {
    if(err) {
      res.send(err);
    }
    let newQuest = new Quest();

    newQuest.title = req.body.title;
    newQuest.description = req.body.description;
    newQuest.landmark = landmark._id;
    newQuest.save((err, quest) => {
      if (err) {
        res.send(err);
      }
      landmark.quests.push(newQuest);
      landmark.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Landmark quest saved" });
      });
    });
  });
});

//Read a quest
// '/v1/landmark/quests/:id'

api.get('/quests/:id', (req,res) => {
  Quest.find({ landmark: req.params.id}, (err, quests) => {
    if (err){
      res.send(err);
    }
    res.json(quests)
  })
})

//Update a quest
// '/v1/landmark/quests/:id'

api.put('/quests/:id', (req,res) => {
  Quest.findById(req.params.id, (err, quest) => {
    if(err){
      res.send(err);
    }
    quest.title = req.body.title;
    quest.description = req.body.description;
    quest.save(err => {
      if(err) {
      res.send(err);
    }
    res.json({ message: "Quest updated" });
    });
  });
});

//Delete a quest
// '/v1/landmark/quests/delete/:id'
api.delete('/quests/delete/:id', (req,res) => {
  Quest.remove({
    _id: req.params.id
  }, (err, quest) => {
    if(err) {
      res.send(err);
    }
    res.json({ message: "Quest destroyed! Call The Department of RPG's!"});
  });
});

//End routes that handle QUESTS-----------------------


return api;
}
