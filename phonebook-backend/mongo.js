const mongoose = require("mongoose")

if (process.argv.length<3) {
  console.log('need password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://harryhood:${password}@fullstack.zhrjxkb.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=fullstack`

mongoose.set("strictQuery", false)

mongoose.connect(url)

const personSchema = new mongoose.Schema ({
  name: String,
  number: String
})



const Person = mongoose.model("Person", personSchema)

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save()
  .then(person => {
    console.log(`added ${person.name} with number of ${person.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({})
  .then(persons => {
    console.log("phonebook:")
    persons.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })

    mongoose.connection.close()
  })
}