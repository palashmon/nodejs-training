function studentInfo() {

  let user = await getUserFromDB(1);
  let student = await getStudent(1);
  let fname = user.fname;
  let lname = user.lname;
  // says
  fname = student.fname;
  lname = student.lname;

  return {
    fname,
    lname
  }
}

console.log("info :", studentInfo());
