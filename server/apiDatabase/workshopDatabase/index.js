const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const cors = require("cors");

const port = 8000;

let conn = null; //ไว้ เรียกใช้งาน connection ไปยังฐานข้อมูล จาก initMySql
// การเชื่อมต่อฐานข้อมูล เป็น ตัวแปร function
const initMySql = async () => {
  conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "tutorials",
    port: 8889,
  }); // ส่งข้อมูล conn ไปที่ let conn = null;
};
//////////////////// อย่า ลืม ใส่ app.use(bodyParser.json()); กำหนดประเภทข้อมูลที่จะส่งไปให้ server ใช้งาน
app.use(bodyParser.json());
app.use(cors()); // ใช้งาน cors สำหรับการทำให้ server สามารถรับข้อมูลจาก client ที่อยู่ใน domain อื่นได้
////////////////////////////////////////////////////////////////
// GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา R
app.get("/users", async (req, res) => {
  try {
    const results = await conn.query("SELECT * FROM users");
    res.json(results[0]);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Error fetching users" });
  }
});
//POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป C
app.post("/users", async (req, res) => {
  let user = req.body; // รับข้อมูลจาก client ที่ส่งมา
  try {
    // สร้าง connection ไปยังฐานข้อมูล INSERT INTO users SET ?
    const results = await conn.query("INSERT INTO users SET ?", user);
    // ส่งข้อมูลให้ client รู้ว่าบันทึกข้อมูลเรียบร้อย
    res.json({
      message: "Create user successfully",
      data: results[0], // results[0] คือแสดงข้อมูลที่บันทึกเข้าไป
    });
  } catch (error) {
    console.error("Error create users:", error.message);
    res.status(500).json({ error: "Error create users" });
  }
});

//GET /users/:id สำหรับการดึง users รายคนออกมา R
app.get ('/users/:id', async (req,res ) => {
  const id = req.params.id;
  try {
    // const results = await conn.query('SELECT * FROM users WHERT id = ?', [id])
    const results = await conn.query('SELECT * FROM users WHERE id = ?', id)
    // res.json(results[0][0]) // results[0][0] คือแสดงข้อมูลที่บันทึกเข้าไป เป็น object

    // ตรสสอบว่ามีข้อมูลหรือไม่
    if (results[0].length === 0) {
      res.status(404).json({ error: 'User not found' });
      // throw new Error('User not found'); // สร้าง error ขึ้นมา ส่ง ไปที่ catch
    } else {
      res.json(results[0][0]);// results[0][0] คือแสดงข้อมูลที่บันทึกเข้าไป เป็น object
    }

  } catch (error) {
    console.log ('Error fetching users:',error.message);
    res.status(500).json({
      error : 'Error fetching users'
    });
  }
});

//PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป) U
app.put ('/users/:id', async (req,res) => {
  const id = req.params.id;
  const userModify = req.body; 
  try { // [] ใช้เพื่อเก็บข้อมูลที่จะส่งไปให้ server เป็น array
    const results = await conn.query('UPDATE users SET ? WHERE id = ?', [userModify,id]);
    res.json({
      message : 'Update user successfully',
      data : results[0]
    });
  } catch (error){
    console.error('Error update users:',error.message);
    res.status(500).json({
      error : 'Error update users'
    });
  }
});

//DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป) D
app.delete ('/users/:id', async (req,res) => {
  const id = req.params.id;
  try {
    const results = await conn.query('DELETE FROM users WHERE id = ?', id);
    res.json({
      message : 'Delete user successfully',
      data : results[0]
    });
  } catch (error){
    console.error ('Error delete users:',error.message);
    res.json({
      error : 'Error delete users'
    })
  }
});

app.listen(port, async (req, res) => {
  await initMySql(); // เรียกใช้งาน function initMySql
  console.log(`Server is running http://localhost:${port}`);
});
