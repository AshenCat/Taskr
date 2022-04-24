const local = process.env.MONGOHOST || "mongodb://localhost:27017/TaskrTEST"

module.exports = {db: local}