// import library 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require ('mysql2/promise');

const port = 8000 ; 

app.listen (port , () =>{
    console.log(`Server is running http://localhost:${port}`);
});

// การเชื่อมต่อฐานข้อมูล อีก 1 ท่า
// Route handler for getting all users
app.get('/testdb', (req, res) => {
  // สร้าง connection ไปยังฐานข้อมูล
  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tutorials', // ใส่ชื่อฐานข้อมูลที่ใช้งาน
    port : 8889 // ใส่ port ของ mysql ที่ใช้งาน
  }).then((conn) => { // จะได่ตัวแปร conn มาเป็น connection ไปยังฐานข้อมูล
    // สิ่งนี้เราเรียกกันว่า promise
    conn.query('SELECT * FROM users')
    .then((results) => {
      res.json(results[0])
    })
    .catch((error) => {
      console.error('Error fetching users:', error.message)
      res.status(500).json({ error: 'Error fetching users' })
    })
  })
})

// แสดงข้อมูลจากฐานข้อมูล ท่า 2 ใช้ async await
app.get ('/testdb-new', async (req, res) => {
  try {  // สร้าง connection ไปยังฐานข้อมูล
    const conn = await mysql.createConnection({
      host : 'localhost',
      user : 'root',
      password : 'root',
      database : 'tutorials',
      port : 8889,
    })// ใช้ตัวแปร results เก็บค่าที่ได้จากการ query
    const results = await conn.query('SELECT * FROM users'); 
      res.json(results[0]);
  } catch (error) {
    // ใน method catch จะทำงานเมื่อเกิด error 
    // ใน method error จะมี property message ที่เก็บข้อความของ error
    console.error('Error fetching users:',error.message);
    // ส่ง response กลับไปที่ client ว่าเกิด error ในการดึงข้อมูล
    res.status(500).json({error : 'Error fetching users'});
  }
});

