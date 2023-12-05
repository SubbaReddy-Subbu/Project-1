const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const NewProfile = require('./Modales/Profile')

const Port = 3002

mongoose.connect('mongodb+srv://subbareddydaginti406:subbareddy@cluster0.osu1rar.mongodb.net/Profiles?retryWrites=true&w=majority')
.then(()=>{
    console.log("db has connected succesfully")
}).catch((err)=>{
    console.log(err.message)
})

app.use(express());
app.use(cors());
app.use(bodyParser.json())

app.post('/addprofile',async(req,res)=>{
    try{
        const newProfile = new NewProfile(req.body);
        await newProfile.save();
        return res.json((await NewProfile.find()))
    }
    catch (err) {
        console.log(err)
    }
})


app.get('/profile',async(req,res)=>{
    try {
        return res.send(await NewProfile.find());
    } catch (err) {
        console.log(err);
    }
})

app.get('/profile/:id',async (req,res)=>{
    try {
        return res.json( await NewProfile.findById(req.params.id));
    } catch (err) {
        console.log(err);
    }
})

app.delete('/delete',async(req,res)=>{
    try{
        res.json(await NewProfile.deleteMany());
        return res.send(`successfully deleted ${NewProfile.find()}`)
    }catch (err) {
        console.log(err)
    }
})

app.delete('/delete/:id',async(req,res)=>{
    try{
        const deletedProfile = await NewProfile.findByIdAndDelete(req.params.id);
  
      if (!deletedProfile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      return res.status(200).json({ message: 'Successfully deleted profile', deletedProfile });    }catch (err) {
        console.log(err)
    }
})
app.put('/updateprofile/:_id',async(req,res)=>{
    try {
        const modifiedData = req.body;
        // Use async/await to wait for the result of findById
        const oldData = await NewProfile.findById(req.params._id);
        if (!oldData) {
          return res.status(404).json({ message: 'Profile not found' });
        }
        // Save the updated profile
        await NewProfile.findByIdAndUpdate(req.params._id, modifiedData) ;
        
         const UpdatedData = await NewProfile.findById(req.params._id)
        return res.json(UpdatedData);
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
      }
})
app.listen(Port ,()=>{
    console.log(`server runninng on ${Port}`)
})