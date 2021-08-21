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

type Tweet = {
  id: string;
  text: string;
  createAt: string;
  userId: string
}

export async function getAll() {
  return Promise.all(
    tweets.map( async (tweet) => {
      const { username, name, url } = await userRepository.findById(tweet.userId);
      return { ...tweet, username, name, url};
    })
  )
}

export async function getAllByUsername(username: string){
  return getAll().then((tweets)=> {
    tweets.filter((tweets) => tweets.username === username);
  })
}

export async function getById(id: string) {
  const found = tweets.find((tweet) => tweet.id === id);
  if (!found) {
    return null;
  }
  const { username, name, url } = await userRepository.findById(found.userId);
  return { ...found, username, name, url };
}

export async function create(text: string, userId: string) {
  const tweet: Tweet = {
    id: new Date().toString(),
    text,
    createAt: new Date().toString(),
    userId,
  }
  tweets = [tweet, ...tweets];
  return getById(tweet.id);
}

export async function update(id: string, text: string) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if(tweet) {
    tweet.text = text;
  }
  return getById(tweet!.id);
}

export async function remove(id: string) {
  const tweet = tweets.filter((tweet) => tweet.id !== id);
  return tweet;
}