import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styles from '../styles/ExampleStyles'; // Import styles from separate file

export default function ProfileScreen({ navigation }) {
  // put states here

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        {/* i have a header here for the sake separation, replace it as you will */}
      </View>

      {/* fill section here with page details, left basic stylings present for the sake of example */}
      <View style={styles.form}>

        <Text style={styles.label}>This is the second page</Text>

        <Text style={styles.label}></Text>

      </View>

      {/* placeholder for effectively a footer */}
      <View style={styles.footer}>
      </View>
    </ScrollView>
  );
}