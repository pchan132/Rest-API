/*
GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
GET /users/:id สำหรับการดึง users รายคนออกมา
PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
*/ 
const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

app.listen(port,(req,res) => {
  console.log (`Server is running on http://localhost:${port}`);
});

let users = [];// สร้างตัว แปรเก็บข้อมูล
let counter = 1 ; // สร้างตัวแปร นับ การใส่ข้อมูล
//1. GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/users',(req,res) => {
  res.json(users);
})

//2.POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
app.use(bodyParser.json());
app.post('/users' , (req,res) => {
  let user = req.body;
  user.id = counter++;
  users.push(user) // ใช้ push เพื่อข้อมูลใน users 
  res.json({
    message : 'Add user success',
    data : {
      users : user
    }
  });
});

// 3.GET /users/:id สำหรับการดึง users รายคนออกมา
app.get('/users/:id', (req,res) => {
  let id = req.params.id;
  let selectedIndex = users.findIndex((user)=> user.id == id)// หา index
  res.send(users[selectedIndex]);
});

// 4.PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/users/:id',(req,res) => {
  let id = req.params.id;
  let selectedIndex = users.findIndex((user)=> user.id == id)
  let modify = req.body;
  users[selectedIndex].firstName = modify.firstName;
  users[selectedIndex].lastName = modify.lastName;
  res.json({
    message : "put successfully",
    data : {
      user : users[selectedIndex]
    },
  });
});

// 5.DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
app.delete('/users/:id', (req,res) => {
  let id = req.params.id;
  let selectedIndex = users.findIndex((user) => user.id == id);
  users.splice(selectedIndex,1);
  res.json({
    message : "delete success",
    index : selectedIndex,
  });
});
