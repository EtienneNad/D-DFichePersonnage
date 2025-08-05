import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // adapte le chemin si besoin

type Props = NativeStackScreenProps<RootStackParamList, 'Des'>;

const EcranDes = ({ navigation }: Props) => {
  const [des, setDes] = useState<{ [key: string]: number | null }>({
    d20: null,
    d12: null,
    d10: null,
    d8: null,
    d6: null,
    d4: null,
  });

  const listeDes = [20, 12, 10, 8, 6, 4];

  const genererDe = (faces: number): void => {
    const valeur = Math.floor(Math.random() * faces) + 1;
    setDes((prev) => ({ ...prev, [`d${faces}`]: valeur }));
  };

  const toutRelancer = () => {
    const nouveauxDes: { [key: string]: number } = {};
    listeDes.forEach((faces) => {
      nouveauxDes[`d${faces}`] = Math.floor(Math.random() * faces) + 1;
    });
    setDes(nouveauxDes);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.retour}>
        <Text style={styles.retourTexte}>← Retour</Text>
      </TouchableOpacity>

      <Text style={styles.titre}>Lancer de dés</Text>

      <View style={styles.buttonContainer}>
        {listeDes.map((faces) => (
          <TouchableOpacity
            key={faces}
            style={styles.bouton}
            onPress={() => genererDe(faces)}
          >
            <Text style={styles.boutonTexte}>
              {des[`d${faces}`] !== null ? `${des[`d${faces}`]}` : `d${faces}`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.bouton} onPress={toutRelancer}>
        <Text style={styles.boutonTexte}>🎲 Tout relancer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  retour: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  retourTexte: {
    fontSize: 18,
    color: '#007AFF',
  },
  titre: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  bouton: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 12,
    margin: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  boutonTexte: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EcranDes;
