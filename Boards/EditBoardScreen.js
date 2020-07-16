import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '../firebasedb';

class EditBoardScreen extends Component {
 
  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');

    this.state = {
      key: '',
      isLoading: true,
      title: '',
      description: '',
      author: ''
    };
  }
  componentDidMount() {
    const { route, navigation } = this.props;
    const {boardkey}=route.params;

    console.log(boardkey)
    // obtener el documento utilizando route.params.boardkey
    this.ref.doc(boardkey).get().then((doc) => {
    if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No existe el elemento!");
      }
    })
  }
  
  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }
  
  updateBoard() {
    this.setState({
      isLoading: true,
    });
    const { navigation } = this.props;
    // actualizar el elemento utilizando this.state.key
    this.ref.doc(this.state.key).update({
      title: this.state.title,
      description: this.state.description,
      author: this.state.author,
    }).then((docRef) => {
      this.setState({
        key: '',
        title: '',
        description: '',
        author: '',
        isLoading: false,
      });
      this.props.navigation.navigate('Board');
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      this.setState({
        isLoading: false,
      });
    }); 
  }



  render() {
      if(this.state.isLoading){
        return(
          <View style={styles.activity}>
            <ActivityIndicator size="large" color="#0000ff"/>
          </View>
        )
      }
      return (
        <ScrollView style={styles.container}>
          <View style={styles.subContainer}>
            <TextInput
                placeholder={'Title'}
                value={this.state.title}
                onChangeText={(text) => this.updateTextInput(text, 'title')}
            />
          </View>
          <View style={styles.subContainer}>
            <TextInput
                multiline={true}
                numberOfLines={4}
                placeholder={'Description'}
                value={this.state.description}
                onChangeText={(text) => this.updateTextInput(text, 'description')}
            />
          </View>
          <View style={styles.subContainer}>
            <TextInput
                placeholder={'Author'}
                value={this.state.author}
                onChangeText={(text) => this.updateTextInput(text, 'author')}
            />
          </View>
          <View style={styles.button}>
            <Button
              large
              leftIcon={{name: 'update'}}
              title='Update'
              onPress={() => this.updateBoard()} />
          </View>
        </ScrollView>
      );    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})


export default EditBoardScreen;