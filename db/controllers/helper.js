exports.serializeMongooseObject = (mongooseData) => {
    if (!(typeof mongooseData === 'object' && mongooseData !== null))
        throw 'Argument must be an object!'

    if (Array.isArray(mongooseData)) {
        for(item of mongooseData) {
            for(prop in item) {
                if (prop === '_id') {
                    item[prop] = item[prop].toString();
                }
                else if (Array.isArray(prop)) {
                    this.serializeMongooseObject(mongooseData[prop])
                }
            }
        }
    } else {
        for(prop in mongooseData) {
            if (prop === '_id') {
                mongooseData[prop] = mongooseData[prop].toString();
            }
            else if (Array.isArray(mongooseData[prop])) {
                this.serializeMongooseObject(mongooseData[prop])
            }
        }
    }
    return mongooseData;
}