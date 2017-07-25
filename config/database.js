const crypto = require('crypto').randomBytes(256).toString('hex');
/*
crypto.randomBytes(256, (err, buf) => {
    if (err) {
        throw err;
    }
    console.log(`${buf.length} bytes of random data ${buf.toString('hex')}`);
})
*/

module.exports = {
    uri: 'mongodb://localhost:27017/' + this.db,
    secret: crypto,
    db: 'mean-angular-2'
}