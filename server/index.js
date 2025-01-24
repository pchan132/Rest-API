const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");

// สร้าง url
app.listen(port, (req, res) => {
  console.log(`Server is running on http://localhost:${port}`);
});

/*
GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
GET /users/:id สำหรับการดึง users รายคนออกมา
PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
 */

app.use(bodyParser.json());

let users = [];
let counter = 1; // สร้างตัวแปล id ใช้ สำหรับ เพิ่ม id ในแต่ละ ข้อมูล

//GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา\
// get ใช้สำหรับ แสดงข้อมูล ออกมา มี json text html
app.get("/users", (req, res) => {
  // ส่งข้อมูล user ออกไป json
  res.json(users);
});

//POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
//post ใช้ สำหรับ ใส่ข้อมูล ไป ที่ databses
app.post("/users", (req, res) => {
  let user = req.body;
  user.id = counter++; // เพิ่ม id ใหม่ในข้อมูล user และ บวก 1 ที่ครั้งที่เพิ่ม ข้อมูล
  console.log(user);
  // เอาค่าที่ได้จาก body ในตัวแปร user ไปใส่ใน ตัวแปร users ที่เป็น Array
  users.push(user);
  // ส่งเป็น json ออกไป
  res.json({
    message: "OK",
    user: user,
  });
  /**  ส่ง ข้อมูลเป็น  json 
    {
        "message": "OK",
        "user": {
            "firstname": "ชื่อจริง",
            "lastname": "นามสกุล"
        }
    }*/
});

//put การเรียก ชื่อ ผ่าน params id
// put ใช้ สำหรับ อัพเดทข้อมูล ก้อน json
app.put("/user/put/:id", (req, res) => {
  // เก็บ ไว้ใน ตัวแปร  id
  let id = req.params.id;
  // สร้างตัวแปรสำหรับ รับข้อมูล จาก body ใช้สำหรับ update user
  let updateUser = req.body;
  // เลือก user ตาม id
  /* สร้างตัว แปร selectedIndex โดย
        มี users ที่เป็น เก็บ ข้อมูลเป็น Array 
        มี methods ที่ ชื่อ findIndex คือ หาตำแหน่ง ในข้อมูล Array
    */
  let selectedIndex = users.findIndex((user) => user.id == id);

  /*ใน users ที่เก็บข้อมูลเป็น Array ชี้ไปที่ ตำแหน่ง Index ที่รับ เข้ามา
    จาก ตัวแปร selectedIndex = เป็น ข้อมูลใหม่ที่ได้รับจาก req.body */
  // users[selectedIndex] = updateUser;
  /* สำหรับเปลี่ยน บาง ฟิว หรือ poperty ใน json บางตัว 
    หรือ จะใช้ patch*/
  // users[selectedIndex].firstname = updateUser.firstname
  // users[selectedIndex].lastname = updateUser.lastname
  /* สำหรับ อัพเดท แต่เมื่อ ใส่ข้อมูล ไม่ครบ ก็จะใช้ข้อมูลเดิม */
  users[selectedIndex].firstname =
    updateUser.firstname || users[selectedIndex].firstname;
  users[selectedIndex].lastname =
    updateUser.lastname || users[selectedIndex].lastname;
  //     // เช็ค id ในข้อมูล user กับ id ที่ส่งมา แบบเต็ม
  //     if (user.id == id){
  //         return true;
  //     } else {
  //         return false;
  //     }
  // });

  // update ข้อมูล user

  // res.send รับได้แค่ string แปลง selectedIndex ที่รับ ค่าตัวเลขมา ให้เป็น
  // string และ ส่งออกไป ใช้ + ''
  // res.send(selectedIndex + '');
  res.json({
    // ส่งข้อมูล ให้ เพิ่ม message เข้าใปใน json
    message: "user updated successfully",
    //  เป็น object ซ้อน object
    // แสดงข้อมูล date
    data: {
      user: updateUser,
      indexUpdate: selectedIndex,
    },
  });
});

// ใช้ patch
// idea patch มี ฟิวนั้น ค่อยทำ
app.patch("/user/patch/:id", (req, res) => {
  let id = req.params.id; // สำหรับ รับ id ใน /user/patch/:id
  let updateUser = req.body; // รับข้อมูล จาก body
  let selectedIndex = users.findIndex((user) => user.id == id);

  //   let selectedIndex = users.findIndex((user) => user.id == id); // หา index ของ user ที่มี id ตรงกับ id ที่ส่งมา
  // update ข้อมูล
  /* เมื่อ ข้อมูล ที่ส่งเข้า มา มี firstname ให้ทำ การ update ข้อมูล firstname */
  if (updateUser.firstname) {
    users[selectedIndex].firstname = updateUser.firstname;
  }
  if (updateUser.lastname) {
    users[selectedIndex].lastname = updateUser.lastname;
  }

  res.json({
    massage: "patch update user successfully",
    data: {
      user: updateUser,
      indexUpdate: selectedIndex,
    },
  });
});

//delete
app.delete("/delete/:id", (req, res) => {
  let id = req.params.id; // รับ id ใน /delete/:id
  let selectedIndex = users.findIndex((user) => user.id == id);
  users.splice(selectedIndex, 1);
  res.json({
    message: "user deleted successfully",
    index: selectedIndex,
  });
});
