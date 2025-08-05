import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Modifier'>;

const EcranModification = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titre}>D&D fiche personnage</Text>
        <View style={{ height: 100 }} /> 
          
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',     // Centrage horizontal
    padding: 10,
    paddingTop: 20,           // Ajout d’un espace en haut
    backgroundColor: 'white',
  },
  titre: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bouton: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 12,
    margin: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  boutonTexte: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EcranModification;
