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
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';

function App(): JSX.Element {
const [race, setRaces] = useState<MesRaces[]>([]);

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
  },
});

export default App;
