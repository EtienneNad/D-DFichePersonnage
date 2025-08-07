// App.tsx
import React, { JSX, useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Alert, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EcranDes from './components/EcranDe';
import EcranAccueil from './components/EcranAccueil';
import EcranAjout from './components/EcranAjout';
import EcranModification from './components/EcranModification';
import EcranListePersonnage from './components/EcranListePersonnage';
import EcranInformationPersonnage from './components/EcranInformationPersonnage';

// Import des fonctions de gestion de la base de données
import {
  ajouterTheme, creationTablePersonnage, creationTableTheme, recupererDBConnection, recupererPersonnages,
  recupererTheme, modifierTheme, modifierPersonnage, ajouterPersonnage, supprimerPersonnage, ajouterRace, recupererRaces,
  creationTableRace, creationTableClasse, recupererClasses, ajouterClasse,
} from './services/db-services';
// Import des modèles et types
import { DNDFicheContexteType, MesClasses, MesPersonnages, MesRaces, MesThemes } from './modeles/ModeleFicheDND';

// Définition des types pour la navigation
export type RootStackParamList = {
  Accueil: undefined;
  Des: { theme: string };
  Ajouter: { theme: string };
  Modifier: {
    theme: string; id: number | null; nomPersonnage: string; age: number; sexe: string; taille: string; poids: string;
    classe_id: number; race_id: number; niveau: number; alignement: string; pointExpAcquis: number; pointExpObjectif: number;
    pvMax: number; pvActuel: number; force: number; bonusForce: number; dexterite: number; bonusDexterite: number; constitution: number;
    bonusConstitution: number; intelligence: number; bonusIntelligence: number; sagesse: number; bonusSagesse: number; charisme: number;
    bonusCharisme: number; vitesse: number; attaque: string; defense: number; sort: string; equipement: string;
    apparence: string; histoire: string; alies: string; tresor: string; notes: string; notesSort: string;
  };
  ListePersonnage: { theme: string };
  InformationPersonnage: {
    theme: string; id: number | null; nomPersonnage: string; age: number; sexe: string; taille: string; poids: string;
    classe_id: number; race_id: number; niveau: number; alignement: string; pointExpAcquis: number; pointExpObjectif: number;
    pvMax: number; pvActuel: number; force: number; bonusForce: number; dexterite: number; bonusDexterite: number; constitution: number;
    bonusConstitution: number; intelligence: number; bonusIntelligence: number; sagesse: number; bonusSagesse: number; charisme: number;
    bonusCharisme: number; vitesse: number; attaque: string; defense: number; sort: string; equipement: string;
    apparence: string; histoire: string; alies: string; tresor: string; notes: string; notesSort: string;
  };
};

// Création du contexte pour les fiches D&D
export const FicheDNDContexte = React.createContext<DNDFicheContexteType | null>(null);

// Création du composant principal de l'application
const Stack = createNativeStackNavigator<RootStackParamList>();

// Composant principal de l'application
function App(): JSX.Element {

  // État pour stocker les thèmes, personnages
  const [theme, setTheme] = useState<MesThemes[]>([]);
  const [personnages, setPersonnages] = useState<MesPersonnages[]>([]);
  const [nouveauTheme, setNouveauTheme] = useState('');
  const [setThemes] = useState<string>('');

  // État pour stocker les noms des races et classes
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
  const [nouveauRace, setNouveauRace] = useState<string>('');
  const [nouveauClasse, setNouveauClasse] = useState<string>('');

  // etat pour stocker les valeurs des personnages
  const [nouveauNomPersonnage, setNouveauNomPersonnage] = useState<string>('');
  const [nouveauClasse_id, setNouveauClasse_id] = useState<number>(0);
  const [nouveauRace_id, setNouveauRace_id] = useState<number>(0);
  const [nouveauNiveau, setNouveauNiveau] = useState<number>(0);
  const [nouveauPvMax, setNouveauPvMax] = useState<number>(0);
  const [nouveauPvActuel, setNouveauPvActuel] = useState<number>(0);
  const [nouveauForce, setNouveauForce] = useState<number>(0);
  const [nouveauBonusForce, setNouveauBonusForce] = useState<number>(0);
  const [nouveauDexterite, setNouveauDexterite] = useState<number>(0);
  const [nouveauBonusDexterite, setNouveauBonusDexterite] = useState<number>(0);
  const [nouveauConstitution, setNouveauConstitution] = useState<number>(0);
  const [nouveauBonusConstitution, setNouveauBonusConstitution] = useState<number>(0);
  const [nouveauIntelligence, setNouveauIntelligence] = useState<number>(0);
  const [nouveauBonusIntelligence, setNouveauBonusIntelligence] = useState<number>(0);
  const [nouveauSagesse, setNouveauSagesse] = useState<number>(0);
  const [nouveauBonusSagesse, setNouveauBonusSagesse] = useState<number>(0);
  const [nouveauCharisme, setNouveauCharisme] = useState<number>(0);
  const [nouveauBonusCharisme, setNouveauBonusCharisme] = useState<number>(0);
  const [nouveauAge, setNouveauAge] = useState<number>(0);
  const [nouveauSexe, setNouveauSexe] = useState<string>('');
  const [nouveauTaille, setNouveauTaille] = useState<string>('');
  const [nouveauPoids, setNouveauPoids] = useState<string>('');
  const [nouveauAlignement, setNouveauAlignement] = useState<string>('');
  const [nouveauPointExperianceAcquis, setNouveauPointExperianceAcquis] = useState<number>(0);
  const [nouveauPointExpObjectif, setNouveauPointExpObjectif] = useState<number>(0);
  const [nouveauAttaque, setNouveauAttaque] = useState<string>('');
  const [nouveauDefense, setNouveauDefense] = useState<number>(0);
  const [nouveauSort, setNouveauSort] = useState<string>('');
  const [nouveauEquipement, setNouveauEquipement] = useState<string>('');
  const [nouveauApparence, setNouveauApparence] = useState<string>('')
  const [nouveauHistoire, setNouveauHistoire] = useState<string>('');
  const [nouveauAlies, setNouveauAlies] = useState<string>('');
  const [nouveauTresor, setNouveauTresor] = useState<string>('');
  const [nouveauNotes, setNouveauNotes] = useState<string>('');
  const [nouveauNotesSort, setNouveauNotesSort] = useState<string>('');
  const [nouveauVitesse, setNouveauVitesse] = useState<number>(0);


  // Fonction permettant de charger les thème
  const modifierThemes = async (id: number | null, theme: string) => {
    try {
      const db = await recupererDBConnection();
      await modifierTheme(db, id, theme);
    } catch (error) {
      console.error(error);
      Alert.alert('La modification a échoué');
    }
  };

  // Fonction pour modifier un personnage  
  const modifierPersonnages = async (
    id: number | null, nomPersonnage: string, age: number, sexe: string, taille: string, poids: string, classe_id: number | null, race_id: number | null,
    niveau: number, alignement: string, pointExpAcquis: number, pointExpObjectif: number, pvMax: number,
    pvActuel: number, force: number, bonusForce: number, dexterite: number, bonusDexterite: number, constitution: number,
    bonusConstitution: number, intelligence: number, bonusIntelligence: number, sagesse: number, bonusSagesse: number,
    charisme: number, bonusCharisme: number, vitesse: number, attaque: string, defense: number, sort: string, equipement: string,
    apparence: string, histoire: string, alies: string, tresor: string, notes: string, notesSort: string
  ) => {
    try {
      // Récupération de la connexion à la base de données
      const db = await recupererDBConnection();
      // Modification du personnage dans la base de données
      await modifierPersonnage(
        db, id, nomPersonnage, age, sexe, taille, poids, classe_id, race_id, niveau, alignement, pointExpAcquis, pointExpObjectif,
        pvMax, pvActuel, force, bonusForce, dexterite, bonusDexterite, constitution, bonusConstitution, intelligence, bonusIntelligence,
        sagesse, bonusSagesse, charisme, bonusCharisme, vitesse, attaque, defense, sort, equipement, apparence, histoire, alies, tresor, notes, notesSort
      );
      loadPersonnage();
      Alert.alert("Succès", "La modification a été effectuée avec succès");
    } catch (error: any) {
      Alert.alert("Erreur", "La modification a échoué : " + error?.message);
    }
  };

  // Fonction pour ajouter un personnage
  const ajouterPersonnages = async (perso: Omit<MesPersonnages, 'id'>) => {
    try {
      const db = await recupererDBConnection();
      const nouveauPersonnage = {
        id: null, nomPersonnage: nouveauNomPersonnage, age: nouveauAge, sexe: nouveauSexe, taille: nouveauTaille, poids: nouveauPoids, classe_id: nouveauClasse_id,
        race_id: nouveauRace_id, niveau: nouveauNiveau, alignement: nouveauAlignement, pointExpAcquis: nouveauPointExperianceAcquis, pointExpObjectif: nouveauPointExpObjectif,
        pvMax: nouveauPvMax, pvActuel: nouveauPvActuel, force: nouveauForce, bonusForce: nouveauBonusForce, dexterite: nouveauDexterite, bonusDexterite: nouveauBonusDexterite,
        constitution: nouveauConstitution, bonusConstitution: nouveauBonusConstitution, intelligence: nouveauIntelligence, bonusIntelligence: nouveauBonusIntelligence,
        sagesse: nouveauSagesse, bonusSagesse: nouveauBonusSagesse, charisme: nouveauCharisme, bonusCharisme: nouveauBonusCharisme, vitesse: nouveauVitesse,
        attaque: nouveauAttaque, defense: nouveauDefense, sort: nouveauSort, equipement: nouveauEquipement, apparence: nouveauApparence, histoire: nouveauHistoire,
        alies: nouveauAlies, tresor: nouveauTresor, notes: nouveauNotes, notesSort: nouveauNotesSort,
      };
      setPersonnages([...personnages, nouveauPersonnage]);
      await ajouterPersonnage(db, [nouveauPersonnage]);

      // Nettoyage des champs après l'ajout
      setNouveauNomPersonnage(''); setNouveauAge(0); setNouveauSexe(''); setNouveauTaille(''); setNouveauPoids(''); setNouveauClasse_id(0);
      setNouveauRace_id(0); setNouveauNiveau(0); setNouveauAlignement(''); setNouveauPointExperianceAcquis(0); setNouveauPointExpObjectif(0);
      setNouveauPvMax(0); setNouveauPvActuel(0); setNouveauForce(0); setNouveauBonusForce(0); setNouveauDexterite(0); setNouveauBonusDexterite(0);
      setNouveauConstitution(0); setNouveauBonusConstitution(0); setNouveauIntelligence(0); setNouveauBonusIntelligence(0);
      setNouveauSagesse(0); setNouveauBonusSagesse(0); setNouveauCharisme(0); setNouveauBonusCharisme(0); setNouveauVitesse(0); setNouveauAttaque('');
      setNouveauDefense(0); setNouveauSort(''); setNouveauEquipement(''); setNouveauApparence('');
      setNouveauHistoire(''); setNouveauAlies(''); setNouveauTresor(''); setNouveauNotes(''); setNouveauNotesSort('');
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction permettant de charger les données de test des personnages
  const loadDonneesTestPersonnages = useCallback(async () => {
    try {
      // Initialiser les personnages de test
      const initPersonnages = [
        {
          id: 1, nomPersonnage: "Thalor Ombrevent", age: 120, sexe: "Masculin", taille: "1m78", poids: "65 kg",
          classe_id: 2, race_id: 2, niveau: 5, alignement: "Neutre bon", pointExpAcquis: 6500, pointExpObjectif: 7000, pvMax: 28, pvActuel: 22,
          force: 10, bonusForce: 0, dexterite: 16, bonusDexterite: 3, constitution: 14, bonusConstitution: 2, intelligence: 18, bonusIntelligence: 4,
          sagesse: 13, bonusSagesse: 1, charisme: 11, bonusCharisme: 0, vitesse: 9, attaque: "Bâton magique (+4) / Rayon de givre", defense: 13,
          sort: "Projectiles magiques, Bouclier, Invisibilité, Rayon affaiblissant", equipement: "Bâton gravé, Robe d’archimage, Livre de sorts, Composantes magiques",
          apparence: "Un elfe élancé aux longs cheveux argentés et aux yeux violets perçants.",
          histoire: "Thalor a étudié à la Tour de Silvanost, fuyant la guerre pour se consacrer à la connaissance des arcanes. Il cache un passé trouble lié à une magie interdite.",
          alies: "Maître Elorien, Lila la rôdeuse, un golem de pierre nommé 'Roc'.",
          tresor: "Pendentif d’absorption magique, 200 pièces d’or, gemme bleue",
          notes: "Ne fait pas confiance aux nains. A peur de perdre le contrôle de ses pouvoirs.",
          notesSort: "Toujours garder un emplacement pour 'Bouclier' prêt en cas d'embuscade."
        },

        {
          id: 2, nomPersonnage: "Kaelen Forgebrise", age: 42, sexe: "Masculin", taille: "1m45", poids: "85 kg", classe_id: 1, race_id: 3,
          niveau: 4, alignement: "Loyal Neutre", pointExpAcquis: 4100, pointExpObjectif: 5000, pvMax: 36, pvActuel: 36, force: 17, bonusForce: 3,
          dexterite: 12, bonusDexterite: 1, constitution: 16, bonusConstitution: 3, intelligence: 10, bonusIntelligence: 0, sagesse: 11, bonusSagesse: 0,
          charisme: 9, bonusCharisme: -1, vitesse: 7, attaque: "Hache de guerre (+5), Bouclier, Coup de bouclier", defense: 17,
          sort: "", equipement: "Armure de plaques, Hache de guerre naine, Bouclier en acier gravé, Talisman d’honneur",
          apparence: "Un nain trapu au regard dur, avec une barbe tressée ornée d’anneaux de clan, et des cicatrices visibles sur les bras.",
          histoire: "Kaelen est un ancien garde royal du royaume de Grunndak, tombé en disgrâce après avoir refusé d'obéir à un ordre injuste. Depuis, il parcourt le monde pour restaurer son honneur.",
          alies: "Darra Forgebraise (sa sœur forgeronne), un ancien mage du royaume, et un griffon blessé qu’il a sauvé.",
          tresor: "Anneau de résistance au feu, 150 pièces d’or, hache ancienne de son clan",
          notes: "Doute constamment de ses choix, évite les conflits politiques. Protège les faibles sans hésitation.",
          notesSort: "Aucun sort – guerrier pur. Préfère les actions directes aux plans complexes."
        }



      ];
      const db = await recupererDBConnection();
      // Création de la table des personnages si elle n'existe pas
      await creationTablePersonnage(db);
      const personnagesDB = await recupererPersonnages(db);
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

  // fonction pemettant de charger les données des personnages
  const loadPersonnage = useCallback(async () => {
    try {

      const db = await recupererDBConnection();
      await creationTablePersonnage(db);
      const personnagesDB = await recupererPersonnages(db);
      if (personnagesDB.length) {
        setPersonnages(personnagesDB);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Fonction pour supprimer un personnage
  const SupprimerPersonnages = async (id: number | null) => {
    try {
      const db = await recupererDBConnection();
      await supprimerPersonnage(db, id);
      setPersonnages(personnages.filter((personnage) => personnage.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction permettant de charger les races
  const loadRace = useCallback(async () => {
    try {
      const initRaces = [
        { id: 1, race: 'Humain' },
        { id: 2, race: 'Elfe' },
        { id: 3, race: 'Nain' },
      ];
      const db = await recupererDBConnection();
      await creationTableRace(db);
      const racesDB = await recupererRaces(db);
      if (racesDB.length) setRace(racesDB);
      else {
        await ajouterRace(db, initRaces);
        setRace(initRaces);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Fonction permettant de charger les classes
  const loadClasse = useCallback(async () => {
    try {
      const initClasse = [
        { id: 1, classe: 'Guerrier' },
        { id: 2, classe: 'Mage' },
        { id: 3, classe: 'Druide' },
      ];
      const db = await recupererDBConnection();
      await creationTableClasse(db);
      const classesDB = await recupererClasses(db);
      if (classesDB.length) setClasse(classesDB);
      else {
        await ajouterClasse(db, initClasse);
        setClasse(initClasse);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Fonction permettant de charger les thèmes
  const loadTheme = useCallback(async () => {
    try {
      const initTheme = [{ id: 0, theme: 'clair' }];
      const db = await recupererDBConnection();
      await creationTableTheme(db);
      const themesDB = await recupererTheme(db);
      if (themesDB.length) setTheme(themesDB);
      else {
        await ajouterTheme(db, initTheme);
        setTheme(initTheme);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);



  // Valeurs du contexte pour les fiches D&D
  // Ces valeurs seront utilisées dans les composants enfants pour accéder aux données et fonctions
  const valeurs: DNDFicheContexteType = {
    //Contexte pour les thèmes
    themes: theme,
    setThemes,
    nouveauTheme,
    setNouveauTheme,
    modifierTheme: modifierThemes,
    loadTheme,

    //Contexte pour les races
    races: race, setRaces, nomRaces, setNomsRaces, selectedRace, setSelectedRace,
    selectedRaceValeur, setSelectedRaceValeur, nouveauRace, setNouveauRaces: setNouveauRace, loadRace,

    //Contexte pour les classes
    classes: classe, setClasses, nouveauClasse, setNouveauClasse, nomClasses, setNomsClasses,
    selectedClasse, setSelectedClasse, selectedClasseValeur, setSelectedClasseValeur, loadClasse,
    //Contexte pour les personnage
    personnages: personnages, setMesPersonnages: setPersonnages, nouveauNomPersonnage,
    setNouveauNomPersonnage, nouveauClasse_id, setNouveauClasse_id, nouveauRace_id, setNouveauRace_id, nouveauNiveau,
    setNouveauNiveau, nouveauPvMax, setNouveauPvMax, nouveauPvActuel, setNouveauPvActuel, nouveauForce, setNouveauForce,
    nouveauBonusForce, setNouveauBonusForce, nouveauDexterite, setNouveauDexterite, nouveauBonusDexterite,
    setNouveauBonusDexterite, nouveauConstitution, setNouveauConstitution, nouveauBonusConstitution,
    setNouveauBonusConstitution, nouveauIntelligence, setNouveauIntelligence, nouveauBonusIntelligence,
    setNouveauBonusIntelligence, nouveauSagesse, setNouveauSagesse, nouveauBonusSagesse,
    setNouveauBonusSagesse, nouveauCharisme, setNouveauCharisme, nouveauBonusCharisme,
    setNouveauBonusCharisme, nouveauAge, setNouveauAge, nouveauSexe, setNouveauSexe,
    nouveauTaille, setNouveauTaille, nouveauPoids, setNouveauPoids, nouveauAlignement, setNouveauAlignement, nouveauPointExpObjectif,
    setNouveauPointExpObjectif, nouveauPointExperianceAcquis, setNouveauPointExperianceAcquis, nouveauAttaque, setNouveauAttaque, nouveauDefense,
    setNouveauDefense, nouveauSort, setNouveauSort, nouveauEquipement, setNouveauEquipement, nouveauApparence,
    setNouveauApparence, nouveauHistoire, setNouveauHistoire, nouveauAlies, setNouveauAlies, nouveauTresor,
    setNouveauTresor, nouveauNotes, setNouveauNotes, nouveauNotesSort, setNouveauNotesSort, nouveauVitesse,
    setNouveauVitesse, loadPersonnage, modifierPersonnage: modifierPersonnages,
    ajouterPersonnage: ajouterPersonnages, supprimerPersonnage: SupprimerPersonnages,

  };

  // Chargement initial des données
  // Utilisation de useEffect pour charger les données au démarrage de l'application
  useEffect(() => {
    const init = async () => {
      await loadRace();
      await loadTheme();
      await loadClasse();
      await loadPersonnage();
      await loadDonneesTestPersonnages();
    };
    init();
  }, [loadRace, loadTheme, loadClasse, loadPersonnage, loadDonneesTestPersonnages]);

  // retourne le composant principal de l'application
  // Il encapsule les écrans de navigation et fournit le contexte pour les fiches D&D
  return (
    <SafeAreaView style={styles.safeArea}>
      <FicheDNDContexte.Provider value={valeurs}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Accueil">
            <Stack.Screen name="Accueil" component={EcranAccueil} options={{ title: '' }} />
            <Stack.Screen name="Des" component={EcranDes} options={{ title: 'Dés' }} initialParams={{ theme: '' }} />
            <Stack.Screen name="Ajouter" component={EcranAjout} options={{ title: 'Ajouter un personnage' }} initialParams={{ theme: '' }} />
            <Stack.Screen name="Modifier" component={EcranModification} options={{ title: 'Modifier un personnage' }} initialParams={{
              theme: '', id: 0, nomPersonnage: '', age: 0, sexe: '', taille: '', poids: '',
              classe_id: 0, race_id: 0, niveau: 0, alignement: '', pointExpAcquis: 0, pointExpObjectif: 0,
              pvMax: 0, pvActuel: 0, force: 0, bonusForce: 0, dexterite: 0, bonusDexterite: 0, constitution: 0,
              bonusConstitution: 0, intelligence: 0, bonusIntelligence: 0, sagesse: 0, bonusSagesse: 0, charisme: 0,
              bonusCharisme: 0, vitesse: 0, attaque: '', defense: 0, sort: '', equipement: '',
              apparence: '', histoire: '', alies: '', tresor: '', notes: '', notesSort: ''
            }} />
            <Stack.Screen name="ListePersonnage" component={EcranListePersonnage} options={{ title: 'Liste des personnages' }} initialParams={{ theme: '' }} />
            <Stack.Screen name="InformationPersonnage" component={EcranInformationPersonnage} options={{ title: 'Mes informations' }}
              initialParams={{
                theme: '', id: 0, nomPersonnage: '', age: 0, sexe: '', taille: '', poids: '',
                classe_id: 0, race_id: 0, niveau: 0, alignement: '', pointExpAcquis: 0, pointExpObjectif: 0,
                pvMax: 0, pvActuel: 0, force: 0, bonusForce: 0, dexterite: 0, bonusDexterite: 0, constitution: 0,
                bonusConstitution: 0, intelligence: 0, bonusIntelligence: 0, sagesse: 0, bonusSagesse: 0, charisme: 0,
                bonusCharisme: 0, vitesse: 0, attaque: '', defense: 0, sort: '', equipement: '',
                apparence: '', histoire: '', alies: '', tresor: '', notes: '', notesSort: ''
              }} />
          </Stack.Navigator>
        </NavigationContainer>
      </FicheDNDContexte.Provider>
    </SafeAreaView>
  );
}

// Styles pour l'application
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: 'white', // ajustable selon thème
  },
});

export default App;