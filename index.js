const express = require('express');

const app = express();

// Middleware example
//Middles are to be positioned before the routes.
app.use((req, res, next) =>{
    console.log(`${req.method} ${req.url}`);
    next();
})
app.use(express.json()); //Middleware to parse JSON request bodies



//Get http method
app.get('/', (request, response) => {
    response.send('Welcome to my API');
})

app.get('/about', (req, res)=>{
    res.send('This is the about page');
})

app.get('/profile', (req, res) => {
res.send('This is the profile page');
})

app.get('/users/:id', (req, res) => {
    console.log(req.params);
    const userID = req.params.id;
    res.send(`User ID: ${userID}`);
})
app.get('/search', (req, res) =>{
    const query = req.query.keyword;
    res.send(`Search keyword: ${query}`);
})

//JSON Responses
app.get('/api/users',(req, res) => {
    const users = [
{ id: 1, name: 'Alice' },
{ id: 2, name: 'Bob'},
{ id: 3, name: 'charlie'},
];
res.json(users);
});

//POST http method
app.post('/api/users', (req,res) => {
    const newUser = req.body;
    console.log('Received user data:',newUser);
    res.status(201).json({
        message:'user created successfully',
        user: newUser
    })
} )

//todo API

let todos = [];
// GET/todos
// return all todos
app.get('/todos',(req,res) =>{
res.status(200).json(todos);
});

//    POST/todos   
//    Create a new todos
//    Expected body:{id,tittle,completed}  
app.post('/todos',(req,res)=>{
    const{id, title,completed} = req.body;

    //Validation
    if(!id||!title||typeof completed !== 'boolean'){
        return res.status(400).json({
            error:'invalid input: id, title and completed are required'
        });
    }
//Check duplicate ID
const existingTodo = todos.find(todo =>todo.id===id);
if (existingTodo) {
    return res.status(400).json({
        error: 'Todo with this ID already exists'
    });
}


const newTask = {
    id:todos.length + 1,
    title,
    completed
};

todos.push(newTask);

//Return the created task
res.status(201).json(newTask)
res.status(201).json(newTask);
});





const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
})