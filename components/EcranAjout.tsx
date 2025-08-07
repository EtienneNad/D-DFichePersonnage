// components/EcranAjout.tsx
import React, { useContext, useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Dropdown } from 'react-native-element-dropdown';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FicheDNDContexte, RootStackParamList } from '../App';
import { DNDFicheContexteType} from '../modeles/ModeleFicheDND';


// Type pour les propriétés du composant utilisé pour la navigation et les paramètres de route
type Props = NativeStackScreenProps<RootStackParamList, 'Ajouter'>;

//Page permettant d'ajouter un personnage
const EcranAjout = ({ route, navigation }: Props) => {
  
    // Récupération des paramètres de la route
  const { theme } = route.params;

  // Couleurs dynamiques selon le thème
  const themeActuel = theme ?? 'clair';
  const couleurTexte = themeActuel === 'clair' ? '#000' : '#fff';
  const couleurFond = themeActuel === 'clair' ? '#fff' : '#1c1c1c';
  const couleurInput = themeActuel === 'clair' ? '#f0f0f0' : '#333';
  const couleurBordure = themeActuel === 'clair' ? '#ccc' : '#666';


//
  const {
    nouveauNomPersonnage, setNouveauNomPersonnage,
    nouveauClasse_id, setNouveauClasse_id,
    nouveauRace_id, setNouveauRace_id,
    nouveauNiveau, setNouveauNiveau,
    nouveauPvMax, setNouveauPvMax,
    nouveauPvActuel, setNouveauPvActuel,
    nouveauForce, setNouveauForce,
    nouveauVitesse, setNouveauVitesse,
    nouveauBonusForce, setNouveauBonusForce,
    nouveauDexterite, setNouveauDexterite,
    nouveauBonusDexterite, setNouveauBonusDexterite,
    nouveauConstitution, setNouveauConstitution,
    nouveauBonusConstitution, setNouveauBonusConstitution,
    nouveauIntelligence, setNouveauIntelligence,
    nouveauBonusIntelligence, setNouveauBonusIntelligence,
    nouveauSagesse, setNouveauSagesse,
    nouveauBonusSagesse, setNouveauBonusSagesse,
    nouveauCharisme, setNouveauCharisme,
    nouveauBonusCharisme, setNouveauBonusCharisme,
    nouveauAge, setNouveauAge,
    nouveauSexe, setNouveauSexe,
    nouveauTaille, setNouveauTaille,
    nouveauPoids, setNouveauPoids,
    nouveauAlignement, setNouveauAlignement,
   nouveauPointExperianceAcquis, setNouveauPointExperianceAcquis,
    nouveauPointExpObjectif, setNouveauPointExpObjectif,
    nouveauAttaque, setNouveauAttaque,
    nouveauDefense, setNouveauDefense,
    nouveauSort, setNouveauSort,
    nouveauEquipement, setNouveauEquipement,
    nouveauApparence, setNouveauApparence,
    nouveauHistoire, setNouveauHistoire,
    nouveauAlies, setNouveauAlies,
    nouveauTresor, setNouveauTresor,
    nouveauNotes, setNouveauNotes,
    nouveauNotesSort, setNouveauNotesSort,
    ajouterPersonnage,
    loadRace,
    loadClasse,
    loadPersonnage
  } = useContext(FicheDNDContexte) as DNDFicheContexteType;

const { races: race, classes: classe } = useContext(FicheDNDContexte) as DNDFicheContexteType;


  

  useEffect(() => {
    const init = async () => {
      await loadRace();
      await loadClasse();
      
    };
    init();
  }, [loadRace, loadClasse]);

// États pour stocker les valeurs sélectionnées dans les dropdowns
  const [selectedRaceValeur, setSelectedRaceValeur] = useState<{ id: number, name: string } | null>(null);
  const [selectedClasseValeur, setSelectedClasseValeur] = useState<{ id: number, name: string } | null>(null);

  // Création des données pour les dropdowns
  const raceDropdownData = race.map((item) => ({ label: item.race, value: item.id }));
  const classeDropdownData = classe.map((item) => ({ label: item.classe, value: item.id }));

  // Fonction pour gérer l'ajout du personnage
  const handleAjouter = () => {
    const nouveauPersonnage = {
      id: 0,
      nomPersonnage: nouveauNomPersonnage,
      classe_id: nouveauClasse_id,
      race_id: nouveauRace_id,
      niveau: nouveauNiveau,
      pvMax: nouveauPvMax,
      pvActuel: nouveauPvActuel,
      force: nouveauForce,
      bonusForce: nouveauBonusForce,
      dexterite: nouveauDexterite,
      bonusDexterite: nouveauBonusDexterite,
      constitution: nouveauConstitution,
      bonusConstitution: nouveauBonusConstitution,
      intelligence: nouveauIntelligence,
      bonusIntelligence: nouveauBonusIntelligence,
      sagesse: nouveauSagesse,
      bonusSagesse: nouveauBonusSagesse,
      charisme: nouveauCharisme,
      bonusCharisme: nouveauBonusCharisme,
      age: nouveauAge,
      sexe: nouveauSexe,
      taille: nouveauTaille,
      poids: nouveauPoids,
      alignement: nouveauAlignement,
      pointExpAcquis: nouveauPointExperianceAcquis,
      pointExpObjectif: nouveauPointExpObjectif,
      attaque: nouveauAttaque,
      defense: nouveauDefense,
      sort: nouveauSort,
      equipement: nouveauEquipement,
      apparence: nouveauApparence,
      histoire: nouveauHistoire,
      alies: nouveauAlies,
      tresor: nouveauTresor,
      notes: nouveauNotes,
      notesSort: nouveauNotesSort,
      vitesse: nouveauVitesse,
    };
    loadPersonnage(); // Recharger les personnages après l'ajout
    ajouterPersonnage(nouveauPersonnage);
    Alert.alert("Succès", "Personnage ajouté !");
    navigation.goBack();
  };
    // Fonction pour rendre les labels
    const renderLabel = (label: string) => (
      <Text style={[styles.label, { color: couleurTexte }]}>{label}</Text>
    );
  
  // Rendu du composant TextInput pour les champs texte et numérique 
    const renderInput = (value: string, setValue: (v: string) => void, placeholder?: string, keyboardType: 'default' | 'numeric' = 'default') => (
      <TextInput
        style={[styles.input, { color: couleurTexte, backgroundColor: couleurInput, borderColor: couleurBordure }]}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={themeActuel === 'clair' ? '#888' : '#aaa'}
        keyboardType={keyboardType}
      />
    );
  
    // Rendu du composant Picker pour les attributs numériques (0-60) 
    const renderPicker = (value: number, setValue: (v: number) => void) => (
      <Picker
        selectedValue={value}
        onValueChange={setValue}
        style={{ color: couleurTexte, backgroundColor: couleurInput }}
      >
        {[...Array(61).keys()].map((val) => (
          <Picker.Item key={val} label={`${val}`} value={val} />
        ))}
      </Picker>
    );
  
// Retourne le formulaire d'ajout de personnage
  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: couleurFond }]}>
      <Text style={[styles.titre, { color: couleurTexte }]}>Créer un personnage</Text>

      {renderLabel('nom du personnage')}
      {renderInput(nouveauNomPersonnage, setNouveauNomPersonnage, 'Nom du personnage')}

      {/* Sélection de la race */}
      <Text style={[styles.label, { color: couleurTexte }]}>Race</Text>
      <Dropdown
        style={[styles.dropdown, { backgroundColor: couleurInput, borderColor: couleurBordure }]}
        containerStyle={{ backgroundColor: themeActuel === 'sombre' ? '#666' : '#eee' }}
        itemTextStyle={{ color: '#000' }}
        placeholderStyle={{ color: themeActuel === 'sombre' ? 'white' : '#999' }}
        selectedTextStyle={{ color: couleurTexte }}
        data={raceDropdownData}
        labelField="label"
        valueField="value"
        placeholder="-- Choisir une race --"
        value={nouveauRace_id}
        onChange={(item) => {
          setNouveauRace_id(item.value);
          setSelectedRaceValeur({ id: item.value, name: item.label });
        }}
      />

      {/* Sélection de la classe */}
      <Text style={[styles.label, { color: couleurTexte }]}>Classe</Text>
      <Dropdown
        style={[styles.dropdown, { backgroundColor: couleurInput, borderColor: couleurBordure }]}
        containerStyle={{ backgroundColor: themeActuel === 'sombre' ? '#666' : '#eee' }}
        itemTextStyle={{ color: '#000' }}
        placeholderStyle={{ color: themeActuel === 'sombre' ? 'white' : '#999' }}
        selectedTextStyle={{ color: couleurTexte }}
        data={classeDropdownData}
        labelField="label"
        valueField="value"
        placeholder="-- Choisir une classe --"
        value={nouveauClasse_id}
        onChange={(item) => {
          setNouveauClasse_id(item.value);
          setSelectedClasseValeur({ id: item.value, name: item.label });
        }}
      />

      {renderLabel('Niveau')}
            {renderInput(String(nouveauNiveau), (val) => setNouveauNiveau(Number(val)), 'Niveau', 'numeric')}
      
            {renderLabel('Âge')}
            {renderInput(String(nouveauAge), (val) => setNouveauAge(Number(val)), 'Âge', 'numeric')}
      
            {renderLabel('Sexe')}
            {renderInput(nouveauSexe, setNouveauSexe, 'Sexe')}
      
            {renderLabel('Taille')}
            {renderInput(nouveauTaille, setNouveauTaille, 'Taille')}

            {renderLabel('Poids')}
            {renderInput(nouveauPoids, setNouveauPoids, 'Poids')}

            {renderLabel('Alignement')}
            {renderInput(nouveauAlignement, setNouveauAlignement, 'Alignement')}
      
            {renderLabel("XP Objectif")}
            {renderInput(String(nouveauPointExpObjectif), (val) => setNouveauPointExpObjectif(Number(val)), '', 'numeric')}
      
            {renderLabel("XP Acquis")}
            {renderInput(String(nouveauPointExperianceAcquis), (val) => setNouveauPointExperianceAcquis(Number(val)), '', 'numeric')}
      
            {renderLabel("PV Max")}
            {renderInput(String(nouveauPvMax), (val) => setNouveauPvMax(Number(val)), '', 'numeric')}
      
            {renderLabel("PV Actuel")}
            {renderInput(String(nouveauPvActuel), (val) => setNouveauPvActuel(Number(val)), '', 'numeric')}
      
            {renderLabel("Force")}
            {renderPicker(nouveauForce, setNouveauForce)}
      
            {renderLabel("Bonus Force")}
            {renderPicker(nouveauBonusForce, setNouveauBonusForce)}
      
            {renderLabel("Dextérité")}
            {renderPicker(nouveauDexterite, setNouveauDexterite)}
      
            {renderLabel("Bonus Dextérité")}
            {renderPicker(nouveauBonusDexterite, setNouveauBonusDexterite)}
      
            {renderLabel("Constitution")}
            {renderPicker(nouveauConstitution, setNouveauConstitution)}
      
            {renderLabel("Bonus Constitution")}
            {renderPicker(nouveauBonusConstitution, setNouveauBonusConstitution)}
      
            {renderLabel("Intelligence")}
            {renderPicker(nouveauIntelligence, setNouveauIntelligence)}
      
            {renderLabel("Bonus Intelligence")}
            {renderPicker(nouveauBonusIntelligence, setNouveauBonusIntelligence)}
      
            {renderLabel("Sagesse")}
            {renderPicker(nouveauSagesse, setNouveauSagesse)}
      
            {renderLabel("Bonus Sagesse")}
            {renderPicker(nouveauBonusSagesse, setNouveauBonusSagesse)}
      
            {renderLabel("Charisme")}
            {renderPicker(nouveauCharisme, setNouveauCharisme)}
      
            {renderLabel("Bonus Charisme")}
            {renderPicker(nouveauBonusCharisme, setNouveauBonusCharisme)}
      
            {renderLabel("Vitesse")}
            {renderPicker(nouveauVitesse, setNouveauVitesse)}
      
            {renderLabel("Attaque")}
            {renderInput(nouveauAttaque, setNouveauAttaque, 'Attaque')}
      
            {renderLabel("Défense")}
            {renderPicker(nouveauDefense, setNouveauDefense)}
      
            {renderLabel("Sort")}
            {renderInput(nouveauSort, setNouveauSort, 'Sort')}
      
            {renderLabel("Équipement")}
            {renderInput(nouveauEquipement, setNouveauEquipement, 'Équipement')}
      
            {renderLabel("Apparence")}
            {renderInput(nouveauApparence, setNouveauApparence, 'Apparence')}
      
            {renderLabel("Histoire")}
            {renderInput(nouveauHistoire, setNouveauHistoire, 'Histoire')}
      
            {renderLabel("Alliés")}
            {renderInput(nouveauAlies, setNouveauAlies, 'Alliés' )}
      
            {renderLabel("Trésor")}
            {renderInput(nouveauTresor, setNouveauTresor, 'Trésor')}
      
            {renderLabel("Notes")}
            {renderInput(nouveauNotes, setNouveauNotes, 'Notes')}

            {renderLabel("Notes de sort")}
            {renderInput(nouveauNotesSort, setNouveauNotesSort, 'Notes de sort')}
            
          {/* Bouton pour ajouter le personnage */}
            <TouchableOpacity
        style={[styles.bouton, { backgroundColor: themeActuel === 'clair' ? '#34C759' : '#228B22' }]}
        onPress={handleAjouter}
      >
        <Text style={[styles.boutonTexte, { color: themeActuel === 'clair' ? '#fff' : '#e0ffe0' }]}>
          Ajouter le personnage
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Styles pour le composant EcranAjout
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
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
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
  selectedRace: {
    marginBottom: 10,
    fontStyle: 'italic',
  },
});

export default EcranAjout;
