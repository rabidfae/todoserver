//Minimum HTTP endpoints

//GET TODOS
//POST TODO
//PUT TODO (update)
//DELETE TODO
//GET ALL TODOS for a CATEGORY
//GET CATEGORIES
//POST CATEGORIES
//PUT CATEGORIES (update) 
//DELETE CATEGORIES

const express = require('express')
const app = express()
const port = 3000

let toDo = [
    {
        toDoID: 0,
        toDoText: "Homework",
        toDoCategory: [2], 
        toDoComplete: true
    },
    {
        toDoID: 1,
        toDoText: "Make Dinner",
        toDoCategory: [0],
        toDoComplete: false

    },
    {
        toDoID: 2,
        toDoText: "Laundry",
        toDoCategory: [0],
        toDoComplete: true
    },
    {
        toDoID: 3,
        toDoText: "Weekly Budget",
        toDoCategory: [0],
        toDoComplete: false

    },
    {
        toDoID: 4,
        toDoText: "Work on Project",
        toDoCategory: [1],
        toDoComplete: false
    },
    {
        toDoID: 5,
        toDoText: "Grocery Shopping",
        toDoCategory: [0],
        toDoComplete: true
    }

]

let category = [
    {
        categoryID: 0,
        categoryName: "Home",
    },
    {
        categoryID: 1,
        categoryName: "Work",

    },
    {
        categoryID: 2,
        categoryName: "School",
    }

]


app.use(express.json())

app.get('/', (req, res) => {    
    res.send('I am the root path')})

// GET TODOS
app.get('/toDo/:ID', (req, res) => {
  const ID = parseInt(req.params.ID);
  const toDoItem = toDo.find(x => x.toDoID == ID); // Find the item in the array that matches the ID
 //console.log('Found toDoItem:', toDoItem);
  if (toDoItem) { // Simple boolean check to see if there's a value in there
    res.status(200).json(toDoItem); // If there was a value, send it with a 200 status
  } else {
    res.status(404).send('To-do not found'); // If not found, send a 404 status
  }
});
// POST TODO
app.post('/toDo', (req, res) => {
  const newToDo = {
    toDoID: toDo.length, // Assign a new ID based on the length of the array
    toDoText: req.body.toDoText,
    toDoCategory: req.body.toDoCategory,
    toDoComplete: req.body.toDoComplete
  };
  toDo.push(newToDo); // Add the new todo item to the array
  res.status(201).json(newToDo); // Respond with the created todo item and a 201 status
});

app.put('/toDo/:ID', (req, res) => {
  const ID = parseInt(req.params.ID);
  //console.log('Parsed ID:', ID);
  //console.log('Current toDo array:', JSON.stringify(toDo, null, 2));

  const toDoItem = toDo.find(x => x.toDoID == ID); // Find the item in the array that matches the ID

  if (toDoItem) { // Simple boolean check to see if there's a value in there
    // Update the properties of the found todo item
    toDoItem.toDoText = req.body.toDoText !== undefined ? req.body.toDoText : toDoItem.toDoText;
    toDoItem.toDoCategory = req.body.toDoCategory !== undefined ? req.body.toDoCategory : toDoItem.toDoCategory;
    toDoItem.toDoComplete = req.body.toDoComplete !== undefined ? req.body.toDoComplete : toDoItem.toDoComplete;

    console.log('Updated toDoItem:', toDoItem);
    res.status(200).json(toDoItem); // If there was a value, send it with a 200 status
  } else {
    console.log('To-do not found for ID:', ID);
    res.status(404).send('To-do not found'); // If not found, send a 404 status
  }
});
// DELETE TODO
app.delete('/toDo/:ID', (req, res) => {
  const ID = parseInt(req.params.ID);
 // console.log('Parsed ID:', ID);
  //console.log('Current toDo array:', JSON.stringify(toDo, null, 2));

  const index = toDo.findIndex(x => x.toDoID == ID); // Find the index of the item in the array that matches the ID

  if (index !== -1) { // Check if the item was found
    const deletedToDo = toDo.splice(index, 1); // Remove the item from the array
    console.log('Deleted toDoItem:', deletedToDo);
    res.status(200).json(deletedToDo); // Respond with the deleted item and a 200 status
  } else {
    console.log('To-do not found for ID:', ID);
    res.status(404).send('To-do not found'); // If not found, send a 404 status
  }
});

// GET ALL TODOS for a CATEGORY
app.get('/todo/:toDoCategory', (req, res) => {
  res.send(`Get all todos for category ${toDoCategory}`);
});

// GET CATEGORIES
app.get('/categories/:categoryID/todos', (req, res) => {
  const categoryID = parseInt(req.params.categoryID);
  console.log('Requested category ID:', categoryID);

  const todosInCategory = toDo.filter(todo => todo.toDoCategory.includes(categoryID));
  //console.log('Todos in category:', JSON.stringify(todosInCategory, null, 2));

  res.status(200).json(todosInCategory); // Respond with the filtered todos and a 200 status
});

// POST CATEGORIES
app.post('/categories', (req, res) => {
  res.send(category);
});

// PUT CATEGORIES (update)
app.put('/categories/:categoryID', (req, res) => {
  const categoryID = parseInt(req.params.categoryID);
  //console.log('Parsed category ID:', categoryID);
  //console.log('Current category array:', JSON.stringify(category, null, 2));

  const categoryItem = category.find(cat => cat.categoryID == categoryID); // Find the item in the array that matches the ID

  if (categoryItem) { // Simple boolean check to see if there's a value in there
    // Update the properties of the found category item
    categoryItem.categoryName = req.body.categoryName !== undefined ? req.body.categoryName : categoryItem.categoryName;

    console.log('Updated categoryItem:', categoryItem);
    res.status(200).json(categoryItem); // If there was a value, send it with a 200 status
  } else {
    console.log('Category not found for ID:', categoryID);
    res.status(404).send('Category not found'); // If not found, send a 404 status
  }
});

// DELETE CATEGORY
app.delete('/categories/:categoryID', (req, res) => {
  const categoryID = parseInt(req.params.categoryID);
  //console.log('Parsed category ID:', categoryID);
  //console.log('Current category array:', JSON.stringify(category, null, 2));

  const index = category.findIndex(cat => cat.categoryID == categoryID); // Find the index of the item in the array that matches the ID

  if (index !== -1) { // Check if the item was found
    const deletedCategory = category.splice(index, 1); // Remove the item from the array
    console.log('Deleted categoryItem:', deletedCategory);
    res.status(200).json(deletedCategory); // Respond with the deleted item and a 200 status
  } else {
    console.log('Category not found for ID:', categoryID);
    res.status(404).send('Category not found'); // If not found, send a 404 status
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});


