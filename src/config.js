module.exports = {
    port: process.env.PORT || 3001,
    db: process.env.MONGODB_URI || 'mongodb+srv://wmata141:20840141@cluster0.gzeis.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    SECRET_TOKEN: 'miclavedetokens'
}