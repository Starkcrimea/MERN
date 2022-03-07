const express = require("express")
const config = require("config")
const mongoose = require("mongoose")
const app  = express()
const PORT = config.get('port') || 5000
const links = require('./routes/link.routes')
const auth = require('./routes/auth.routes')
const redirect = require('./routes/redirect.router')
const cors = require('cors')

app.use(express.json({extended: true}))
app.use(cors())
app.use('/api/auth',auth)
app.use('/api/link',links)
app.use('/t',redirect)
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  }
async function start(){
    try{
        await mongoose.connect(config.get("mongoUri"),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
        })
    app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`))
    } catch (e){
        console.log("Server error", e.message)
        process.exit()
    }
}
start()