const express = require('express');

const router = express.Router();

const Projects = require('./helpers/projectModel.js');


router.get('/', (req, res) => {
    Projects.get(req.params.id)
  .then(project => res.status(200).json(project))
  .catch(err => res.status(500).json({ error: "Error fetching users!" }))
});

router.post('/', (req, res) => {
    Projects.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the projects database!',
      });
    });
  });

  
  router.put('/:id', (req, res) => {
    // do your magic!
    const id = req.params.id;
    const updates = req.body;
  
    if(!updates){
      res.status(400).json({error: "Name field is required"})
    }
  
    Projects.update(id, updates)
    .then(project => {
      if(project){
        res.status(200).json({message: "Project updated successfully"});
      } else {
        res.status(404).json({error: "No project with that id exists"})
      }
    })
    .catch(err => {
      res.status(500).json({error: "Error updating user"})
      console.log(err)
    })
  });

module.exports = router;