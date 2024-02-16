export interface User {
  user_id: number;
  username: string;
  email: string;
  password: string;
  name: string;
  bio: string;
  avatar_url: string;
  github_url: string;
}

export const users: User[] = [
  {
    user_id: 1,
    username: "tickle122",
    email: "user1@mail.com",
    password: "$2b$10$08sjmFeFNNgdGhjq4Kig.OfDzLpXr/K.MoFI3ynd9EZlrbbOnVn5m",
    name: "Tom Tickle",
    bio: "I love cats and JavaScript!",
    avatar_url:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
    github_url: "https://github.com",
  },
  {
    user_id: 2,
    username: "happyamy2016",
    email: "user2@mail.com",
    password: "$2b$10$08sjmFeFNNgdGhjq4Kig.OfDzLpXr/K.MoFI3ynd9EZlrbbOnVn5m",
    name: "Amy Happy",
    bio: "I am a Junior Developer",
    avatar_url:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
    github_url: "https://github.com",
  },
  {
    user_id: 3,
    username: "grumpy19",
    email: "user3@mail.com",
    password: "$2b$10$08sjmFeFNNgdGhjq4Kig.OfDzLpXr/K.MoFI3ynd9EZlrbbOnVn5m",
    name: "Paul Smith",
    bio: "I am a Senior Developer",
    avatar_url:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
    github_url: "https://github.com",
  },
  {
    user_id: 4,
    username: "sasha",
    email: "sasha@mail.com",
    password: "$2b$10$08sjmFeFNNgdGhjq4Kig.OfDzLpXr/K.MoFI3ynd9EZlrbbOnVn5m",
    name: "Sasha Smith",
    bio: "I am a Senior Developer",
    avatar_url:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
    github_url: "https://github.com",
  },
  {
    user_id: 4,
    username: "sasha2",
    email: "sasha1@mail.com",
    password: "$2b$10$08sjmFeFNNgdGhjq4Kig.OfDzLpXr/K.MoFI3ynd9EZlrbbOnVn5m",
    name: "Sasha Smith",
    bio: "I am a Senior Developer",
    avatar_url:
      "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
    github_url: "https://github.com",
  },
];
