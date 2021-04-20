import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, SectionList } from 'react-native'

//import nachos from '../data/nachos'
import ListItem, { SectionHeader, Separator } from '../components/ListItem';
import AddItem from '../components/AddItem';
import {useCurrentList} from '../util/ListManager';

export default ({navigation}) => {
    const {list,loading, addItem, removeItem,cart, addToCart, addToFavorite} = useCurrentList();

    if (loading) {
        return (
            <SafeAreaView>
               <Text>Loading...</Text>
            </SafeAreaView>
        )
    }
    console.log(addToCart)

    return (
        <SafeAreaView  style={{flex: 1}}>
            <KeyboardAvoidingView
             style={{flex: 1}}
             behavior='padding'
            >
            <SectionList
                sections={[
                    {title:'List', data: list},
                    {title: 'Cart', data: cart},
                ]}

                renderSectionHeader = {({section}) => {
                    <SectionHeader title={section.title} />
                }}

                renderItem={({item, index}) => (
                    <ListItem 
                        name={item.name}
                        onFavoritePress={() => addToFavorite(item)}
                        isFavorite={index < 2}
                        onAddedSwipe={() => addToCart(item)}
                        onDeleteSwipe={() => removeItem(item.id)}
                        onRowPress={() => {
                            navigation.navigate('ItemDetails', {
                               item
                            })
                        }}
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