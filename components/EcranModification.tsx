// components/EcranModification.tsx
import React, { useState, useContext } from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, TextInput,} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, FicheDNDContexte } from '../App';
import { DNDFicheContexteType } from '../modeles/ModeleFicheDND';
import { Dropdown } from 'react-native-element-dropdown';

// Type pour les propriétés du composant utilisé pour la navigation et les paramètres de route
type Props = NativeStackScreenProps<RootStackParamList, 'Modifier'>;

//Page permettant de modifier un personnage 
const EcranModification = ({ route, navigation }: Props) => {

  // Récupération des paramètres de la route
  const {theme,id,nomPersonnage,classe_id,race_id,niveau,pvMax,pvActuel,force,bonusForce,dexterite,bonusDexterite,constitution,
    bonusConstitution,intelligence,bonusIntelligence,sagesse,bonusSagesse,charisme,bonusCharisme,vitesse,age,sexe,taille,
    poids,alignement,pointExpAcquis,pointExpObjectif,attaque,defense,sort,equipement,apparence,histoire,alies,tresor,
    notes,notesSort, } = route.params;

  // Couleurs dynamiques selon le thème
  const themeActuel = theme ?? 'clair';
  const couleurTexte = themeActuel === 'clair' ? '#000' : '#fff';
  const couleurFond = themeActuel === 'clair' ? '#fff' : '#1c1c1c';
  const couleurInput = themeActuel === 'clair' ? '#f0f0f0' : '#333';
  const couleurBordure = themeActuel === 'clair' ? '#ccc' : '#666';

  // Constantes récupérées du contexte principal de l'application qui est dans App.tsx
  const { races: race, classes: classe, modifierPersonnage, loadPersonnage,} = useContext(FicheDNDContexte) as DNDFicheContexteType;
  

  // États pour les dropdowns de sélection
    const [selectionnerRaceValeur, setSelectionnerRaceValeur] = useState<{ id: number, name: string } | null>(null);
    const [selectionnerClasseValeur, setSelectionnerClasseValeur] = useState<{ id: number, name: string } | null>(null);
    
  // États pour les champs du formulaire
  const [nouveauNomPersonnage, setNouveauNomPersonnage] = useState(nomPersonnage);
  const [nouveauClasse_id, setNouveauClasse_id] = useState(classe_id);
  const [nouveauRace_id, setNouveauRace_id] = useState(race_id);
  const [nouveauNiveau, setNouveauNiveau] = useState(niveau);
  const [nouveauPvMax, setNouveauPvMax] = useState(pvMax);
  const [nouveauPvActuel, setNouveauPvActuel] = useState(pvActuel);
  const [nouveauForce, setNouveauForce] = useState(force);
  const [nouveauBonusForce, setNouveauBonusForce] = useState(bonusForce);
  const [nouveauDexterite, setNouveauDexterite] = useState(dexterite);
  const [nouveauBonusDexterite, setNouveauBonusDexterite] = useState(bonusDexterite);
  const [nouveauConstitution, setNouveauConstitution] = useState(constitution);
  const [nouveauBonusConstitution, setNouveauBonusConstitution] = useState(bonusConstitution);
  const [nouveauIntelligence, setNouveauIntelligence] = useState(intelligence);
  const [nouveauBonusIntelligence, setNouveauBonusIntelligence] = useState(bonusIntelligence);
  const [nouveauSagesse, setNouveauSagesse] = useState(sagesse);
  const [nouveauBonusSagesse, setNouveauBonusSagesse] = useState(bonusSagesse);
  const [nouveauCharisme, setNouveauCharisme] = useState(charisme);
  const [nouveauBonusCharisme, setNouveauBonusCharisme] = useState(bonusCharisme);
  const [nouveauVitesse, setNouveauVitesse] = useState(vitesse);
  const [nouveauAge, setNouveauAge] = useState(age);
  const [nouveauSexe, setNouveauSexe] = useState(sexe);
  const [nouveauTaille, setNouveauTaille] = useState(taille);
  const [nouveauPoids, setNouveauPoids] = useState(poids);
  const [nouveauAlignement, setNouveauAlignement] = useState(alignement);
  const [nouveauObjectifExp, setNouveauObjectifExp] = useState(pointExpObjectif);
  const [nouveauAcquisExp, setNouveauAcquisExp] = useState(pointExpAcquis);
  const [nouveauAttaque, setNouveauAttaque] = useState(attaque);
  const [nouveauDefense, setNouveauDefense] = useState(defense);
  const [nouveauSort, setNouveauSort] = useState(sort);
  const [nouveauEquipement, setNouveauEquipement] = useState(equipement);
  const [nouveauApparence, setNouveauApparence] = useState(apparence);
  const [nouveauHistoire, setNouveauHistoire] = useState(histoire);
  const [nouveauAlies, setNouveauAlies] = useState(alies);
  const [nouveauTresor, setNouveauTresor] = useState(tresor);
  const [nouveauNotes, setNouveauNotes] = useState(notes);
  const [nouveauNotesSort, setNouveauNotesSort] = useState(notesSort);

  // Fonction pour modifier le personnage 
  const handleModifierPersonnage = () => {
    modifierPersonnage(
      id,
      nouveauNomPersonnage,
      nouveauAge,
      nouveauSexe,
      nouveauTaille,
      nouveauPoids,
      nouveauClasse_id,
      nouveauRace_id,
      nouveauNiveau,
      nouveauAlignement,
      nouveauAcquisExp,
      nouveauObjectifExp,
      nouveauPvMax,
      nouveauPvActuel,
      nouveauForce,
      nouveauBonusForce,
      nouveauDexterite,
      nouveauBonusDexterite,
      nouveauConstitution,
      nouveauBonusConstitution,
      nouveauIntelligence,
      nouveauBonusIntelligence,
      nouveauSagesse,
      nouveauBonusSagesse,
      nouveauCharisme,
      nouveauBonusCharisme,
      nouveauVitesse,
      nouveauAttaque,
      nouveauDefense,
      nouveauSort,
      nouveauEquipement,
      nouveauApparence,
      nouveauHistoire,
      nouveauAlies,
      nouveauTresor,
      nouveauNotes,
      nouveauNotesSort
    );
   


    loadPersonnage();
    navigation.navigate('Accueil');
  };

    // création des données pour les dropdown
    const raceDropdownDonne = race.map((item) => ({ label: item.race, value: item.id }));
    const classeDropdownDonne = classe.map((item) => ({ label: item.classe, value: item.id }));

  // Rendu du label pour les champs texte
  const renduLabel = (label: string) => (
    <Text style={[styles.label, { color: couleurTexte }]}>{label}</Text>
  );

// Rendu du composant TextInput pour les champs texte et numérique 
  const renduInput = (value: string, setValeur: (valeur: string) => void, placeholder?: string, keyboardType: 'default' | 'numeric' = 'default') => (
    <TextInput
      style={[styles.input, { color: couleurTexte, backgroundColor: couleurInput, borderColor: couleurBordure }]}
      value={value}
      onChangeText={setValeur}
      placeholder={placeholder}
      placeholderTextColor={themeActuel === 'clair' ? '#888' : '#aaa'}
      keyboardType={keyboardType}
    />
  );

  // Rendu du composant Picker pour les attributs numériques (0-60) 
  const renduPicker = (value: number, setValeur: (valeur: number) => void) => (
    <Picker
      selectedValue={value}
      onValueChange={setValeur}
      style={{ color: couleurTexte, backgroundColor: couleurInput }}
    >
      {[...Array(61).keys()].map((val) => (
        <Picker.Item key={val} label={`${val}`} value={val} />
      ))}
    </Picker>
  );


// Affichage du formulaire de modification du personnage
  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: couleurFond }]}>
      <Text style={[styles.titre, { color: couleurTexte }]}>Modifier le personnage #{id}</Text>

      {renduLabel('Nom')}
      {renduInput(nouveauNomPersonnage, setNouveauNomPersonnage, 'Nom du personnage')}

     {renduLabel('Race')}
     {/* Utilisation du composant Dropdown pour la sélection de la race */}
      <Dropdown
        style={[styles.dropdown, { backgroundColor: couleurInput, borderColor: couleurBordure }]}
        containerStyle={{ backgroundColor: themeActuel === 'sombre' ? '#666' : '#eee' }}
        itemTextStyle={{ color: '#000' }}
        placeholderStyle={{ color: themeActuel === 'sombre' ? 'white' : '#999' }}
        selectedTextStyle={{ color: couleurTexte }}
        data={raceDropdownDonne}
        labelField="label"
        valueField="value"
        placeholder="-- Choisir une race --"
        value={nouveauRace_id}
        onChange={(item) => {
          setNouveauRace_id(item.value);
          setSelectionnerRaceValeur({ id: item.value, name: item.label });
        }}
      />

      {renduLabel('Classe')}
      {/* Utilisation du composant Dropdown pour la sélection de la classe */}
      <Dropdown
        style={[styles.dropdown, { backgroundColor: couleurInput, borderColor: couleurBordure }]}
        containerStyle={{ backgroundColor: themeActuel === 'sombre' ? '#666' : '#eee' }}
        itemTextStyle={{ color: '#000' }}
        placeholderStyle={{ color: themeActuel === 'sombre' ? 'white' : '#999' }}
        selectedTextStyle={{ color: couleurTexte }}
        data={classeDropdownDonne}
        labelField="label"
        valueField="value"
        placeholder="-- Choisir une classe --"
        value={nouveauClasse_id}
        onChange={(item) => {
          setNouveauClasse_id(item.value);
          setSelectionnerClasseValeur({ id: item.value, name: item.label });
        }}
      />


      {renduLabel('Niveau')}
      {renduInput(String(nouveauNiveau), (val) => setNouveauNiveau(Number(val)), 'Niveau', 'numeric')}

      {renduLabel('Âge')}
      {renduInput(String(nouveauAge), (val) => setNouveauAge(Number(val)), 'Âge', 'numeric')}

      {renduLabel('Sexe')}
      {renduInput(nouveauSexe, setNouveauSexe)}

      {renduLabel('Taille')}
      {renduInput(nouveauTaille, setNouveauTaille)}

      {renduLabel('Poids')}
      {renduInput(nouveauPoids, setNouveauPoids)}

      {renduLabel('Alignement')}
      {renduInput(nouveauAlignement, setNouveauAlignement)}

      {renduLabel("XP Objectif")}
      {renduInput(String(nouveauObjectifExp), (val) => setNouveauObjectifExp(Number(val)), '', 'numeric')}

      {renduLabel("XP Acquis")}
      {renduInput(String(nouveauAcquisExp), (val) => setNouveauAcquisExp(Number(val)), '', 'numeric')}

      {renduLabel("PV Max")}
      {renduInput(String(nouveauPvMax), (val) => setNouveauPvMax(Number(val)), '', 'numeric')}

      {renduLabel("PV Actuel")}
      {renduInput(String(nouveauPvActuel), (val) => setNouveauPvActuel(Number(val)), '', 'numeric')}

      {renduLabel("Force")}
      {renduPicker(nouveauForce, setNouveauForce)}

      {renduLabel("Bonus Force")}
      {renduPicker(nouveauBonusForce, setNouveauBonusForce)}

      {renduLabel("Dextérité")}
      {renduPicker(nouveauDexterite, setNouveauDexterite)}

      {renduLabel("Bonus Dextérité")}
      {renduPicker(nouveauBonusDexterite, setNouveauBonusDexterite)}

      {renduLabel("Constitution")}
      {renduPicker(nouveauConstitution, setNouveauConstitution)}

      {renduLabel("Bonus Constitution")}
      {renduPicker(nouveauBonusConstitution, setNouveauBonusConstitution)}

      {renduLabel("Intelligence")}
      {renduPicker(nouveauIntelligence, setNouveauIntelligence)}

      {renduLabel("Bonus Intelligence")}
      {renduPicker(nouveauBonusIntelligence, setNouveauBonusIntelligence)}

      {renduLabel("Sagesse")}
      {renduPicker(nouveauSagesse, setNouveauSagesse)}

      {renduLabel("Bonus Sagesse")}
      {renduPicker(nouveauBonusSagesse, setNouveauBonusSagesse)}

      {renduLabel("Charisme")}
      {renduPicker(nouveauCharisme, setNouveauCharisme)}

      {renduLabel("Bonus Charisme")}
      {renduPicker(nouveauBonusCharisme, setNouveauBonusCharisme)}

      {renduLabel("Vitesse")}
      {renduPicker(nouveauVitesse, setNouveauVitesse)}

      {renduLabel("Attaque")}
      {renduInput(nouveauAttaque, setNouveauAttaque)}

      {renduLabel("Défense")}
      {renduPicker(nouveauDefense, setNouveauDefense)}

      {renduLabel("Sort")}
      {renduInput(nouveauSort, setNouveauSort)}

      {renduLabel("Équipement")}
      {renduInput(nouveauEquipement, setNouveauEquipement)}

      {renduLabel("Apparence")}
      {renduInput(nouveauApparence, setNouveauApparence)}

      {renduLabel("Histoire")}
      {renduInput(nouveauHistoire, setNouveauHistoire)}

      {renduLabel("Alliés")}
      {renduInput(nouveauAlies, setNouveauAlies)}

      {renduLabel("Trésor")}
      {renduInput(nouveauTresor, setNouveauTresor)}

      {renduLabel("Notes")}
      {renduInput(nouveauNotes, setNouveauNotes)}

      {renduLabel("Notes de sort")}
      {renduInput(nouveauNotesSort, setNouveauNotesSort)}
     
      {/* Bouton pour modifier le personnage */}
      <TouchableOpacity
        style={[styles.bouton, { backgroundColor: themeActuel === 'clair' ? '#34C759' : '#228B22' }]}
        onPress={handleModifierPersonnage}
      >
        <Text style={[styles.boutonTexte, { color: themeActuel === 'clair' ? '#fff' : '#e0ffe0' }]}>Modifier le personnage</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

//styles pour le composant EcranModification
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  titre: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  bouton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  boutonTexte: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  selectionnerRace: {
    marginBottom: 10,
    fontStyle: 'italic',
  },
});

export default EcranModification;
