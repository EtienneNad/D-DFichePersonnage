import React, { JSX } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import EcranDes from './components/EcranDe'; // adapte le chemin si besoin

export type RootStackParamList = {
  Des: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Des">
          <Stack.Screen name="Des" component={EcranDes} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;


// import React, { JSX, useCallback, useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import { Dropdown } from 'react-native-element-dropdown';
// import { MesRaces } from './modeles/ModeleRace';
// import { MesClasses } from './modeles/ModeleClasse';
// import { MesThemes } from './modeles/ModeleTheme';
// import {
//   createTableRace,
//   ajouterRace,
//   getRaces,
//   getRaceID,
//   createTableTheme,
//   getTheme,
//   modifierTheme,
//   getDBConnection,
//   ajouterTheme,
//   createTableClasse,
//   ajouterClasse,
//   getClasses,
//   getClasseID,
//   getPersonnages,
//   createTablePersonnage,
//   ajouterPersonnage
// } from './services/db-services';
// import { MesPersonnages } from './modeles/ModelePersonnage';

// import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// export type RootStackParamList = {
//   Accueil: undefined;
//   Des: undefined;
// };

// type Props = NativeStackScreenProps<RootStackParamList, 'Accueil'>;

// function App({ navigation }: Props): JSX.Element {
//   const [nomRaces, setNomsRaces] = useState<{ [id: number]: string }>({});
//   const [nomClasses, setNomsClasses] = useState<{ [id: number]: string }>({});
//   const [selectedRace, setSelectedRace] = useState<string>('');
//   const [selectedClasse, setSelectedClasse] = useState<string>('');
//   const [selectedRaceValeur, setSelectedRaceValeur] = useState<{ id: number; name: string } | null>(null);
//   const [selectedClasseValeur, setSelectedClasseValeur] = useState<{ id: number; name: string } | null>(null);
//   const [race, setRaces] = useState<MesRaces[]>([]);
//   const [theme, setTheme] = useState<MesThemes[]>([]);
//   const [personnages, setPersonnages] = useState<MesPersonnages[]>([]);
//   const [classe, setClasse] = useState<MesClasses[]>([]);

//   const raceDropdownData = race.map((item) => ({ label: item.race, value: item.id }));
//   const classeDropdownData = classe.map((item) => ({ label: item.classe, value: item.id }));

//   const loadTheme = useCallback(async () => {
//     try {
//       const initTheme = [{ id: 0, theme: 'clair' }];
//       const db = await getDBConnection();
//       await createTableTheme(db);
//       const themesDB = await getTheme(db);
//       if (themesDB.length) setTheme(themesDB);
//       else {
//         await ajouterTheme(db, initTheme);
//         setTheme(initTheme);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }, []);

//   const loadRace = useCallback(async () => {
//     try {
//       const initRaces = [
//         { id: 1, race: 'Humain' },
//         { id: 2, race: 'Elfe' },
//         { id: 3, race: 'Nain' },
//       ];
//       const db = await getDBConnection();
//       await createTableRace(db);
//       const racesDB = await getRaces(db);
//       if (racesDB.length) setRaces(racesDB);
//       else {
//         await ajouterRace(db, initRaces);
//         setRaces(initRaces);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }, []);

//   const loadClasse = useCallback(async () => {
//     try {
//       const initClasse = [
//         { id: 1, classe: 'Guerrier' },
//         { id: 2, classe: 'Mage' },
//         { id: 3, classe: 'Druide' },
//       ];
//       const db = await getDBConnection();
//       await createTableClasse(db);
//       const classesDB = await getClasses(db);
//       if (classesDB.length) setClasse(classesDB);
//       else {
//         await ajouterClasse(db, initClasse);
//         setClasse(initClasse);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }, []);

//   const loadPersonnage = useCallback(async () => {
//     try {
//       const db = await getDBConnection();
//       await createTablePersonnage(db);
//       const personnagesDB = await getPersonnages(db);
//       if (personnagesDB.length) setPersonnages(personnagesDB);
//     } catch (error) {
//       console.error(error);
//     }
//   }, []);

//   useEffect(() => {
//     const init = async () => {
//       await loadRace();
//       await loadTheme();
//       await loadClasse();
//       await loadPersonnage();
//     };
//     init();
//   }, [loadRace, loadTheme, loadClasse, loadPersonnage]);

//   useEffect(() => {
//     const chargerInfos = async () => {
//       const nomsR: { [id: number]: string } = {};
//       const nomsC: { [id: number]: string } = {};

//       for (const perso of personnages) {
//         const raceNom = await recupererRace(perso.race_id ?? 0);
//         const classeNom = await recupererClasse(perso.classe_id ?? 0);
//         nomsR[perso.id ?? 0] = raceNom;
//         nomsC[perso.id ?? 0] = classeNom;
//       }

//       setNomsRaces(nomsR);
//       setNomsClasses(nomsC);
//     };

//     if (personnages.length > 0) chargerInfos();
//   }, [personnages]);

//   const recupererRace = async (id: number): Promise<string> => {
//     const db = await getDBConnection();
//     const race = await getRaceID(db, id);
//     return race ? race.race : '';
//   };

//   const recupererClasse = async (id: number): Promise<string> => {
//     const db = await getDBConnection();
//     const classe = await getClasseID(db, id);
//     return classe ? classe.classe : '';
//   };

//   const modifierThemes = async (id: number | null, nouveauTheme: string) => {
//     try {
//       const db = await getDBConnection();
//       await modifierTheme(db, id, nouveauTheme);
//       setTheme([{ id, theme: nouveauTheme }]);
//     } catch (error) {
//       console.error(error);
//       Alert.alert('La modification du thème a échoué');
//     }
//   };

//   const changerTheme = () => {
//     if (theme.length === 0) return;
//     const nouveauTheme = theme[0].theme === 'clair' ? 'sombre' : 'clair';
//     modifierThemes(theme[0].id, nouveauTheme);
//   };

//   const themeActuel = theme[0]?.theme || 'clair';

//   return (
//     <ScrollView contentContainerStyle={[styles.scrollContent, themeActuel === 'sombre' && { backgroundColor: '#222' }]}>
//       <Text style={[styles.baseText, themeActuel === 'sombre' && { color: 'white' }]}>Sélectionne ta race :</Text>
//       <View style={styles.dropdownContainer}>
//         <Dropdown
//           style={[styles.dropdown, themeActuel === 'sombre' && { backgroundColor: '#333', borderColor: '#666' }]}
//           containerStyle={{ backgroundColor: themeActuel === 'sombre' ? 'darkgray' : 'lightgray' }}
//           itemTextStyle={{ color: 'black' }}
//           placeholderStyle={{ color: themeActuel === 'sombre' ? 'white' : '#999' }}
//           selectedTextStyle={{ color: themeActuel === 'sombre' ? 'lightgray' : '#000' }}
//           data={raceDropdownData}
//           labelField="label"
//           valueField="value"
//           placeholder="-- Choisir une race --"
//           value={selectedRace}
//           onChange={(item) => {
//             setSelectedRace(item.value);
//             setSelectedRaceValeur({ id: item.value, name: item.label });
//           }}
//         />
//       </View>

//       <Text style={[styles.baseText, themeActuel === 'sombre' && { color: 'white' }]}>Sélectionne ta Classe :</Text>
//       <View style={styles.dropdownContainer}>
//         <Dropdown
//           style={[styles.dropdown, themeActuel === 'sombre' && { backgroundColor: '#333', borderColor: '#666' }]}
//           containerStyle={{ backgroundColor: themeActuel === 'sombre' ? 'darkgray' : 'lightgray' }}
//           itemTextStyle={{ color: 'black' }}
//           placeholderStyle={{ color: themeActuel === 'sombre' ? 'white' : '#999' }}
//           selectedTextStyle={{ color: themeActuel === 'sombre' ? 'white' : '#000' }}
//           data={classeDropdownData}
//           labelField="label"
//           valueField="value"
//           placeholder="-- Choisir une classe --"
//           value={selectedClasse}
//           onChange={(item) => {
//             setSelectedClasse(item.value);
//             setSelectedClasseValeur({ id: item.value, name: item.label });
//           }}
//         />
//       </View>

//       {selectedRace && (
//         <Text style={styles.selectedRace}>Race choisie : {selectedRaceValeur?.name} (ID: {selectedRaceValeur?.id})</Text>
//       )}

//       {selectedClasse && (
//         <Text style={styles.selectedRace}>Classe choisie : {selectedClasseValeur?.name} (ID: {selectedClasseValeur?.id})</Text>
//       )}

//       <TouchableOpacity style={styles.themeButton} onPress={changerTheme}>
//         <Text style={styles.themeButtonText}>
//           Thème actuel : {themeActuel === 'clair' ? 'Clair' : 'Sombre'} — Changer
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.bouton} onPress={() => navigation.navigate('Des')}>
//         <Text style={styles.boutonTexte}>🎲 Lancer des dés</Text>
//       </TouchableOpacity>

