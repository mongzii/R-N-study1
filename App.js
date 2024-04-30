// import React, {useState} from 'react';
// // import {SafeAreaView, Text, View} from 'react-native';
// import {SafeAreaView, Button} from 'react-native';
// import Box from './components/Box';
// // import Greeting from './components/Greeting';

// const App = () => {
//   const [visible, setVisible] = useState(true);
//   const onPress = () => {
//     setVisible(!visible);
//   };
//   return (
//     <SafeAreaView>
//       {/* <View>
//         <Text>hello react native</Text>
//       </View> */}
//       {/* <Greeting /> */}
//       <Button title="토글" onPress={onPress} />
//       {/* {visible ? <Box rounded={true} size="large" color="blue" /> : null} */}
//       {visible && <Box rounded={true} size="large" color="blue" />}
//     </SafeAreaView>
//   );
// };

// export default App;

import React from 'react';
import {StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import DateHead from './components/DateHead';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import AddTodo from './components/AddTodo';
import Empty from './components/Empty';

const App = () => {
  const today = new Date();

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={styles.block}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.avoid}>
          <DateHead date={today} />
          <Empty />
          <AddTodo />
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
