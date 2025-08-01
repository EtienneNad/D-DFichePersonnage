import React, { JSX, useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { MesRaces } from './modeles/ModeleRace';
import { MesClasses } from './modeles/ModeleClasse';
import { MesThemes } from './modeles/ModeleTheme';

import {
  createTableRace,
  ajouterRace,
  getRaces,
  getRaceID,
  createTableTheme,
  getTheme,
  modifierTheme,
  getDBConnection,
  ajouterTheme,
  createTableClasse,
  ajouterClasse,
  getClasses,
  getClasseID,
  getPersonnages,
  createTablePersonnage,
  ajouterPersonnage
} from './services/db-services';
import { MesPersonnages } from './modeles/ModelePersonnage';

function App(): JSX.Element {

  const [nomRaces, setNomsRaces] = useState<{ [id: number]: string }>({});
  const [nomClasses, setNomsClasses] = useState<{ [id: number]: string }>({});
  const [selectedRace, setSelectedRace] = useState<string>('');
  const [selectedClasse, setSelectedClasse] = useState<string>('');
  const [race, setRaces] = useState<MesRaces[]>([]);
  const [theme, setTheme] = useState<MesThemes[]>([]);
  const [personnages, setPersonnages] = useState<MesPersonnages[]>([]);
  const [classe, setClasse] = useState<MesClasses[]>([]);
  const [des, setDes] = useState<{ [key: string]: number | null }>({
    d20: null,
    d12: null,
    d10: null,
    d8: null,
    d6: null,
    d4: null,
  });
  const raceDropdownData = race.map((item) => ({
  label: item.race,
  value: item.race,
}));
const classeDropdownData = race.map((item) => ({
  label: item.race,
  value: item.race,
}));
  const loadTheme = useCallback(async () => {
    try {
      const initTheme = [
        { id: 0, theme: 'clair' },
      ];
      const db = await getDBConnection();
      await createTableTheme(db);
      const themesDB = await getTheme(db);
      if (themesDB.length) {
        setTheme(themesDB);
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
  const init = async () => {
    await loadRace();
    await loadTheme();
    await loadClasse();
    await loadPersonnage();
  };
  init();
}, [loadRace, loadTheme, loadClasse, loadPersonnage]);

useEffect(() => {
  const chargerInfos = async () => {
    const nomsR: { [id: number]: string } = {};
    const nomsC: { [id: number]: string } = {};

    for (const perso of personnages) {
      const raceNom = await recupererRace(perso.race_id ?? 0);
      const classeNom = await recupererClasse(perso.classe_id ?? 0);
      nomsR[perso.id ?? 0] = raceNom;
      nomsC[perso.id ?? 0] = classeNom;
    }

    setNomsRaces(nomsR);
    setNomsClasses(nomsC);
  };

  if (personnages.length > 0) {
    chargerInfos();
  }
}, [personnages]);
const recupererRace = async (id: number): Promise<string> => {
  const db = await getDBConnection();
  const race = await getRaceID(db, id);
  return race ? race.race : '';
};
const recupererClasse = async (id: number): Promise<string> => {
  const db = await getDBConnection();
  const classe = await getClasseID(db, id);
  return classe ? classe.classe : '';
};
const modifierThemes = async (id: number | null, nouveauTheme: string) => {
  try {
    const db = await getDBConnection();
    await modifierTheme(db, id, nouveauTheme);
    setTheme([{ id, theme: nouveauTheme }]); // mettre à jour l’état local
  } catch (error) {
    console.error(error);
    Alert.alert('La modification du thème a échoué');
  }
};

const changerTheme = () => {
  if (theme.length === 0) return;
  const nouveauTheme = theme[0].theme === 'clair' ? 'sombre' : 'clair';
  modifierThemes(theme[0].id, nouveauTheme);
};

const genererDe = (faces: number): void => {
  const valeur = Math.floor(Math.random() * faces) + 1;
  setDes((prev) => ({ ...prev, [`d${faces}`]: valeur }));
};

const listeDes = [20, 12, 10, 8, 6, 4];
const themeActuel = theme[0]?.theme || 'clair';

return (
  <ScrollView contentContainerStyle={[styles.scrollContent, themeActuel === 'sombre' && { backgroundColor: '#222' }]}>
    <Text style={[styles.baseText, themeActuel === 'sombre' && { color: 'white' }]}>
  Sélectionne ta race :
</Text>

<View style={styles.dropdownContainer}>
  <Dropdown
    style={[
      styles.dropdown,
      themeActuel === 'sombre' && { backgroundColor: '#333', borderColor: '#666' },
    ]}
    containerStyle={{ backgroundColor: themeActuel === 'sombre' ? '#333' : '#fff' }}
    itemTextStyle={{ color: themeActuel === 'sombre' ? '#fff' : '#000' }}
    placeholderStyle={{ color: themeActuel === 'sombre' ? '#ccc' : '#999' }}
    selectedTextStyle={{ color: themeActuel === 'sombre' ? '#fff' : '#000' }}
    data={raceDropdownData}
    labelField="label"
    valueField="value"
    placeholder="-- Choisir une race --"
    value={selectedRace}
    onChange={(item) => {
      setSelectedRace(item.value);
    }}
  />
</View>

{selectedRace ? (
  <Text style={styles.selectedRace}>Race choisie : {selectedRace}</Text>
) : null}

    <Text style={[styles.baseText, themeActuel === 'sombre' && { color: 'white' }]}>
      Sélectionne ta classe :
    </Text>

    <View style={styles.raceList}>
      {classe.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => setSelectedClasse(item.classe)}
          style={[
            styles.raceButton,
            selectedClasse === item.classe && styles.raceButtonSelected,
          ]}
        >
          <Text style={styles.raceText}>{item.classe}</Text>
        </TouchableOpacity>
      ))}
    </View>

    {selectedClasse ? (
      <Text style={styles.selectedRace}>Classe choisie : {selectedClasse}</Text>
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

    <TouchableOpacity style={styles.themeButton} onPress={changerTheme}>
      <Text style={styles.themeButtonText}>
        Thème actuel : {themeActuel === 'clair' ? 'Clair' : 'Sombre'} — Changer
      </Text>
    </TouchableOpacity>
{personnages.length > 0 && personnages.map((perso, index) => (
  <View key={perso.id || index} style={styles.personnageContainer}>
    <Text style={styles.sectionTitle}>Fiche du personnage #{index + 1}</Text>
    <Text style={styles.personnageTexte}>Nom : {perso.nomPersonnage}</Text>
    <Text style={styles.personnageTexte}>Classe: {nomClasses[perso.classe_id ?? 0]}</Text>
    <Text style={styles.personnageTexte}>Race: {nomRaces[perso.race_id ?? 0]}</Text>
    <Text style={styles.personnageTexte}>Âge : {perso.age} ans</Text>
    <Text style={styles.personnageTexte}>Sexe : {perso.sexe}</Text>
    <Text style={styles.personnageTexte}>Taille : {perso.taille}</Text>
    <Text style={styles.personnageTexte}>Poids : {perso.poids}</Text>
    <Text style={styles.personnageTexte}>Niveau : {perso.niveau}</Text>
    <Text style={styles.personnageTexte}>Alignement : {perso.alignement}</Text>
    <Text style={styles.personnageTexte}>PV : {perso.pvActuel} / {perso.pvMax}</Text>
    <Text style={styles.personnageTexte}>Attaque : {perso.attaque}</Text>
    <Text style={styles.personnageTexte}>Sorts : {perso.sort}</Text>
    <Text style={styles.personnageTexte}>Équipement : {perso.equipement}</Text>
    <Text style={styles.personnageTexte}>Apparence : {perso.apparence}</Text>
    <Text style={styles.personnageTexte}>Histoire : {perso.histoire}</Text>
    <Text style={styles.personnageTexte}>Alliés : {perso.alies}</Text>
    <Text style={styles.personnageTexte}>Trésor : {perso.tresor}</Text>
    <Text style={styles.personnageTexte}>Notes : {perso.notes}</Text>
    <Text style={styles.personnageTexte}>Notes sur les sorts : {perso.notesSort}</Text>
  </View>
))}

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
  personnageContainer: {
  marginTop: 30,
  padding: 20,
  backgroundColor: '#f5f5f5',
  borderRadius: 12,
  width: '100%',
},
sectionTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
  color: '#333',
  textAlign: 'center',
},
personnageTexte: {
  fontSize: 16,
  marginVertical: 2,
  color: '#444',
},
dropdownContainer: {
  width: '100%',
  marginBottom: 10,
},
dropdown: {
  height: 50,
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 8,
  paddingHorizontal: 10,
},

});

export default App;
