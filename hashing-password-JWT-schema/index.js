require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const { connectDB } = require('./config/db')
const userRoutes = require('./routes/user.Routes')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/api/v1/user', userRoutes)

// middleware for HTTP request logging in development mode
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('hashing passwords and generating tokens in the schema')
})

// Handling 404 errors with a custom message
app.get('*', (req, res) => {
    res.status(404).json('page not found')
})

app.listen(PORT, async () => {
    try {
        await connectDB(process.env.DATABASE_URL)
        console.log('connection to MongoDB established...')
        console.log(`server is listening on port ${PORT}`)
    } catch (err) {
        console.log(`Error connecting to MongoDB ${err.message}`)
    }
    
}) 