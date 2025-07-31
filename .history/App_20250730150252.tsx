/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { JSX, useCallback, useEffect, useState } from 'react';
import { MesPersonnages, PersonnageContexteType } from './modeles/ModelePersonnage';
import { MesClasses, ClasseContexteType } from './modeles/ModeleClasse';
import { MesRaces, RaceContexteType } from './modeles/ModeleRace';
import { MesThemes, ThemeContexteType } from './modeles/ModeleTheme';
import {
  createTableClasse, ajouterClasse, getClasses, createTablePersonnage, getPersonnages,
  ajouterPersonnage, modifierPersonnage, supprimerPersonnage, createTableRace, getRaces, ajouterRace,
  createTableTheme, ajouterTheme, getTheme, getDBConnection
} from './services/db-services';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';

function App(): JSX.Element {
  const [race, setRaces] = useState<MesRaces[]>([]);
  const [deVingtFaces, setDeVingt] = useState<number | null>(null);
  const [deDouzeFaces, setDeDouze] = useState<number | null>(null);
  const [deDixFaces, setDeDix] = useState<number | null>(null);
  const [deHuitFaces, setDeHuit] = useState<number | null>(null);
  const [deSixFaces, setDeSix] = useState<number | null>(null);
  const [deQuatreFaces, setDeQuatre] = useState<number | null>(null);
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

  const genererDeVingt = () => {
    const nouveauNombre = Math.floor(Math.random() * 20) + 1;
    setDeVingt(nouveauNombre);
  };
  const genererDeDouze = () => {
    const nouveauNombre = Math.floor(Math.random() * 12) + 1;
    setDeDouze(nouveauNombre);
  };
  const genererDeDix = () => {
    const nouveauNombre = Math.floor(Math.random() * 10) + 1;
    setDeDix(nouveauNombre);
  };
  const genererDeHuit = () => {
    const nouveauNombre = Math.floor(Math.random() * 8) + 1;
    setDeHuit(nouveauNombre);
  };
  const genererDeSix = () => {
    const nouveauNombre = Math.floor(Math.random() * 6) + 1;
    setDeSix(nouveauNombre);
  };
  const genererDeQuatre = () => {
    const nouveauNombre = Math.floor(Math.random() * 4) + 1;
    setDeQuatre(nouveauNombre);
  };
  useEffect(() => {
    loadRace();
  }, [loadRace]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.baseText}>Liste des races :</Text>

      {race.map((item) => (
        <select key={item.id} style={styles.innerText}>
          <option value={item.id ?? ''}>{item.race}</option>
        </select>
      ))}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.bouton} onPress={genererDeVingt}>
          <Text style={styles.boutonTexte}>
            {deVingtFaces !== null ? ` ${deVingtFaces}` : '20'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bouton} onPress={genererDeDouze}>
          <Text style={styles.boutonTexte}>
            {deDouzeFaces !== null ? ` ${deDouzeFaces}` : '12'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bouton} onPress={genererDeDix}>
          <Text style={styles.boutonTexte}>
            {deDixFaces !== null ? ` ${deDixFaces}` : '10'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bouton} onPress={genererDeHuit}>
          <Text style={styles.boutonTexte}>
            {deHuitFaces !== null ? ` ${deHuitFaces}` : '8'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bouton} onPress={genererDeSix}>
          <Text style={styles.boutonTexte}>
            {deSixFaces !== null ? ` ${deSixFaces}` : '6'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bouton} onPress={genererDeQuatre}>
          <Text style={styles.boutonTexte}>
            {deQuatreFaces !== null ? ` ${deQuatreFaces}` : '4'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bouton} onPress={genererDeVingt}>
          <Text style={styles.boutonTexte}>
            {deVingtFaces !== null ? ` ${deVingtFaces}` : '20'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bouton} onPress={genererDeDouze}>
          <Text style={styles.boutonTexte}>
            {deDouzeFaces !== null ? ` ${deDouzeFaces}` : '12'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bouton} onPress={genererDeDix}>
          <Text style={styles.boutonTexte}>
            {deDixFaces !== null ? ` ${deDixFaces}` : '10'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bouton} onPress={genererDeHuit}>
          <Text style={styles.boutonTexte}>
            {deHuitFaces !== null ? ` ${deHuitFaces}` : '8'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bouton} onPress={genererDeSix}>
          <Text style={styles.boutonTexte}>
            {deSixFaces !== null ? ` ${deSixFaces}` : '6'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bouton} onPress={genererDeQuatre}>
          <Text style={styles.boutonTexte}>
            {deQuatreFaces !== null ? ` ${deQuatreFaces}` : '4'}
          </Text>
        </TouchableOpacity>
             <TouchableOpacity style={styles.bouton} onPress={genererDeVingt}>
          <Text style={styles.boutonTexte}>
            {deVingtFaces !== null ? ` ${deVingtFaces}` : '20'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bouton} onPress={genererDeDouze}>
          <Text style={styles.boutonTexte}>
            {deDouzeFaces !== null ? ` ${deDouzeFaces}` : '12'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bouton} onPress={genererDeDix}>
          <Text style={styles.boutonTexte}>
            {deDixFaces !== null ? ` ${deDixFaces}` : '10'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bouton} onPress={genererDeHuit}>
          <Text style={styles.boutonTexte}>
            {deHuitFaces !== null ? ` ${deHuitFaces}` : '8'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bouton} onPress={genererDeSix}>
          <Text style={styles.boutonTexte}>
            {deSixFaces !== null ? ` ${deSixFaces}` : '6'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bouton} onPress={genererDeQuatre}>
          <Text style={styles.boutonTexte}>
            {deQuatreFaces !== null ? ` ${deQuatreFaces}` : '4'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  baseText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  innerText: {
    fontSize: 16,
    color: 'black',
    marginVertical: 2,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  bouton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 6,
    width: 150,
    alignItems: 'center',
  },
  boutonTexte: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default App;
