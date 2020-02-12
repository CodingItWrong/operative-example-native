import React, {useState} from 'react';
import {Button, FlatList, Text, TextInput, View} from 'react-native';
import axios from 'axios';
import {handleOutOfOrderSloppy} from 'operative-client';
import {useOperative} from 'operative-react';
import AsyncStoragePersister from 'operative-async-storage';

const httpClient = axios.create({
  baseURL: 'http://localhost:3000/todos',
});
const webSocket = new WebSocket('ws://localhost:3000');

const persister = new AsyncStoragePersister('operative');

const TodoList = () => {
  const {ready, records, create, update, destroy, sync} = useOperative({
    httpClient,
    webSocket,
    persister,
    handleOutOfOrder: handleOutOfOrderSloppy,
  });
  const [name, setName] = useState('');

  const handleSubmit = () => {
    console.log('handle submit');
    create({name}).then(() => setName(''));
  };

  const handleRename = todoToRename => {
    console.log('handle rename');
    update(todoToRename, {name: 'Renamed'});
  };

  const handleDelete = todoToDelete => {
    console.log('handle delete');
    destroy(todoToDelete);
  };

  if (!ready) {
    return <Text>Loading…</Text>;
  }

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          value={name}
          onChangeText={setName}
          onEndEditing={handleSubmit}
          style={{flex: 1, borderWidth: 1, padding: 5}}
        />
        <Button onPress={handleSubmit} title="Add" />
      </View>
      <Button onPress={sync} title="Sync" />
      <FlatList
        data={records}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 1}}>{item.name}</Text>
            <Button onPress={() => handleRename(item)} title="Rename" />
            <Button onPress={() => handleDelete(item)} title="Delete" />
          </View>
        )}
      />
    </View>
  );
};

export default TodoList;
