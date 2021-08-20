import * as userRepository from "./auth";

let tweets = [
  {
    id: "1",
    text: "얍ㅑ얍ㅑ",
    createAt: new Date().toString(),
    userId: "1",
  },
  {
    id: "2",
    text: "끼엿",
    createAt: new Date().toString(),
    userId:"1"
  }
]

export async function getAll() {
  return Promise.all(
    tweets.map( async (tweet) => {
      const { username, name, url } = await userRepository.findById(tweet.userId);
      return { ...tweet, username, name, url};
    })
  )
}

export async function getAllByUsername(username: string){
  return tweets.filter((tweet) => tweet.username === username);
}

export async function getById(id: string) {
  return tweets.find((tweet) => tweet.id === id);
}

export async function create(text: string ,name: string, username: string) {
  const tweet = {
    id: Date.now().toString()+"1",
    text:text,
    name: name,
    username: username,
    createAt: Date.now().toString(),
    url: "임시"
  }
  tweets = [tweet, ...tweets];
  return tweet
}

export async function update(id: string, text: string) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if(tweet) {
    tweet.text = text;
  }
  return tweet;
}

export async function remove(id: string) {
  const tweet = tweets.filter((tweet) => tweet.id !== id);
  return tweet;
}