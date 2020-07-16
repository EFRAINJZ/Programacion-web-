import firebase from 'firebase';
import 'firebase/firestore';

var config = {
   apiKey: "AIzaSyAhLgM3JP1Q4OYmWdvkDodnuw-nKySFpKg",
  authDomain: "crud-bd8cd.firebaseapp.com",
  databaseURL: "https://crud-bd8cd.firebaseio.com",
  projectId: "crud-bd8cd",
  storageBucket: "crud-bd8cd.appspot.com",
  messagingSenderId: "55596197234",
  appId: "1:55596197234:web:ad7ba5aa8af1fb176829eb"

};
firebase.initializeApp(config);


export default firebase;
