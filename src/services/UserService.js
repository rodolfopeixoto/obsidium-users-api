const firebase = require('./../config/firebaseConfig');
module.exports = {
  async call(email, password, passwordConfirmation, name, response){
    this.checkPasswordConfirmation(password, passwordConfirmation, response);
    const userId = this.signInNewUser(email, password, response);
    const userStatus = this.createUser(userId, email, name, response);
    return userStatus
  },
  async signInNewUser(email, password, response){
    const auth = firebase.auth();
    let userId = '';
      
    auth.createUserWithEmailAndPassword(email, password)
    .then( (record) => {
      userId = record.user.uid;
    })
    .catch( error => {
      response.status(404).json({ 
        error: error.message,
      })
      console.error(error.message);
      response.end();
    });
    if(!userId) return userId;
    return false;
  },

  async createUser(userId, email, name, response){
      
      if(!userId){
        const referencePath = `/users/${userId}`;
        const userReference = firebase.database().ref(referencePath);
        let userStatus = [];
  
        userReference.set({
          email,
          name,
          photoUrl: ''
        },
        (error) => {
          if(error) {
            // response.status(404).send({ error: `Data could not be saved. ${error}` });
            userStatus = [ 404, { error: `Data could not be saved. ${error}` }];
            return userStatus;
          }else{
            // response.status(200).send({ message: 'Data saved successfully.' });
            userStatus = [ 200, { message: 'Data saved successfully.' }];
            
            return userStatus;
          }
        });
        return userStatus;
      }
    
      return false;
      
  },

  async checkPasswordConfirmation(password, passwordConfirmation, response){
    if(password !== passwordConfirmation)
    { 
      response.status(404).json({ error: 'Password and Password Confirmation is different.' });
      response.end();
    }
  }
}