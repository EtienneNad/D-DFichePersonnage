import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, FicheDNDContexte } from '../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DNDFicheContexteType } from '../modeles/ModeleFicheDND';

type Props = NativeStackScreenProps<RootStackParamList, 'Des'>;

const EcranDe = ({}: Props) => {
  const { themes } = useContext(FicheDNDContexte) as DNDFicheContexteType;
  const themeActuel = themes[0]?.theme ?? 'clair';

  // Couleurs dynamiques
  const couleurs = {
    background: themeActuel === 'clair' ? '#ffffff' : '#121212',
    texte: themeActuel === 'clair' ? '#000000' : '#ffffff',
    bouton: themeActuel === 'clair' ? '#007AFF' : '#BB86FC',
  };

  const [des, setDes] = useState<{ [key: string]: number | null }>({
    d20: null,
    d12: null,
    d10: null,
    d8: null,
    d6: null,
    d4: null,
  });

  const listeDes = [20, 12, 10, 8, 6, 4];

  const genererDe = (faces: number) => {
    const valeur = Math.floor(Math.random() * faces) + 1;
    setDes((prev) => ({ ...prev, [`d${faces}`]: valeur }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: couleurs.background }}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: couleurs.background },
        ]}
      >
        <Text style={[styles.titre, { color: couleurs.texte }]}>Lancer de dés</Text>
        <View style={styles.buttonContainer}>
          {listeDes.map((faces) => (
            <TouchableOpacity
              key={faces}
              style={[styles.bouton, { backgroundColor: couleurs.bouton }]}
              onPress={() => genererDe(faces)}
            >
              <Text style={styles.boutonTexte}>
                {des[`d${faces}`] !== null ? `${des[`d${faces}`]}` : `d${faces}`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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

export default EcranDe;
