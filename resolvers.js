const user = {
  _id: '1',
  name: 'Matthew',
  email: 'matthew.yeedev@gmail.com',
  picture: 'https://cloudinary.com/asdf'
}


module.exports = {
  Query: {
    me: () => user
  }
}