//       {personnages.length > 0 && personnages.map((perso, index) => (
//         <View key={perso.id || index} style={styles.personnageContainer}>
//           <Text style={styles.sectionTitle}>Fiche du personnage #{index + 1}</Text>
//           <Text style={styles.personnageTexte}>Nom : {perso.nomPersonnage}</Text>
//           <Text style={styles.personnageTexte}>Classe: {nomClasses[perso.classe_id ?? 0]}</Text>
//           <Text style={styles.personnageTexte}>Race: {nomRaces[perso.race_id ?? 0]}</Text>
//           <Text style={styles.personnageTexte}>Âge : {perso.age} ans</Text>
//           <Text style={styles.personnageTexte}>Sexe : {perso.sexe}</Text>
//           <Text style={styles.personnageTexte}>Taille : {perso.taille}</Text>
//           <Text style={styles.personnageTexte}>Poids : {perso.poids}</Text>
//           <Text style={styles.personnageTexte}>Niveau : {perso.niveau}</Text>
//           <Text style={styles.personnageTexte}>Alignement : {perso.alignement}</Text>
//           <Text style={styles.personnageTexte}>PV : {perso.pvActuel} / {perso.pvMax}</Text>
//           <Text style={styles.personnageTexte}>Attaque : {perso.attaque}</Text>
//           <Text style={styles.personnageTexte}>Sorts : {perso.sort}</Text>
//           <Text style={styles.personnageTexte}>Équipement : {perso.equipement}</Text>
//           <Text style={styles.personnageTexte}>Apparence : {perso.apparence}</Text>
//           <Text style={styles.personnageTexte}>Histoire : {perso.histoire}</Text>
//           <Text style={styles.personnageTexte}>Alliés : {perso.alies}</Text>
//           <Text style={styles.personnageTexte}>Trésor : {perso.tresor}</Text>
//           <Text style={styles.personnageTexte}>Notes : {perso.notes}</Text>
//           <Text style={styles.personnageTexte}>Notes sur les sorts : {perso.notesSort}</Text>
//         </View>
//       ))}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   scrollContent: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: 'white',
//     alignItems: 'center',
//   },
//   baseText: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   selectedRace: {
//     fontSize: 18,
//     marginVertical: 10,
//     fontWeight: '600',
//     color: 'green',
//   },
//   dropdownContainer: {
//     width: '100%',
//     marginBottom: 10,
//   },
//   dropdown: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//   },
//   bouton: {
//     backgroundColor: '#007AFF',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 10,
//     marginVertical: 6,
//     width: 150,
//     alignItems: 'center',
//   },
//   boutonTexte: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   themeButton: {
//     marginTop: 30,
//     backgroundColor: '#333',
//     padding: 12,
//     borderRadius: 10,
//   },
//   themeButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   personnageContainer: {
//     marginTop: 30,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//     borderRadius: 12,
//     width: '100%',
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//     textAlign: 'center',
//   },
//   personnageTexte: {
//     fontSize: 16,
//     marginVertical: 2,
//     color: '#444',
//   },
// });

// export default App;
