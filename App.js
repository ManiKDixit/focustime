import { Text, SafeAreaView, StyleSheet , Platform , StatusBar , View } from 'react-native';
import {colors} from './src/utils/colors'
import {Focus} from './src/features/Focus'
import React , {useState} from 'react'
import {Timer} from './src/features/Timer'
import {FocusHistory} from './src/features/FocusHistory'
// You can import supported modules from npm

// or any files within the Snack

export default function App() {
  const [currentSubject , setCurrentSubject] = useState()  //useState(null)
  const [history , setHistory] = useState([])
  return (
    <SafeAreaView style={styles.container}>
    {!currentSubject ? (
      <>
    <Focus addSubject={setCurrentSubject} />
    <FocusHistory history={history} />
    </> ) : 
    ( <Timer
    focusSubject={currentSubject}
    onTimerEnd={(subject)=>{setHistory([...history,subject])}}
    clearSubject={()=>setCurrentSubject(null)}
     /> )
    }
     

      <StatusBar style='light' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop : Platform.OS == 'android' ? StatusBar.currentHeight : 0 ,
    backgroundColor : colors.darkBlue  ,
   
  },
 
});
