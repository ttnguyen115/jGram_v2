let users = [];

const SocketServer = (socket) => {
    // Connect - Disconnect
    socket.on('joinUser', user => {
        users.push({ id: user._id, socketId: socket.id, followers: user.followers });
    });

    socket.on('disconnect', () => {
        const data = users.find(user => user.socketId === socket.id);
        if (data) {
            const clients = users.filter(user => 
                data.followers.find(item => item._id === user.id)   
            )

            if (clients.length > 0) {
                clients.forEach(client => {
                    socket.to(`${client.socketId}`).emit('CheckUserOffline', data.id)
                })
            }
        }

        users = users.filter(user => user.socketId !== socket.id);
    });

    // Likes
    socket.on('likePost', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id];
        const clients = users.filter(user => ids.includes(user.id));
        
        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('likeToClient', newPost)
            })
        }
    })

    socket.on('unlikePost', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id];
        const clients = users.filter(user => ids.includes(user.id));
        
        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('unlikeToClient', newPost)
            })
        }
    })

    // Comments
    socket.on('createComment', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id];
        const clients = users.filter(user => ids.includes(user.id));
        
        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('createCommentToClient', newPost)
            })
        }
    })

    socket.on('deleteComment', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id];
        const clients = users.filter(user => ids.includes(user.id));
        
        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('deleteCommentToClient', newPost)
            })
        }
    })
    
    // Follow - Unfollow
    socket.on('follow', newUser => {
        const user = users.find(user => user.id === newUser._id)
        user && socket.to(`${user.socketId}`).emit('followToClient', newUser);
    })

    socket.on('unfollow', newUser => {
        const user = users.find(user => user.id === newUser._id)
        user && socket.to(`${user.socketId}`).emit('unfollowToClient', newUser);
    })
    
    // Notifications
    socket.on('createNotify', msg => {
        const clients = users.filter(user => msg.recipients.includes(user.id));
        
        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('createNotifyToClient', msg)
            })
        }
    })
    
    socket.on('deleteNotify', msg => {
        const clients = users.filter(user => msg.recipients.includes(user.id));
        
        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('deleteNotifyToClient', msg)
            })
        }
    })

    // Message
    socket.on('addMessage', msg => {
        const user = users.find(user => user.id === msg.recipient);
        user && socket.to(`${user.socketId}`).emit('addMessageToClient', msg);
    })

    //  Check Online/Offline
    socket.on('checkUserOnline', data => {
        const following = users.filter(user => 
            data.following.find(item => item._id === user.id)
        );

        socket.emit('checkUserOnlineToMe', following);

        const clients = users.filter(user => 
            data.followers.find(item => item._id === user.id)
        )

        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('checkUserOnlineToClient', data._id)
            })
        }
    });
}

module.exports = SocketServer;