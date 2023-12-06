interface User {
    user_id: number;
    username: string;
    email: string;
    password: string;
    name: string;
    bio: string;
    avatar_url: string;
}

export const users: User[] = [
    {
        user_id: 1,
        username: 'tickle122',
        email: 'user1@mail.com',
        password: 'password',
        name: 'Tom Tickle',
        bio: 'I love cats and JavaScript!',
        avatar_url: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'
    },
    {
        user_id: 2,
        username: 'happyamy2016',
        email: 'user2@mail.com',
        password: 'password',
        name: 'Amy Happy',
        bio: 'I am a Junior Developer',
        avatar_url: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'
    },
    {
        user_id: 3,
        username: 'grumpy19',
        email: 'user3@mail.com',
        password: 'password',
        name: 'Paul Smith',
        bio: 'I am a Senior Developer',
        avatar_url: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'
    },
];