import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import TodoList from './TodoList';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <TodoList />
      </SafeAreaView>
    </>
  );
};

export default App;
