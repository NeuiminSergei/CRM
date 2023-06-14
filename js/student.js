class Student {
  constructor(name, surname, patronymic, birthday, yearOfStudy, faculty) {
    this.name = name,
      this.surname = surname,
      this.patronymic = patronymic,
      this.birthday = birthday,
      this.yearOfStudy = yearOfStudy,
      this.faculty = faculty
  }

  get fio() {
    return this.surname + ' ' + this.name + ' ' + this.patronymic
  }

  getStudyPeriod() {
    let currentTime = new Date().getFullYear()
    let years = currentTime - this.yearOfStudy
    let period
    if (years > 4) {
      period = `${this.yearOfStudy} - ${this.yearOfStudy + 4} (закончил)`
    } else {
      period = `${this.yearOfStudy} - ${this.yearOfStudy + 4}  (${years} курс)`
    }
    return period
  }

  getYearEnding() {
      return this.yearOfStudy + 4
  }

  getBirthDateString() {
    const yyyy = this.birthday.getFullYear()
    let mm = this.birthday.getMonth() + 1
    let dd = this.birthday.getDate()

    if (dd < 10) dd = '0' + dd
    if (mm < 10) mm = '0' + mm

    return dd + '.' + mm + '.' + yyyy
  }

  getAge() {
    const today = new Date()
    let age = today.getFullYear() - this.birthday.getFullYear()
    let m = today.getMonth() - this.birthday.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < this.birthday.getDate())) {
      age--
    }
    return age
  }
}

export default Student
