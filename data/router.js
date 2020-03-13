const express = require('express');

const router = express.Router();

const Projects = require('./helpers/projectModel.js');
const Actions = require('./helpers/actionModel.js');


router.get('/api/projects/', (req, res) => {
    Projects.get(req.params.id)
  .then(project => res.status(200).json(project))
  .catch(err => res.status(500).json({ error: "Error fetching project!" }))
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
    const id = req.params.id;
    const updates = req.body;
  
    if(!updates){
      res.status(400).json({error: "Updates are required"})
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
    Projects.getProjectActions(req.params.id)
    .then(actions => {
      if(actions){
        res.status(200).json(actions)
      } else {
        res.status(400).json({error: "Invalid project id"})
      }
    })
    .catch(err => res.status(500).json({error: "Error fetching project actions"}))
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


router.delete('/api/actions/:id', (req, res) => {
    Actions.remove(req.params.id)
    .then(actions => {
      if(actions > 0){
        res.status(200).json({message: "Action deleted"})
      } else {
        res.status(400).json({error: "Action could not be deleted"})
      }
    })
    .catch(err => res.status(500).json({error: "Error deleting Action"}))
  });




//custom middleware

function validateProjectId(req, res, next) {
    const {id} = req.params;
  
    Projects.get(id)
    .then(projectId => {
      if(projectId){
        projectId = req.project;
        next();
      }else{
        res.status(400).json({error: "Invalid project id"})
      }
    })
    .catch (err =>{
      console.log(res.status(500).json({error: "There was an error validating the project id", err}))
    })
  }
  
function validateProject(req, res, next) {
    const project = req.body;
    if (!project) {
      res.status(400).json({ message: "Missing project data" });
    } else if (!project.name) {
      res.status(400).json({ message: "Missing required name field" });
    } else if (!project.description) {
      res.status(400).json({ message: "Missing required description field" });
    } else {
      next();
    }
  }
  
function validateAction(req, res, next) {
    // do your magic!
    const action = req.body;
    if (!action) {
      res.status(400).json({ message: "Missing action data" });
    } else if (!action.project_id) {
      res.status(400).json({ message: "Missing required project_id field" });
    } else if (!action.description) {
      res.status(400).json({ message: "Missing required description field" });
    } else if (!action.notes) {
      res.status(400).json({ message: "Missing required notes field" });
    } else if (req.body.description.length > 128){
      res.status(400).json({error: "Project description length cannot exceed 128 characters."});
    } else {
      next();
    }
  }

module.exports = router;