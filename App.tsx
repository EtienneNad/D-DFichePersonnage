import React, { JSX, useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EcranDes from './components/EcranDe';
import EcranAccueil from './components/EcranAccueil';
import EcranAjout from './components/EcranAjout';
import EcranModification from './components/EcranModification';
import EcranListePersonnage from './components/EcranListePersonnage';
import EcranInformationPersonnage from './components/EcranInformationPersonnage';


import {
  ajouterTheme,
  createTablePersonnage,
  createTableTheme,
  getDBConnection,
  getPersonnages,
  getTheme,
  modifierTheme,
  modifierPersonnage,
  ajouterPersonnage,
  supprimerPersonnage,
  ajouterRace,
  getRaces,
  createTableRace,
  createTableClasse,
  getClasses,
  ajouterClasse,
} from './services/db-services';
import { DNDFicheContexteType, MesClasses, MesPersonnages, MesRaces, MesThemes } from './modeles/ModeleFicheDND';

export type RootStackParamList = {
  Accueil: undefined;
  Des: { theme: string };
  Ajouter: undefined;
  Modifier: undefined;
  ListePersonnage: {theme: string};
  InformationPersonnage: undefined;
};

export const FicheDNDContexte = React.createContext<DNDFicheContexteType | null>(null);

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  const [theme, setTheme] = useState<MesThemes[]>([]);
  const [personnages, setPersonnages] = useState<MesPersonnages[]>([]);
  const [newTheme, setNewTheme] = useState('');
  const [setThemes] = useState<string>('');
  
  const [nomRaces, setNomsRaces] = useState<{ [id: number]: string }>({});
  const [nomClasses, setNomsClasses] = useState<{ [id: number]: string }>({});
  const [selectedRace, setSelectedRace] = useState<string>('');
  const [selectedClasse, setSelectedClasse] = useState<string>('');
  const [selectedRaceValeur, setSelectedRaceValeur] = useState<{ id: number; name: string } | null>(null);
  const [selectedClasseValeur, setSelectedClasseValeur] = useState<{ id: number; name: string } | null>(null);
  const [race, setRace] = useState<MesRaces[]>([]);
  const [classe, setClasse] = useState<MesClasses[]>([]);
  const [setRaces] = useState<string>('');
  const [setClasses] = useState<string>('');
  const [newRace, setNewRace] = useState<string>('');
  const [newClasse, setNewClasse] = useState<string>('');
  
  const [newNomPersonnage, setNewNomPersonnage] = useState<string>('');
  const [newClasse_id, setNewClasse_id] = useState<number>(0);
  const [newRace_id, setNewRace_id] = useState<number>(0);
  const [newNiveau, setNewNiveau] = useState<number>(0);
  const [newPvMax, setNewPvMax] = useState<number>(0);
  const [newPvActuel, setNewPvActuel] = useState<number>(0);
  const [newForce, setNewForce] = useState<number>(0);
  const [newBonusForce, setNewBonusForce] = useState<number>(0);
  const [newDexterite, setNewDexterite] = useState<number>(0);
  const [newBonusDexterite, setNewBonusDexterite] = useState<number>(0);
  const [newConstitution, setNewConstitution] = useState<number>(0);
  const [newBonusConstitution, setNewBonusConstitution] = useState<number>(0);
  const [newIntelligence, setNewIntelligence] = useState<number>(0);
  const [newBonusIntelligence, setNewBonusIntelligence] = useState<number>(0);
  const [newSagesse, setNewSagesse] = useState<number>(0);
  const [newBonusSagesse, setNewBonusSagesse] = useState<number>(0);
  const [newCharisme, setNewCharisme] = useState<number>(0);
  const [newBonusCharisme, setNewBonusCharisme] = useState<number>(0);
  const [newAge, setNewAge] = useState<number>(0);
  const [newSexe, setNewSexe] = useState<string>('');
  const [newTaille, setNewTaille] = useState<string>('');
  const [newPoids, setNewPoids] = useState<string>('');
  const [newAlignement, setNewAlignement] = useState<string>('');
  const [newPointExp, setNewPointExp] = useState<number>(0);
  const [newAttaque, setNewAttaque] = useState<string>('');
  const [newDefense, setNewDefense] = useState<number>(0);
  const [newSort, setNewSort] = useState<string>('');
  const [newEquipement, setNewEquipement] = useState<string>('');
  const [newApparence, setNewApparence] = useState<string>('')
  const [newHistoire, setNewHistoire] = useState<string>('');
  const [newAlies, setNewAlies] = useState<string>('');
  const [newTresor, setNewTresor] = useState<string>('');
  const [newNotes, setNewNotes] = useState<string>('');
  const [newNotesSort, setNewNotesSort] = useState<string>('');
  const [newVitesse, setNewVitesse] = useState<number>(0);


  const modifierThemes = async (id: number | null, theme: string) => {
    try {
      const db = await getDBConnection();
      await modifierTheme(db, id, theme);
    } catch (error) {
      console.error(error);
      Alert.alert('La modification a échoué');
    }
  };
  const modifierPersonnages = async ( id: number | null, nomPersonnage: string, age: number, sexe: string, taille: string, poids: string, classe_id: number | null, race_id: number | null, niveau: number, alignement: string, pointExp: number, pvMax: number, pvActuel: number, force: number, bonusForce: number, dexterite: number, bonusDexterite: number, constitution: number, bonusConstitution: number, intelligence: number, bonusIntelligence: number, sagesse: number, bonusSagesse: number, charisme: number, bonusCharisme: number, vitesse: number, attaque: string, defense: number, sort: string, equipement: string, apparence: string, histoire: string, alies: string, tresor: string, notes: string, notesSort: string) => {
    try {
      const db = await getDBConnection();
      await modifierPersonnage(db, id, nomPersonnage, age,
        sexe, taille, poids, classe_id, race_id, niveau, alignement, pointExp, pvMax, pvActuel, force, bonusForce, dexterite, bonusDexterite, constitution, bonusConstitution, intelligence, bonusIntelligence, sagesse, bonusSagesse, charisme, bonusCharisme, vitesse, attaque, defense, sort, equipement, apparence, histoire, alies, tresor, notes, notesSort);
    } catch (error) {
      console.error(error);
      Alert.alert('La modification a échoué');
    }
  }
const ajouterPersonnages = async () => {
    try {
      const db = await getDBConnection();
      const nouveauPersonnage = {
        id: null,
        nomPersonnage: newNomPersonnage,
        age: newAge,
        sexe: newSexe,
        taille: newTaille,
        poids: newPoids,
        classe_id: newClasse_id,
        race_id: newRace_id,
        niveau: newNiveau,
        alignement: newAlignement,
        pointExp: newPointExp,
        pvMax: newPvMax,
        pvActuel: newPvActuel,
        force: newForce,
        bonusForce: newBonusForce,
        dexterite: newDexterite,
        bonusDexterite: newBonusDexterite,
        constitution: newConstitution,
        bonusConstitution: newBonusConstitution,
        intelligence: newIntelligence,
        bonusIntelligence: newBonusIntelligence,
        sagesse: newSagesse,
        bonusSagesse: newBonusSagesse,
        charisme: newCharisme,
        bonusCharisme: newBonusCharisme,
        vitesse: newVitesse,
        attaque: newAttaque,
        defense: newDefense,
        sort: newSort,
        equipement: newEquipement,
        apparence: newApparence,
        histoire: newHistoire,
        alies: newAlies,
        tresor: newTresor,
        notes: newNotes,
        notesSort: newNotesSort,
      };
      setPersonnages([...personnages, nouveauPersonnage]);
      await ajouterPersonnage(db, [nouveauPersonnage]);

      // Clear the input field
      setNewNomPersonnage('');
      setNewAge(0);
      setNewSexe('');
      setNewTaille('');
      setNewPoids('');
      setNewClasse_id(0);
      setNewRace_id(0);
      setNewNiveau(0);
      setNewAlignement('');
      setNewPointExp(0);
      setNewPvMax(0);
      setNewPvActuel(0);
      setNewForce(0);
      setNewBonusForce(0);
      setNewDexterite(0);
      setNewBonusDexterite(0);
      setNewConstitution(0);
      setNewBonusConstitution(0);
      setNewIntelligence(0);
      setNewBonusIntelligence(0);
      setNewSagesse(0);
      setNewBonusSagesse(0);
      setNewCharisme(0);
      setNewBonusCharisme(0);
      setNewVitesse(0);
      setNewAttaque('');
      setNewDefense(0);
      setNewSort('');
      setNewEquipement('');
      setNewApparence('');
      setNewHistoire('');
      setNewAlies('');
      setNewTresor('');
      setNewNotes('');
      setNewNotesSort('');
    } catch (error) {
      console.error(error);
    }
  };
  const loadPersonnage = useCallback(async () => {
    try {
  const initPersonnages = [
        {
          id: 1,
          nomPersonnage: "Thalor Ombrevent",
          age: 120,
          sexe: "Masculin",
          taille: "1m78",
          poids: "65 kg",
          classe_id: 2, // Mage
          race_id: 2, // Elfe
          niveau: 5,
          alignement: "Neutre bon",
          pointExp: 6500,
          pvMax: 28,
          pvActuel: 22,
          force: 10,
          bonusForce: 0,
          dexterite: 16,
          bonusDexterite: 3,
          constitution: 14,
          bonusConstitution: 2,
          intelligence: 18,
          bonusIntelligence: 4,
          sagesse: 13,
          bonusSagesse: 1,
          charisme: 11,
          bonusCharisme: 0,
          vitesse: 9,
          attaque: "Bâton magique (+4) / Rayon de givre",
          defense: 13,
          sort: "Projectiles magiques, Bouclier, Invisibilité, Rayon affaiblissant",
          equipement: "Bâton gravé, Robe d’archimage, Livre de sorts, Composantes magiques",
          apparence: "Un elfe élancé aux longs cheveux argentés et aux yeux violets perçants.",
          histoire: "Thalor a étudié à la Tour de Silvanost, fuyant la guerre pour se consacrer à la connaissance des arcanes. Il cache un passé trouble lié à une magie interdite.",
          alies: "Maître Elorien, Lila la rôdeuse, un golem de pierre nommé 'Roc'.",
          tresor: "Pendentif d’absorption magique, 200 pièces d’or, gemme bleue",
          notes: "Ne fait pas confiance aux nains. A peur de perdre le contrôle de ses pouvoirs.",
          notesSort: "Toujours garder un emplacement pour 'Bouclier' prêt en cas d'embuscade."
        },
        {
          id: 2,
          nomPersonnage: "Thalor Ombrevent",
          age: 120,
          sexe: "Masculin",
          taille: "1m78",
          poids: "65 kg",
          classe_id: 2, // Mage
          race_id: 2, // Elfe
          niveau: 5,
          alignement: "Neutre bon",
          pointExp: 6500,
          pvMax: 28,
          pvActuel: 22,
          force: 10,
          bonusForce: 0,
          dexterite: 16,
          bonusDexterite: 3,
          constitution: 14,
          bonusConstitution: 2,
          intelligence: 18,
          bonusIntelligence: 4,
          sagesse: 13,
          bonusSagesse: 1,
          charisme: 11,
          bonusCharisme: 0,
          vitesse: 9,
          attaque: "Bâton magique (+4) / Rayon de givre",
          defense: 13,
          sort: "Projectiles magiques, Bouclier, Invisibilité, Rayon affaiblissant",
          equipement: "Bâton gravé, Robe d’archimage, Livre de sorts, Composantes magiques",
          apparence: "Un elfe élancé aux longs cheveux argentés et aux yeux violets perçants.",
          histoire: "Thalor a étudié à la Tour de Silvanost, fuyant la guerre pour se consacrer à la connaissance des arcanes. Il cache un passé trouble lié à une magie interdite.",
          alies: "Maître Elorien, Lila la rôdeuse, un golem de pierre nommé 'Roc'.",
          tresor: "Pendentif d’absorption magique, 200 pièces d’or, gemme bleue",
          notes: "Ne fait pas confiance aux nains. A peur de perdre le contrôle de ses pouvoirs.",
          notesSort: "Toujours garder un emplacement pour 'Bouclier' prêt en cas d'embuscade."
        }

      ];
      const db = await getDBConnection();
      await createTablePersonnage(db);
      const personnagesDB = await getPersonnages(db);
      if (personnagesDB.length) {
        setPersonnages(personnagesDB);
      } else {
        await ajouterPersonnage(db, initPersonnages);
        setPersonnages(initPersonnages);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
 
  const SupprimerPersonnages = async (id: number | null) => {
    try {
      const db = await getDBConnection();
      await supprimerPersonnage(db, id);
      setPersonnages(personnages.filter((personnage) => personnage.id !== id));
    } catch (error) {
      console.error(error);
    }
  };
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
      if (racesDB.length) setRace(racesDB);
      else {
        await ajouterRace(db, initRaces);
        setRace(initRaces);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const loadClasse = useCallback(async () => {
    try {
      const initClasse = [
        { id: 1, classe: 'Guerrier' },
        { id: 2, classe: 'Mage' },
        { id: 3, classe: 'Druide' },
      ];
      const db = await getDBConnection();
      await createTableClasse(db);
      const classesDB = await getClasses(db);
      if (classesDB.length) setClasse(classesDB);
      else {
        await ajouterClasse(db, initClasse);
        setClasse(initClasse);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  const loadTheme = useCallback(async () => {
    try {
      const initTheme = [{ id: 0, theme: 'clair' }];
      const db = await getDBConnection();
      await createTableTheme(db);
      const themesDB = await getTheme(db);
      if (themesDB.length) setTheme(themesDB);
      else {
        await ajouterTheme(db, initTheme);
        setTheme(initTheme);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  const valeurs: DNDFicheContexteType  = {
    //Contexte pour les thèmes
    themes: theme,
    setThemes,
    newTheme,
    setNewTheme,
    modifierTheme: modifierThemes,
    loadTheme,

    //Contexte pour les races
    races: race,
    setRaces,
    nomRaces,
    setNomsRaces,
    selectedRace,
    setSelectedRace,
    selectedRaceValeur,
    setSelectedRaceValeur,
    newRace,
    setNewRaces: setNewRace,
    loadRace,

    //Contexte pour les classes
    classes: classe,
    setClasses,
    newClasse,
    setNewClasse,
    nomClasses,
    setNomsClasses,
    selectedClasse,
    setSelectedClasse,
    selectedClasseValeur,
    setSelectedClasseValeur,
    loadClasse,
    //Contexte pour les personnage
    personnages: personnages,
    setMesPersonnages: setPersonnages,
    newNomPersonnage,
    setNewNomPersonnage,
    newClasse_id,
    setNewClasse_id,
    newRace_id,
    setNewRace_id,
    newNiveau,
    setNewNiveau,
    newPvMax,
    setNewPvMax,
    newPvActuel,
    setNewPvActuel,
    newForce,
    setNewForce,
    newBonusForce,
    setNewBonusForce,
    newDexterite,
    setNewDexterite,
    newBonusDexterite,
    setNewBonusDexterite,
    newConstitution,
    setNewConstitution,
    newBonusConstitution,
    setNewBonusConstitution,
    newIntelligence,
    setNewIntelligence,
    newBonusIntelligence,
    setNewBonusIntelligence,
    newSagesse,
    setNewSagesse,
    newBonusSagesse,
    setNewBonusSagesse,
    newCharisme,
    setNewCharisme,
    newBonusCharisme,
    setNewBonusCharisme,
    newAge,
    setNewAge,
    newSexe,
    setNewSexe,
    newTaille,
    setNewTaille,
    newPoids,
    setNewPoids,
    newAlignement,
    setNewAlignement,
    newPointExp,
    setNewPointExp,
    newAttaque,
    setNewAttaque,
    newDefense,
    setNewDefense,
    newSort,
    setNewSort,
    newEquipement,
    setNewEquipement,
    newApparence,
    setNewApparence,
    newHistoire,
    setNewHistoire,
    newAlies,
    setNewAlies,
    newTresor,
    setNewTresor,
    newNotes,
    setNewNotes,
    newNotesSort,
    setNewNotesSort,
    newVitesse,
    setNewVitesse,
    loadPersonnage,
    modifierPersonnage: modifierPersonnages,
    ajouterPersonnage: ajouterPersonnages,
    supprimerPersonnage: SupprimerPersonnages,
    
  };
  useEffect(() => {
  const init = async () => {
    await loadRace();
    await loadTheme();
    await loadClasse();
    await loadPersonnage();
  };
  init();
}, [loadRace, loadTheme, loadClasse, loadPersonnage]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FicheDNDContexte.Provider value={valeurs}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Accueil">
            <Stack.Screen name="Accueil" component={EcranAccueil} />
            <Stack.Screen name="Des" component={EcranDes} options={{ title: 'Dés'}} initialParams={{ theme: '' }} />
            <Stack.Screen name="Ajouter" component={EcranAjout} options={{ title: 'Ajouter un personnage' }} />
            <Stack.Screen name="Modifier" component={EcranModification} options={{ title: 'Modifier un personnage' }} />
            <Stack.Screen name="ListePersonnage" component={EcranListePersonnage} options={{ title: 'Liste des personnages' }} initialParams={{ theme: '' }} />
            <Stack.Screen name="InformationPersonnage" component={EcranInformationPersonnage} options={{ title: 'Mes informations' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </FicheDNDContexte.Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: 'white', // ajustable selon thème
  },
});

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
//   
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

//   

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
