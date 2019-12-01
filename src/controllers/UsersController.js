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
    try {
      const { email, password  } = request.body;
      const auth = firebase.auth();
        auth.createUserWithEmailAndPassword(email, password)
          .then( (record) => {
            console.log('Record', record)
            const { user } = record;
            console.log('user', user)
            const { uid } = user;
            return response.status(201).send({uid});
          }).catch( (error) => {
            return handleError(response, error);
          })
    }catch(error) {
      return handleError(response, error)
    }
    
  },

  async edit(request, response){
    const { name, email, photoURL } = request.body;
    
    UserService.editCurrentUser();

  },

  async destroy(request, response){
    
  }
}


function handleError(response, error) {
  console.log('Eita',error.code)
  console.log('Eita',error.message)
  return response.status(404).send({ code: error.code, message: error.message });
}