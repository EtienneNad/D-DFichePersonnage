/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { JSX, useCallback, useEffect, useState } from 'react';
import { MesPersonnages, PersonnageContexteType } from './modeles/ModelePersonnage';
import { MesClasses, ClasseContexteType} from './modeles/ModeleClasse';
import { MesRaces, RaceContexteType } from './modeles/ModeleRace';
import { MesThemes, ThemeContexteType } from './modeles/ModeleTheme';
import { createTableClasse, ajouterClasse, getClasses, createTablePersonnage, getPersonnages, 
  ajouterPersonnage, modifierPersonnage, supprimerPersonnage, createTableRace, getRaces, ajouterRace,
  createTableTheme, ajouterTheme, getTheme, getDBConnection } from './services/db-services';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';

function App(): JSX.Element {
const [race, setRaces] = useState<MesRaces[]>([]);
const [randomNumber, setRandomNumber] = useState<number | null>(null);
 const loadRace = useCallback(async () => {
    //Inspirer de: https://blog.logrocket.com/using-sqlite-with-react-native/
    try {
      const initRaces = [
        {
          id: 1,
          race: 'Humain',
        },
        {
          id: 2,
          race: 'Elfe',
        },
        {
          id: 3,
          race: 'Nain',
        },
      ];
      const db = await getDBConnection();
      await createTableRace(db);
      const ImagesDB = await getRaces(db);
      if (ImagesDB.length) {
        setRaces(ImagesDB);
      } else {
        await ajouterRace(db, initRaces);
        setRaces(initRaces);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

const genererNombre = () => {
  const nouveauNombre = Math.floor(Math.random() * 100) + 1;
  setRandomNumber(nouveauNombre);
};


  useEffect(() => {
  loadRace();
}, [loadRace]);
         
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.baseText}>Liste des races :</Text>
      {race.map((item) => (
        <Text key={item.id} style={styles.innerText}>
          • {item.race}
        </Text>
      ))}
    <TouchableOpacity style={styles.bouton} onPress={genererNombre}>
            <Text style={styles.boutonTexte}>
              {randomNumber !== null ? `Nombre: ${randomNumber}` : 'Générer un nombre'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // centre verticalement
    alignItems: 'center',      // centre horizontalement
    backgroundColor: 'white',  // fond blanc
  },
  baseText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  innerText: {
    color: 'red',
    fontSize: 50,
  },
  bouton: {
    marginTop: 30,
    backgroundColor: '#6200ee',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  boutonTexte: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
