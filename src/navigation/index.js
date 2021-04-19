import React from 'react';
import {Text, Image, Platform} from 'react-native';
import CurrentList from '../screens/CurrentList';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import ItemDetails from '../screens/ItemDetails';
import FavoriteList from '../screens/FavoriteList';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const CurrentListStack = () => {
    return (
            <Stack.Navigator>
                <Stack.Screen name="CurrentList" component={CurrentList} />
                <Stack.Screen name="ItemDetails" component={ItemDetails} 
                options={({route}) => {
                    return {
                        headerTitle: () => {
                            return <Text>{route.params.item.name}</Text>
                        },
                    }
                }}
                />
              
            </Stack.Navigator>
    )
}

const FavouritListStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="FavoritList" component={FavoriteList} />
        </Stack.Navigator>
    )
}

const Tabs = () => {
    return (
        <NavigationContainer>
             <Tab.Navigator
             screenOptions={({route}) => ({
                 tabBarIcon: ({color, focused}) => {
                     let image;
                     const routeName = route.name;

                     if(routeName === 'CurrentList') {
                         image = Platform.select({
                             ios: require('../assets/icons/ios-list.png'),
                             android: require('../assets/icons/md-list.png')
                         });
                     }
                     else if(routeName === 'FavoriteList') {
                         image = Platform.select({
                             ios: focused ? require('../assets/icons/ios-star.png')
                             : require('../assets/icons/ios-star-outline.png'),
                             android: focused ? require('../assets/icons/md-star.png')
                             : require('../assets/icons/md-star-outline.png'),
                         });
                     }
                     return <Image source={image}
                     resizeMode='contain'
                     style = {{width: 25, tintColor: color}} />
                 }
             })}
             >
                <Tab.Screen name="FavoriteList" component={FavouritListStack} />
                <Tab.Screen name="CurrentList" component={CurrentListStack} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Tabs;


// import { createStackNavigator, createAppNavigator } from 'react-navigation';
// import CurrentList from '../screens/CurrentList';

// const CurrentListSatck = createAppNavigator({
//     CurrentList: {
//         screen: CurrentList,
//     }
// })