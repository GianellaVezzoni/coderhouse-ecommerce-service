export default class User {
  id;
  username;
  name;
  password;
  phone;
  roles;

  constructor({id,username, name, password, phone, roles}) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.password = password;
    this.phone = phone;
    this.roles = roles;
  }
}