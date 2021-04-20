import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, SectionList } from 'react-native'

//import nachos from '../data/nachos'
import ListItem, { SectionHeader, Separator } from '../components/ListItem';
import AddItem from '../components/AddItem';
import {useCurrentList} from '../util/ListManager';

export default () => {
    const {favorited} = useCurrentList();

    return (
        <SafeAreaView  style={{flex: 1}}>
            <KeyboardAvoidingView
             style={{flex: 1}}
             behavior='padding'
            >
            <SectionList
                sections={[
                    {title:'Favorited', data: favorited},
                ]}

                renderSectionHeader = {({section}) => {
                    <SectionHeader title={section.title} />
                }}

                renderItem={({item, index}) => (
                    <ListItem 
                        name={item.name}
                    />
                )}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent = {() => <Separator />}
            //     ListHeaderComponent={() => {
            //         return (
            //             <AddItem 
            //             onSubmitEditing={({nativeEvent: {text}}) => addItem(text)
            //             }
            //             />
            //         )
            //     }
            // }

          />
          </KeyboardAvoidingView>
        </SafeAreaView>
    )
};