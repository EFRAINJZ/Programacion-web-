import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button , Text, Image} from 'react-native-elements';


class pantallaInicial extends Component{
    constructor(){
        super();
    }
    render() {

      return (
        <View style={styles.container}>
          <Text h1>Bienvenido(a)!!!</Text>
          <Image
            source={require('./libros.jpg')}
            style={{ width: 346, height: 400}}
            PlaceholderContent={<ActivityIndicator />}
           />
          <Button
            buttonStyle={ styles.buton}
            type ="outline"

            onPress={() => { this.props.navigation.navigate('Board')}}
            title= "SIGUIENTE"/>
        </View>
      );    
  }
}
const styles = StyleSheet.create({
  container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: 500
  },
 buton:{
     width:400,
 },    
  subContainer: {
    flex: 5,
    marginBottom: 30,
    padding: 10,
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
export default pantallaInicial;