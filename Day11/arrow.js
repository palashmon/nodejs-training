function sum(x, y) {
  return x + y;
}

//convert it to arrow function

function Person(fname, lname) {
  this.fname = fname;
  this.lname = lname;
  this.fullName = '';
  this.setName = function () {
    setTimeout(function () {
      console.log('fname: ', this.fname);
      console.log('lname: ', this.lname);
      this.fullName = `${this.fname} ${this.lname}`;
    });
  };
}

// don't use arrow function
// function Sequence() {
//   this.currVal = 0;
// }
// Sequence.prototype.next = () => this.currVal += 1;
// Sequence.prototype.curr = () => this.currVal;
