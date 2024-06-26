import React, {useState, useEffect} from 'react';
import {StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import DateHead from './components/DateHead';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import todosStorage from './storages/todosStorage';
import AddTodo from './components/AddTodo';
import Empty from './components/Empty';
import TodoList from './components/TodoList';

const App = () => {
  const today = new Date();
  const [todos, setTodos] = useState([
    {id: 1, text: '밥먹기', done: true},
    {id: 2, text: '잠자기', done: false},
    {id: 3, text: '운동하기', done: false},
  ]);
  // useEffect(() => {
  //   console.log(todos);
  // }, [todos]);

  useEffect(() => {
    todosStorage.get().then(setTodos).catch(console.error);
  }, []);

  useEffect(() => {
    todosStorage.set(todos).catch(console.error);
  }, [todos]);

  // -----todosStorage 만들기전버전 --------------------------------------
  // //불러오기
  // useEffect(() => {
  //   async function load() {
  //     try {
  //       const rawTodos = await AsyncStorage.getItem('todos');
  //       const savedTodos = JSON.parse(rawTodos);
  //       setTodos(savedTodos);
  //     } catch (e) {
  //       console.log('Fail');
  //     }
  //   }
  //   load();
  // }, []);

  // //저장
  // useEffect(() => {
  //   async function save() {
  //     try {
  //       await AsyncStorage.setItem('todos', JSON.stringify(todos));
  //     } catch (e) {
  //       console.log('Fail');
  //     }
  //   }
  //   save();
  // }, [todos]);

  const onInsert = text => {
    //먼저 새로 등록할 항목의 id
    const nextId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    const todo = {
      id: nextId,
      text,
      done: false,
    };
    setTodos(todos.concat(todo));
  };
  const onToggle = id => {
    const nextTodos = todos.map(todo =>
      todo.id === id ? {...todo, done: !todo.done} : todo,
    );
    setTodos(nextTodos);
  };
  const onRemove = id => {
    const nextTodos = todos.filter(todo => todo.id !== id);
    setTodos(nextTodos);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={styles.block}>
        {/* <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.avoid}> */}
        <KeyboardAvoidingView
          behavior={Platform.select({ios: 'padding', android: undefined})}
          style={styles.avoid}>
          <DateHead date={today} />
          {todos.length === 0 ? (
            <Empty />
          ) : (
            <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
          )}
          <AddTodo onInsert={onInsert} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoid: {flex: 1},
});

export default App;
