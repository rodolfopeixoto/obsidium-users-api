const firebase = require('./../config/firebaseConfig');
module.exports = {
  async call(email, password, passwordConfirmation, name, response){
    this.checkPasswordConfirmation(password, passwordConfirmation, response);
    this.signInNewUser(email, password, name, response);
  },
  async signInNewUser(email, password, name, response){
    const auth = firebase.auth();
      try {
        record = await auth.createUserWithEmailAndPassword(email, password);
        status = await this.createUser(record.user.uid, email, name, response);
        response.status(200).json({
          message: 'Create with successufuly'
        })
      }
      catch(error){
        response.status(404).json({ 
          error: error.message,
        })
      }
  },

  async createUser(userId, email, name, response){
      
      if(userId !== false){
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
            userStatus = [ 404, { error: `Data could not be saved. ${error}` }];
            return userStatus;
          }else{
            userStatus = [ 200, { message: 'Data saved successfully.' }];
            
            return userStatus;
          }
        });
        return userStatus;
      }
      
  },

  async checkPasswordConfirmation(password, passwordConfirmation, response){
    if(password !== passwordConfirmation)
    { 
      response.status(404).json({ error: 'Password and Password Confirmation is different.' });
    }
  },

  async editCurrentUser(){
    const userId = firebase.auth().onAuthStateChanged( (user) => {
      if(user){
        console.log('user.uid',user.uid);
      }else{
        console.log('You dont logged')
      }
    })
    // console.log('userId', userId);
    // const referencePath = `/users/${userId}`;
    // const userReference = firebase.database().ref(referencePath);
  }
  // ,

  // async destroyCurrentUser(){

  // }
}