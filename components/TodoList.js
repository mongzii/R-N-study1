import React from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import TodoItem from './TodoItem';

function TodoList({todos}) {
  return (
    <FlatList //data를 가져오는거인듯.
      ItemSeparatorComponent={() => <View style={styles.separator} />} //컴포넌트 사이에 구분선을 설정
      style={styles.list}
      data={todos}
      renderItem={({item}) => (
        // <View>
        //   <Text>{item.text}</Text>
        // </View>
        <TodoItem id={item.id} text={item.text} done={item.done} />
      )}
      keyExtractor={item => item.id.toString()} //고유값을 추출. 문자열로
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
});

export default TodoList;
