// let user = {
//   name: "Ritik",
//   age: 44,
//   childObj: {
//     newName: "Pathak",
//     getDetails: () => {
//       console.log(this.name);
//     },
//   },
// };

// user.childObj.getDetails()

// class User{
//     constructor(name){
//         this.name = name
//     }
//     getName(){
//         console.log(this.name)
//     }
// }

// const users = new User("Piyush");
// users.getName()

const user = {
  firstName: "Ritik",
  getName() {
    const firstName = "Pathak";
    return this.firstName;
  },
};
console.log(user.getName())
