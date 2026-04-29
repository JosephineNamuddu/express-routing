const express = require('express');

const connectDB = require("./db");

require("dotenv").config();

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
app.post('/todos',(req,res) =>{
    const{id,title,completed} = req.body;
    //Basic validation
    if(id === undefined || !title || completed === undefined){
        return res.status(400).json({error: 'id, title, and completed are required'})
    }
const newTask = {
    id,
    title,
    completed: Boolean(completed),
};
res.status(201).json(newTask);
});


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
})
connectDB() 