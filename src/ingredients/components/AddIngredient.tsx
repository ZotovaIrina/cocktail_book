import { View, SafeAreaView, TextInput, StyleSheet } from "react-native"
import React  from 'react'

export const AddIngredient = () => {
    const [text, onChangeText] = React.useState('Useless Text');

    const [number, onChangeNumber] = React.useState('');
    return <View>
         <SafeAreaView>
      <TextInput
    
        onChangeText={onChangeText}
        value={text}
      />
      <TextInput
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
    </SafeAreaView>
    </View>
}
