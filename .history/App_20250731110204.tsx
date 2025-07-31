import React, { JSX, useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MesRaces } from './modeles/ModeleRace';
import { MesClasses } from './modeles/ModeleClasse';
import { MesThemes } from './modeles/ModeleTheme';
import {
  createTableRace,
  ajouterRace,
  getRaces,
  createTableTheme,
  getTheme,
  modifierTheme,
  getDBConnection,
  ajouterTheme,
  createTableClasse,
  ajouterClasse,
  getClasses
  
} from './services/db-services';

function App(): JSX.Element {
  const [selectedRace, setSelectedRace] = useState<string>('');
  const [race, setRaces] = useState<MesRaces[]>([]);
  const [theme, setTheme] = useState<MesThemes[]>([]);
  const [classe, setClasse] = useState<MesClasses[]>([]);
  const [des, setDes] = useState<{ [key: string]: number | null }>({
    d20: null,
    d12: null,
    d10: null,
    d8: null,
    d6: null,
    d4: null,
  });


  const loadTheme = useCallback(async () => {
    //Inspirer de: https://blog.logrocket.com/using-sqlite-with-react-native/
    try {
      const initTheme = [
        {
          id: 0,
          theme: 'clair',
        },
      ];
      const db = await getDBConnection();
      await createTableTheme(db);
      const ImagesDB = await getTheme(db);
      if (ImagesDB.length) {
        setTheme(ImagesDB);
      } else {
        await ajouterTheme(db, initTheme);
        setTheme(initTheme);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const loadRace = useCallback(async () => {
    try {
      const initRaces = [
        { id: 1, race: 'Humain' },
        { id: 2, race: 'Elfe' },
        { id: 3, race: 'Nain' },
      ];
      const db = await getDBConnection();
      await createTableRace(db);
      const racesDB = await getRaces(db);
      if (racesDB.length) {
        setRaces(racesDB);
      } else {
        await ajouterRace(db, initRaces);
        setRaces(initRaces);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const loadClasse = useCallback(async () => {
      try {
        const initClasse = [
          { id: 1, classe: 'guerrier' },
          { id: 2, classe: 'Mage' },
          { id: 3, classe: 'Druide' },
        ];
        const db = await getDBConnection();
        await createTableClasse(db);
        const classesDB = await getClasses(db);
        if (classesDB.length) {
          setClasse(classesDB);
        } else {
          await ajouterClasse(db, initClasse);
          setClasse(initClasse);
        }
      } catch (error) {
        console.error(error);
      }
    }, []);

  useEffect(() => {
    loadRace();
    loadTheme();
    loadClasse();
  }, [loadRace, loadTheme]);

  const genererDe = (faces: number): void => {
    const valeur = Math.floor(Math.random() * faces) + 1;
    setDes((prev) => ({ ...prev, [`d${faces}`]: valeur }));
  };

  const listeDes = [20, 12, 10, 8, 6, 4];

  return (
    <ScrollView contentContainerStyle={[styles.scrollContent, theme === 'sombre' && { backgroundColor: '#222' }]}>
      <Text style={[styles.baseText, theme === 'sombre' && { color: 'white' }]}>Sélectionne ta race :</Text>

      <View style={styles.raceList}>
        {race.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => setSelectedRace(item.race)}
            style={[
              styles.raceButton,
              selectedRace === item.race && styles.raceButtonSelected,
            ]}
          >
            <Text style={styles.raceText}>{item.race}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedRace ? (
        <Text style={styles.selectedRace}>Race choisie : {selectedRace}</Text>
      ) : null}

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

      {/* Bouton de changement de thème */}
      <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
        <Text style={styles.themeButtonText}>
          Thème actuel : {theme === 'clair' ? 'Clair' : 'Sombre'} — Changer
        </Text>
      </TouchableOpacity>
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
  selectedRace: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: '600',
    color: 'green',
  },
  raceList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  raceButton: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    margin: 5,
  },
  raceButtonSelected: {
    backgroundColor: '#007AFF',
  },
  raceText: {
    fontSize: 16,
    color: 'black',
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
  themeButton: {
    marginTop: 30,
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 10,
  },
  themeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
