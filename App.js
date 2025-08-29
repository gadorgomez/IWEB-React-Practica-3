import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import {View, Image } from 'react-native';
import CONFIG from './components/config/config';
import Header from './components/Header';
import Producto from './components/Producto';
import SearchPage from './components/SearchPage';
import {mockdata} from './components/constants/products';
const Stack = createNativeStackNavigator(); 


export default function App() {
  const [loading, setLoading] = useState(true);
  const [theproducts, setTheProducts] = useState(mockdata.products);
  const use_server = CONFIG.use_server;
  const server_url = CONFIG.server_url;
  const loading_timeout_ms = loading_timeout_ms
  
  const carga = async () => {
    if (use_server) {
      try{
      let array = fetch(server_url);
      let json = await array.then((response) => response.json());
      setTheProducts(json.products);      
    }catch(error){
      console.log(error);
      setTheProducts({ error: {description: error.message} });
    }
    }
    else {
      setTheProducts(mockdata.products);
    }
  }

  useEffect(() => {
    carga();
    setTimeout(()=>{
      setLoading(false);
    }, loading_timeout_ms);    
  }, []);
  
  return ( 
    <View style={{flex:2}}>
      <Header />
      {loading ? 
          <Image  testID='loading' style={{width:15, height:15}} source={require('./assets/loading.gif')} ></Image> 
        :
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='SearchPage'> 
              {(props) => <SearchPage {...props} theproducts={theproducts}/>}
            </Stack.Screen>
            <Stack.Screen name="Producto" component={Producto} />
          </Stack.Navigator>
        </NavigationContainer>
      }
    </View>
  );  
}


