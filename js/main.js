import Student from "./student.js"

const students = [
  new Student('Александр', 'Панфилов', 'Матвеевич', new Date(1999, 10, 14), 2020, 'Филологический'),
  new Student('Константин', 'Носов', 'Вячеславович', new Date(1992, 6, 29), 2017, 'Исторический'),
  new Student('Игорь', 'Григорьев', 'Юрьевич', new Date(1994, 2, 18), 2018, 'Юридический'),
  new Student('Мария', 'Яковлева', 'Олеговна', new Date(2000, 7, 7), 2021, 'Юридический'),
  new Student('Екатерина', 'Лапина', 'Федоровна', new Date(1998, 6, 21), 2019, 'Политологии'),
]

const $studentsList = document.getElementById('students-list')
const $studentsListTh = document.querySelectorAll('th')

let column = 'fio',
  columnDir = true;

const fioFilter = document.getElementById('fio-filter'),
  yearOfStudyFilter = document.getElementById('yearOfStudy-filter'),
  yearOfEndStudyFilter = document.getElementById('yearOfEndStudy-filter'),
  facultyFilter = document.getElementById('faculty-filter');

  fioFilter.addEventListener('input', () => {
    render()
  })
  yearOfStudyFilter.addEventListener('input', () => {
    render()
  })
  yearOfEndStudyFilter.addEventListener('input', () => {
    render()
  })
  facultyFilter.addEventListener('input', () => {
    render()
  })

function newStudentTR(student) {
  const $studentTR = document.createElement('tr'),
    $fioTD = document.createElement('td'),
    $birthdayTD = document.createElement('td'),
    $yearOfStudyTD = document.createElement('td'),
    $facultyTD = document.createElement('td')

  $fioTD.textContent = student.fio
  $birthdayTD.textContent = student.getBirthDateString() + ' (' + student.getAge() + ' лет)'
  $yearOfStudyTD.textContent = student.getStudyPeriod()
  $facultyTD.textContent = student.faculty

  $studentTR.append($fioTD)
  $studentTR.append($birthdayTD)
  $studentTR.append($yearOfStudyTD)
  $studentTR.append($facultyTD)

  return $studentTR
}

function sortStudents(prop, dir) {
  const studentsCopy = [...students]
  return studentsCopy.sort((studentA, studentB) => {
    if ((!dir == false ? studentA[prop] < studentB[prop] : studentA[prop] > studentB[prop]))
      return -1
  })
}

function filter(arr, prop, value) {
  let result = [],
    copy = [...arr]
  for (const item of copy) {
    if (String(item[prop]).toLowerCase().includes(value.toLowerCase())) result.push(item)
  }
  return result
}

function render() {
  let studentsCopy = [...students]

  for (const student of studentsCopy) {
    student.fullName = student.surname + ' ' + student.name + ' ' + student.patronymic
    student.studyEnd = student.getYearEnding()
  }

  $studentsList.innerHTML = ''

  const fioVal = document.getElementById('fio-filter').value,
    yearOfEndStudyVAl = document.getElementById('yearOfEndStudy-filter').value,
    yearOfStudyVal = document.getElementById('yearOfStudy-filter').value,
    facultyVal = document.getElementById('faculty-filter').value

  studentsCopy = sortStudents(column, columnDir)

  if (fioVal !== '') studentsCopy = filter(studentsCopy, 'fullName', fioVal)
  if (yearOfEndStudyVAl !== '') studentsCopy = filter(studentsCopy, 'studyEnd', yearOfEndStudyVAl)
  if (yearOfStudyVal !== '') studentsCopy = filter(studentsCopy, 'yearOfStudy', yearOfStudyVal)
  if (facultyVal !== '') studentsCopy = filter(studentsCopy, 'faculty', facultyVal)

  for (const student of studentsCopy) {
    $studentsList.append(newStudentTR(student))
  }
}

$studentsListTh.forEach(el => {
  el.addEventListener('click', function () {
    column = this.dataset.column
    columnDir = !columnDir
    render()
  })
})

function validation(form) {
  let result = true

  function removeError(input) {
    const parent = input.parentNode
    if (parent.classList.contains('error')) {
      parent.querySelector('.error-block').remove()
      parent.classList.remove('error')
    }
  }

  function createError(input, text) {
    const parent = input.parentNode,
      errorMessage = document.createElement('div')

    errorMessage.classList.add('error-block')
    errorMessage.textContent = text
    parent.classList.add('error')
    parent.append(errorMessage)
  }

  function getDate() {
    let currentDate = new Date()
    let yyyy = currentDate.getFullYear()
    let mm = currentDate.getMonth() + 1
    let dd = currentDate.getDate()

    if (dd < 10) dd = '0' + dd
    if (mm < 10) mm = '0' + mm

    return yyyy + '-' + mm + '-' + dd
  }

  form.querySelectorAll('.inp').forEach(inp => {
    removeError(inp)
    if (inp.value == '') {
      result = false
      createError(inp, 'Поле не заполнено')
    }

    if (inp.classList.contains('inp-birthday')) {
      removeError(inp)
      let currentDate = getDate()
      if (inp.value < '1900-01-01' || inp.value > currentDate) {
        result = false
        createError(inp, 'Неверная дата')
      }
    }

    if (inp.classList.contains('inp-study')) {
      removeError(inp)
      let currentDate = new Date().getFullYear()
      if (inp.value < '2000' || inp.value > currentDate) {
        result = false
        createError(inp, 'Неверная дата')
      }
    }
  })

  return result
}

document.getElementById('add-student').addEventListener('submit', function (event) {
  event.preventDefault()
  let inputName = document.getElementById('input-name'),
    inputSurname = document.getElementById('input-surname'),
    inputPatronymic = document.getElementById('input-patronymic'),
    inputBirthday = document.getElementById('input-birthday'),
    inputYearOfStudy = document.getElementById('input-yearOfStudy'),
    inputFaculty = document.getElementById('input-faculty')

  if (validation(this) == true) {

    students.push(new Student(
      inputName.value,
      inputSurname.value,
      inputPatronymic.value,
      new Date(inputBirthday.value),
      Number(inputYearOfStudy.value),
      inputFaculty.value
    ))

    render()

    inputName.value = ''
    inputSurname.value = ''
    inputPatronymic.value = ''
    inputBirthday.value = ''
    inputYearOfStudy.value = ''
    inputFaculty.value = ''

  }
})

render()
