const express = require('express');
const app = express();
const port = 5000;

// สร้าง url 
app.listen(port, (req,res)=>{
    console.log(`Server is running on http://localhost:${port}`);
})

// ส่ง hello 
app.get('/',(req,res) => {
    res.send('Hello, world!');
});

// สร้าง JSON หรือ ข้อมูลแบบโครงสร้าง
