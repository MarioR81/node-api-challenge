const express = require('express');

const router = express.Router();

const Projects = require('./helpers/projectModel.js');
const Actions = require('./helpers/actionModel.js');


router.get('/api/projects/', (req, res) => {
    Projects.get(req.params.id)
  .then(project => res.status(200).json(project))
  .catch(err => res.status(500).json({ error: "Error fetching users!" }))
});

router.post('/api/projects/', (req, res) => {
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

  
router.put('/api/projects/:id', (req, res) => {
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


router.delete('/api/projects/:id', (req, res) => {
    Projects.remove(req.params.id)
    .then(project => {
      if(project > 0){
        res.status(200).json({message: "Project deleted"})
      } else {
        res.status(400).json({error: "Project could not be deleted"})
      }
    })
    .catch(err => res.status(500).json({error: "Error deleting Project"}))
  });


router.get('/api/projects/:id/actions', (req, res) => {
    // console.log(req.paramps.id)
    Projects.getProjectActions(req.params.project_id)
  .then(actions => res.status(200).json(actions))
  .catch(err => res.status(500).json({ error: "Error fetching actions!" }))
});


router.get('/api/actions/', (req, res) => {
    Actions.get(req.params.id)
  .then(actions => res.status(200).json(actions))
  .catch(err => res.status(500).json({ error: "Error fetching users!" }))
});


router.post('/api/actions/', (req, res) => {
    Actions.insert(req.body)
    .then(actions => {
      res.status(201).json(actions);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the Actions database!',
      });
    });
  });


router.put('/api/actions/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body;
  
    if(!updates){
      res.status(400).json({error: "Name field is required"})
    }
  
    Actions.update(id, updates)
    .then(actions => {
      if(actions){
        res.status(200).json({message: "Actions updated successfully"});
      } else {
        res.status(404).json({error: "No action with that id exists"})
      }
    })
    .catch(err => {
      res.status(500).json({error: "Error updating user"})
      console.log(err)
    })
  });




module.exports = router;