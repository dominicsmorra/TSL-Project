const user = {
    username: 'guest',
}

export const setUser = (u) => {
    user.username = u
}

export const getUser = () => {
    return user
}