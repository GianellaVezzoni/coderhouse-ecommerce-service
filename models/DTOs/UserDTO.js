export default class UserDTO {
  constructor({id, username, name, password, phone, roles}) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.password = password;
    this.phone = phone;
    this.roles = roles;
  }
}

export function transformToDTO_User(users){
  if (Array.isArray(users)) {
    return users.map((user) => new UserDTO(user));
  } else {
    return new UserDTO(users);
  }
}