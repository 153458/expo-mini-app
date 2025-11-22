import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../styles/HomeStyles'; // Import styles from separate file


// THE HOME PAGE
// default page for the navigation
// allows you to navigate to the other pages and is the primary page for the apps details

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.title}>React Navigation</Text>
        {/*<Text style={styles.subtitle}>By: Steve Starovoitov</Text>*/}
      </View>

      {/* READ THIS IF YOU'RE LOOKING THROUGH */}
      <View style={styles.card}>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime atque dignissimos expedita doloremque fugiat inventore? Corrupti fugiat consequuntur itaque inventore. Aspernatur ab voluptatum repudiandae iusto ipsa blanditiis corrupti atque temporibus itaque nesciunt, minus quisquam cupiditate consequatur quaerat maxime repellat voluptas, 
          saepe in rerum eius eum, ut quo officia. Ab, ullam.
<br></br>
<br></br>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime atque dignissimos expedita doloremque fugiat inventore? 
          Corrupti fugiat consequuntur itaque inventore. Aspernatur ab voluptatum repudiandae iusto ipsa blanditiis corrupti atque temporibus itaque nesciunt, minus quisquam cupiditate consequatur quaerat maxime repellat voluptas, saepe in rerum eius eum, ut quo officia. Ab, ullam.

          <br></br>
          <br></br>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime atque dignissimos expedita doloremque fugiat inventore? 
          Corrupti fugiat consequuntur itaque inventore. Aspernatur ab voluptatum repudiandae iusto ipsa blanditiis corrupti atque temporibus itaque nesciunt, minus quisquam cupiditate consequatur quaerat maxime repellat voluptas, saepe in rerum eius eum, ut quo officia. Ab, ullam.
        </Text>
      </View>

      {/* navigation buttons for different sections */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Second Page')}
        >
          <Text style={styles.buttonText}>Second Nav Page</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Third Page')}
        >
          <Text style={styles.buttonText}>Third Nav Page</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}