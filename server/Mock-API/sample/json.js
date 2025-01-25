/* Rest API */
const express = require('express');
const app = express();
const por = 8888;

let user = [
    {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com"
    },
    {
        id: 2,
        name: "Jane Doe",
        email: "janedoe@example.com"
    }
]

// สร้าง URL
app.listen(por, ()=>{
    console.log(`Server is running on http://localhost:${por}`);
});

app.get ('/api/users', function(req,res){
    res.json(user);
});

