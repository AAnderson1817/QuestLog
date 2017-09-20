import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import Landmark from '../model/landmark';


export default({ config, db }) => {
  let api = Router();

// '/v1/landmark/add'
api.post('/add', (req, res) => {
  let newMark = new Landmark();
  newMark.name = req.body.name;

  newMark.save(err => {
    if(err){
      res.send(err);
    }
    res.json({ message: "Landmark successfully documented!" });
  });
});

// '/v1/landmark' Get ALL

api.get('/', (req,res) => {
  Landmark.find({}, (err, landmarks) => {
    if (err) {
      res.send(err);
    }
    res.json(landmarks);
  });
});
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

api.get('/name', (req,res) => {
  Landmark.find(req.params.name , (err, landmark) =>{
  if(err) {
    res.send(err);
    };
    res.send(landmark);
  });
});

// '/v1/landmark/:id' Delete

api.delete('/:id', (req,res) => {
  Landmark.remove({
    _id: req.params.id
  }, (err, restaurant) => {
    if(err) {
      res.send(err);
    }
    res.json({ message: "Landmark destroyed! Call Department of the Homeland!"});
  });
});

//Add a quest to a landmark
// '/v1/landmark/quest/add/:id'

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

api.post('/quests/add/:id', (req,res) => {
  Landmark.findById(req.params.id, (err, landmark) => {
    if(err) {
      res.send(err);
    }
    let newQuest = new Quest();

    newQuest.title = req.body.title;
    newQuest.text = req.body.text;
    newQuest.landmark = landmark._id;
    newQuest.save((err, review) => {
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

return api;
}
