const studentData = [
    {
        name: "Riya Rana",
        email: "riya@example.com",
        phone: "1234567890",
        percentage: 85,
        hobbies: ["Reading", "TT", "Traveling"]
    },
    {
        name: "Ishita Chauhan",
        email: "ishita@example.com",
        phone: "2345678901",
        percentage: 70,
        hobbies: ["sleeping", "TT"]
    },
    {
        name: "Aayush",
        email: "aayush@example.com",
        phone: "7345678901",
        percentage: 23,
        hobbies: ["sleeping"]
    },
    {
        name: "Chetna gupta",
        email: "chetna@example.com",
        phone: "9345678901",
        percentage: 70,
        hobbies: ["badminton", "TT", "Traveling", "binge watch"]
    }
]

const saveBtn = document.getElementById('save-btn')
const cancelBtn = document.getElementById('cancel-btn')
const dataForm = document.getElementById('student-form')
const formContainer = document.getElementById('std-form')
const studentTable = this.document.querySelector('#student-table tbody');


function displayStudentData() {
    for (const student of studentData) {
        const row = this.document.createElement('tr');
        row.innerHTML = `<td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.phone}</td>
        <td>${student.percentage}</td>
        <td>${student.hobbies}</td>
        <td>${student.percentage > 40 ? 'PASS' : 'FAIL'}</td>
        `
        row.classList.add(student.percentage > 40 ? 'pass' : 'fail');
        studentTable.append(row)
    }
}

document.getElementById('add-btn').addEventListener('click', function () {
    formContainer.style.display = 'block'
})

cancelBtn.addEventListener('click', function () {
    formContainer.style.display = 'none'
})

dataForm.addEventListener('submit',function(e){
    e.preventDefault()

    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const phone = document.getElementById('phone').value
    const percentage = document.getElementById('percentage').value
    const hobbies = document.getElementById('hobbies').value.trim().split(',')
    // console.log(name,email, phone, percentage, hobbies)
    let len = hobbies.length
    if(len === 0 || len>5){
        alert("hobbies must be between 1 and 5")
        return;
    }

    const newStudentData = {
        name : name,
        email: email,
        phone: phone,
        percentage:percentage,
        hobbies: hobbies
    }

    studentData.push(newStudentData)

    const newdatarow = document.createElement('tr')
    
    newdatarow.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${percentage}</td>
        <td>${hobbies.join(', ')}</td>
        <td>${percentage > 40 ? 'PASS' : 'FAIL'}</td>
    `
    newdatarow.classList.add(percentage > 40 ? 'pass' : 'fail')
    studentTable.append(newdatarow)
    formContainer.style.display = 'none'
    dataForm.reset()
})

function updateRowColor(row, percentage) {
    row.classList.remove('pass', 'fail');
    row.classList.add(percentage > 40 ? 'pass' : 'fail');
}

function createInputField(cell, originalText) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = originalText;
    cell.textContent = '';
    cell.appendChild(input);

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    cell.appendChild(saveBtn);

    saveBtn.addEventListener('click', function() {
      const newValue = input.value;
      updateCellContent(cell, newValue);
      const row = cell.parentElement;
      const percentageCell = row.querySelector('td:nth-child(4)');
      const newPercentage = parseInt(percentageCell.textContent);
      row.classList.remove('pass', 'fail');
      row.classList.add(newPercentage > 40 ? 'pass' : 'fail');
    });
  }

function updateCellContent(cell, newValue) {
    cell.textContent = newValue;
}

studentTable.addEventListener('click', function(event) {
    const target = event.target;
    if (target.tagName === 'TD') {
      const originalText = target.textContent.trim();
      createInputField(target, originalText);

      // Update the content when the input field loses focus (onblur event)
      const inputField = target.querySelector('input');
      inputField.addEventListener('blur', function() {
        const newValue = inputField.value;
        updateCellContent(target, newValue);

        // Get the student row and update its background color
        const row = target.parentElement;
        const percentageCell = row.querySelector('td:nth-child(4)');
        const newPercentage = parseInt(percentageCell.textContent);
        row.classList.remove('pass', 'fail');
        row.classList.add(newPercentage > 40 ? 'pass' : 'fail');
      });
    }
 });

const ctaFailedBtn = document.getElementById('cta-fail');
 ctaFailedBtn.addEventListener('click', function() {
   displayStudentsByStatus('FAIL');
 });

 const ctaPassBtn = document.getElementById('cta-pass');
 ctaPassBtn.addEventListener('click', function() {
   displayStudentsByStatus('PASS');
 });

 function displayStudentsByStatus(status) {
    const rows = studentTable.getElementsByTagName('tr');
    for (const row of rows) {
      const percentageCell = row.querySelector('td:nth-child(4)');
      const percentage = parseInt(percentageCell.textContent);
      const pass = percentage > 40;
      row.style.display = status === 'PASS' ? (pass ? '' : 'none') : (pass ? 'none' : '');
    }
  }

 displayStudentData()