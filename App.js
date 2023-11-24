import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <View style={{flex: 2, padding: 24, backgroundColor: 'white'}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <>
              <Text>{item.price}</Text>
              <Text>{item.category}</Text>
              <Text>{item.rating.rate}</Text>
              <Image
                style={{width: 200, height: 200}}
                source={{uri: `${item.image}`}}
              />
            </>
          )}
        />
      )}
    </View>
  );
};

export default App;
