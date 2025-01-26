const  submitData = async() => {
  let firstNameDOM = document.querySelector('input[name=firstname]')
  let lastNameDOM = document.querySelector('input[name=lastname]')
  let ageDOM = document.querySelector('input[name=age]')
  // มี :checked เพื่อเลือกเฉพาะที่เป็น radio button ที่ถูก check อยู่ 
  let genderDOM = document.querySelector('input[name=gender]:checked')
  // มี :checked เพื่อเลือกเฉพาะที่เป็น checkbox ที่ถูก check อยู่
  let interestDOMs = document.querySelectorAll('input[name=interest]:checked')

  let descriptionDOM = document.querySelector('textarea[name=description]')

  let interest = ''

  for (let i = 0; i < interestDOMs.length; i++) {// วนลูปเพื่อดึงค่า value ของ interestDOMs มาเก็บไว้ใน interest
    interest += interestDOMs[i].value // ดึงค่า value ของ interestDOMs มาเก็บไว้ใน interest
    if (i != interestDOMs.length - 1) { // ไม่ให้มี , ต่อท้ายเมื่อเป็นตัวสุดท้าย
      interest += ', '
    }
  }

  let userData = {
    id : 10,
    firstname: firstNameDOM.value,
    lastname: lastNameDOM.value,
    age: ageDOM.value,
    gender: genderDOM.value,
    interests: interest,
    description: descriptionDOM.value
  }

  console.log('submit data', userData)
  // ส่งข้อมูลไปที่ server
  const response = await axios.post('http://localhost:8000/users', userData)
  console.log('response', response.data)
}