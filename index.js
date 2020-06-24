const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const db = require('./db')
const recipeRouter = require('./routes/recipe-router')

const app = express()
const apiPort = 8000


app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
app.use(fileUpload());


db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})


//Image Uploader


const makeId = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


app.post('/api/upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'no file was uploaded' })
    }
    
    const file = req.files.file;

    const fileName = (makeId(5) + file.name)


    file.mv(`/Users/oskarwroz/Documents/WebDev-Projects/recipe-share-app/recipe-share/public/uploads/${fileName}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send("it ain't there")
        }


        res.json({fileName: fileName, filePath: `/uploads/${fileName}`})
    })
})



app.use('/api', recipeRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))


// file name never set?

