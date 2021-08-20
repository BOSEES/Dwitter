type User = {
  id?:string;
  username:string;
  password:string;
  name:string;
  email:string;
  url:string;
}

let users: User[] = [
  {
    id: "1",
    username: "duddlf",
    password: "1234",
    name:"duddlf",
    email: "duddlf@nawdr.com",
    url: "asdaw"
  },
];

export async function findByUsername(username: string) {
  return users.find((user) => user.username === username);
}

export async function createUser(user: User) {
  const created = { ...user, id: Date.now().toString()};
  users.push(created);
  return created.id;
}