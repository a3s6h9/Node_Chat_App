class Users {
  constructor() {
    this.users = [];
  }
// add the user to the room
  addUser(id, name, room) {
    let user = {id, name, room}
    this.users.push(user);

    return user;
  }

  removeUser(id) {
    let users = this.getUser(id);

    if (users) {
      this.users = this.users.filter( user => user.id !== id); 
    }

    return users;
  }

  getUser(id) {
    return this.users.filter( user => user.id === id) [0];
  }

  getUsersList(room) {
// get the list of users whose room is same the arg room, return a array
    let users = this.users.filter( user => user.room === room);
// get the name only by mapping the array and return the array wich has just names
    let namesArray = users.map( user => user.name);

    return namesArray;
  }
}

module.exports = {Users};