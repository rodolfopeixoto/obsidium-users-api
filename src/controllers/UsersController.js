const firebase = require('./../config/firebaseConfig');
const UserService = require('./../services/UserService');

module.exports = {
  async index(request, response){
    const userReference = firebase.database().ref('users/');

    userReference.on('value',
       (snapshot) => {
         response.json(snapshot.val());
         userReference.off('value');
       },
       (errorObject) => {
         const errorMessage = `The read failed: ${errorObject.code}`
         response.send({ error: errorMessage });
       }
     );
  },

  async signUp(request, response){
    const { email, password, passwordConfirmation, name  } = request.body;
    
    userStatus = UserService.call(email, password, passwordConfirmation, name, response);
    
    userStatus.then((result) => {
      if(result !== false) response.status(result[0]).json(result[1])
    }).catch((error) => {
      console.error('Error: ', error);
    });
  }
}