const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

// in memory storage
let users = [];

// Routes
// get users
app.get('/users', (req, res) => {
    res.json(users);
});

// hash password and create a user
app.post('/users', async (req, res) => {
    try {
        let { name, password } = req.body
        
        const duplicate = users.find((user) => user.name === name)

        if (!duplicate) {
            const salt = await bcrypt.genSalt()
            password = await bcrypt.hash(password, salt)

            users.push({name, password})
            res.status(201).send('user created successfully ')
        } else {
            res.status(409).json({msg: 'Name already exists'})
        }

        
    }
    catch (err) {
        res.status(500).json({msg: err.message})
    }
});

// authenticate user password
app.post('/users/login', async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = users.find((user) => user.name === name)

        if (user) {
            const auth = await bcrypt.compare(password, user.password)
            
            if (auth) {
                res.send('login succesful')
            } else {
                res.send('invalid password')
            }
        } else {
            res.send('invalid name')
        }
    }
    catch (err) {
        res.status(500).json({msg: err.message})
    }
})

app.listen(3000, () => {
    console.log('app listening on port 3000')
})

// test routes with thunderclient(vscode) or postman
