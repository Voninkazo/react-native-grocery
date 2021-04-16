import React, { useState, useEffect } from 'react';
//import {v4 as uuid} from 'uuid';
//import AsyncStorage from '@react-native-community/async-storage';

import { View, Text, SafeAreaView, FlatList, KeyboardAvoidingView, ActivityIndicator } from 'react-native'

//import nachos from '../data/nachos'
import ListItem, { Separator } from '../components/ListItem';
import AddItem from '../components/AddItem';

// const updateStorageCurrentList = (list) => {
//     AsyncStorage.setItem('@@GroceryList/currentList', JSON.stringify(list))
// }

    import {useCurrentList} from '../util/ListManager';

export default () => {
    const {list,loading, addItem, removeItem} = useCurrentList();


    // const [list, setList] = useState([]);
    // const [loading, setLoading] = useState(true);

    // const addItem = (text) => {
    //     const newList =  [{id:uuid(),name: text},...list];
    //     setList(newList);
    //     updateStorageCurrentList(newList);
    // }

    // const removeItem = (id) => {
    //     const newList = list.filter(item => item.id !== id);
    //     setList(newList)
    //     updateStorageCurrentList(newList);
    // }

    // useEffect(() => {
    //   AsyncStorage.getItem('@@GroceryList/currentList')
    //   .then(data => JSON.parse(data))
    //   .then(data => {
    //       if(data) {
    //           setList(data);
    //       }
    //       setLoading(false);
    //   })
    //   1000
    // }, [])

    if (loading) {
        return (
            <SafeAreaView>
               <Text>Loading...</Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView  style={{flex: 1}}>
            <KeyboardAvoidingView
             style={{flex: 1}}
             behavior='padding'
            >
            <FlatList
                data = {list}
                renderItem={({item, index}) => (
                    <ListItem 
                        name={item.name}
                        onFavoritePress={() => alert('todo: handle favorite')}
                        isFavorite={index < 2}
                        onAddedSwipe={() => removeItem(item.id)}
                        onDeleteSwipe={() => removeItem(item.id)}
                    />
                )}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent = {() => <Separator />}
                ListHeaderComponent={() => {
                    return (
                        <AddItem 
                        onSubmitEditing={({nativeEvent: {text}}) => addItem(text)
                        }
                        />
                    )
                }
            }

          />
          </KeyboardAvoidingView>
        </SafeAreaView>
    )
};