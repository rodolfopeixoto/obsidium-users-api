const firebase = require('./../config/firebaseConfig');

module.exports = {
  async index(request, response){
    const userReference = firebase.database().ref('users/');

    userReference.on('value',
      (snapshot) => {
        console.log(snapshot.val());
        response.json(snapshot.val());
        userReference.off('value');
      },
      (errorObject) => {
        const errorMessage = `The read failed: ${errorObject.code}`
        console.log(errorMessage);
        response.send(errorMessage)
      }
    );
  }
}