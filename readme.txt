db.createUser({
    user: "test",
    pwd: "testPassword",
    roles: [{
        role: "readWrite",
        db: "test"
    }]
})