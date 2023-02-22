const users = [];

// Join user to chat
function userJoin(id, username) {
    const user = {id, username};
    if (user && user.username) {
        users.push(user);
    }
    return user;
}
// User leaves chat
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}
// Get users 
function getUsers() {
    const onlineUsers = users.map(user => user.username);
    return onlineUsers;
}

// Get current user
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getUsers
}