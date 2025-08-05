import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const EcranDes = () => {
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
  titre: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  bouton: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 12,
    margin: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  boutonTexte: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EcranDes;
