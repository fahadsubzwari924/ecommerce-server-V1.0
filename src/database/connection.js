var mongoose = require('mongoose');
import config from '../conf';

export function connectToDatabase() {
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://' + config.database.host + ':' + config.database.port + '/' + config.database.name, { useNewUrlParser: true })
    .then(resp => {
      if (resp) {
        resolve(resp) 
      } else {
        console.log('Unable to connect to Database')
        resolve(null)
      }
    }).catch(ex => {
      console.log(ex)
      console.log('Unable to connect to Database')
      resolve(null)
    })
  })
}
