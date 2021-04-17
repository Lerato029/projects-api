//=============================================The Router Module======================================
//=======Importing Modules=========
//importing express module
const express = require("express");
//using express router function
const router = express.Router();

//importing fs module
const fs = require("fs");
//global variable to parse the projects in the web-projects api
const projects = JSON.parse(fs.readFileSync("./projects.json"));

//========================================function to create unique Id for every user==================
const createId = () => {
  return Math.floor(Math.random() * Date.now());
};

/* =============================================CRUD Functionality=================================== */

//=============================================================|CREATE| VIA POST
router.post("/create", (req, res) => {
  const id = createId();
  //req.body instead of calling all the other properties
  const newProject = Object.assign({ id }, req.body);

  //pushing new object to the array
  projects.push(newProject);

  //returning response with a message and new values for projects
  return res.json({
    message: "New Project Added",
    projects,
  });
});

//=============================================================|READ| VIA GET
router.get("", (req, res) => {
  res.json(projects); //respond with projects
});

//=============================================================|UPDATE| VIA PUT
//editing existing object based on id
router.put("/update/:id", (req, res) => {
  //get user information
  const id = Number(req.params.id);
  //new object created
  const newProject = Object.assign({ id }, req.body);

  //loop through projects to see which id matches requested id
  for (let i = 0; i < projects.length; i++) {
    //that object will be overwritten
    if (projects[i].id === id) {
      projects[i] = newProject;
    }
  }

  return res.json({
    message: "Project updated",
    projects,
  });
});

//=============================================================|DELETE| VIA DELETE
//deleting existing object based on id
router.delete("/delete/:id", (req, res) => {
  //get user information
  const id = Number(req.params.id);

  //loop through projects to see which id matches requested id
  for (let i = 0; i < projects.length; i++) {
    //that object will be overwritten
    if (projects[i].id === id) {
      //delete 1 element from element of the index of i requested
      projects.splice(i, 1);
    }
  }
  //Documenting The Delete Request
  return res.json({
    message: "Project deleted",
    projects,
  });
});

module.exports = router;
//Exporting the router modules
