const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
// seed data
  let users;
  beforeEach( () => {
    users = new Users();
    users.users = [
      {
        id: 111,
        name: 'Hailee',
        room: 'Rappers'
      },


      {
        id: 222,
        name: 'Avicii',
        room: 'Sneaker Heads'
      },
      {
        id: 333,
        name: 'Sierra',
        room: 'Rappers'
      }
    ];
  });


  it ('should add a new user', () => {
    let users = new Users();
    let user = {
      id: '777',
      name: 'Huncho',
      room: 'crazy motherfuckers!'
    }

    let resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it ('should return users who are in the rappers room', () => {
    let room = users.getUsersList('Rappers');
    expect(room).toEqual(['Hailee', 'Sierra']);
  });

  it ('should return users who is in the sneaker heads room', () => {
    let room = users.getUsersList('Sneaker Heads');
    expect(room).toEqual(['Avicii']);
  });

  it ('should remove a user with valid ID', () => {
    let user = users.removeUser(111);

    expect(user.id).toBe(111);
    expect(users.users.length).toBe(2);
  });

  it ('should not remove a user with invalid ID', () => {
    let user = users.removeUser(411);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it ('should return a user with valid ID', () => {
    let user = users.getUser(111);

    expect(user.id).toBe(111);
  });

  it ('should not return a user with invalid ID', () => {
    let user = users.getUser(411);

    expect(user).toNotExist();
  });

});