import React from 'react'
import {View , Text , StyleSheet , FlatList} from 'react-native'
import {colors} from '../utils/colors'
import {fontSizes, spacing} from '../utils/sizes' 

export const FocusHistory = ({history}) => {

  if(!history || !history.length) return <Text style={styles.title}>We haven't focussed on anything yet </Text>

  const renderItem = ({item}) => <Text style={styles.item}>-{item}</Text> 
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Things we've focussed on : </Text>
      <FlatList
      data={history}
      renderItem={renderItem}
       />
    </View>
  )
}


const styles = StyleSheet.create({

  container : {
    padding : spacing.md,
    flex:1 
  },
  title : {
    color: colors.white,
    fontSize: fontSizes.lg,
    fontWeight :'bold'
  } ,
  item : {
    fontSize:fontSizes.md,
    color: colors.white,
    paddingTop:spacing.sm,
   
  }
})