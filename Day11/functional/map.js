const avengers = [
  {
    fname: 'Tony',
    lname: 'Stark',
    email: 'tony@avenger.com',
    nickName: 'Iron Man',
    power: 5,
  },
  {
    fname: 'Steve',
    lname: 'Roger',
    email: 'captain@avenger.com',
    nickName: 'Captain America',
    power: 4.5,
  },
  {
    fname: 'Bruce',
    lname: 'Banner',
    email: 'bruce@avenger.com',
    nickName: 'Hulk',
    power: 6,
  },
  {
    fname: 'Thor',
    lname: 'odinson',
    email: 'thor@avenger.com',
    nickName: 'Thor',
    power: 4.5,
  },
  {
    fname: 'Stephen',
    lname: 'strange',
    email: 'strange@avenger.com',
    nickName: 'Doctor Strange',
    power: 6,
  },
  {
    fname: 'Peter',
    lname: 'Parker',
    email: 'spidy@avenger.com',
    nickName: 'Spider',
    power: 4,
  },
];

//
const avengerFname = avengers.map((avenger) => {
  return avenger.fname;
});
// console.log("fname :", avengerFname)

const students = [
  {
    name: 'john',
    id: 1,
    marks: [
      {
        name: 'physics',
        mark: 80,
      },
      {
        name: 'Chemistry',
        mark: 70,
      },
    ],
  },
  {
    name: 'doe',
    id: 1,
    marks: [
      {
        name: 'physics',
        mark: 80,
      },
      {
        name: 'Chemistry',
        mark: 70,
      },
    ],
  },
];

for (let i = 0; i < students.length; ++i) {
  let student = students[i];
  let totalMarks = student.marks.reduce((acc, curr) => acc + curr.mark, 0);
  let newStudent = {
    name: student.name,
    avg: totalMarks / student.marks.length,
  };
}
