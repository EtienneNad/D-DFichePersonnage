import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {  DNDFicheContexteType} from '../modeles/ModeleFicheDND';

import { Picker } from '@react-native-picker/picker';

const EcranAjout = () => {
  const [newNomPersonnage, setNewNomPersonnage] = useState<string>('');
const [newClasse, setNewClasse] = useState<number>(0);
const [newRace, setNewRace] = useState<number>(0);
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

//   const [newVitesse, setNewVitesse] = useState<number>(30);
//   const {
//   newNomPersonnage, setNewNomPersonnage,
//   newClasse, setNewClasse,
//   newRace, setNewRace,
//   newNiveau, setNewNiveau,
//   newPvMax, setNewPvMax,
//   newPvActuel, setNewPvActuel,
//   newForce, setNewForce,
//   newBonusForce, setNewBonusForce,
//   newDexterite, setNewDexterite,
//   newBonusDexterite, setNewBonusDexterite,
//   newConstitution, setNewConstitution,
//   newBonusConstitution, setNewBonusConstitution,
//   newIntelligence, setNewIntelligence,
//   newBonusIntelligence, setNewBonusIntelligence,
//   newSagesse, setNewSagesse,
//   newBonusSagesse, setNewBonusSagesse,
//   newCharisme, setNewCharisme,
//   newBonusCharisme, setNewBonusCharisme,
//   newAge, setNewAge,
//   newSexe, setNewSexe,
//   newTaille, setNewTaille,
//   newPoids, setNewPoids,
//   newAlignement, setNewAlignement,
//   newPointExp, setNewPointExp,
//   newAttaque, setNewAttaque,
//   newDefense, setNewDefense,
//   newSort, setNewSort,
//   newEquipement, setNewEquipement,
//   newApparence, setNewApparence,
//   newHistoire, setNewHistoire,
//   newAlies, setNewAlies,
//   newTresor, setNewTresor,
//   newNotes, setNewNotes,
//   newNotesSort, setNewNotesSort,
//   addMesPersonnages,
// } = useContext(PersonnageContexte) as unknown as PersonnageContexteType;


  const ajouter = () => {
    if (!newNomPersonnage.trim()) {
      Alert.alert("Erreur", "Le nom du personnage est requis.");
      return;
    }

    

   
    Alert.alert("Succès", "Personnage ajouté !");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titre}>Créer un personnage</Text>

      <Text style={styles.label}>Nom</Text>
      <TextInput
        style={styles.input}
        value={newNomPersonnage}
        onChangeText={setNewNomPersonnage}
        placeholder="Nom du personnage"
      />

      <Text style={styles.label}>Classe ID</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(newClasse)}
        onChangeText={(val) => setNewClasse(Number(val))}
        placeholder="ID de la classe"
      />

      <Text style={styles.label}>Race ID</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(newRace)}
        onChangeText={(val) => setNewRace(Number(val))}
        placeholder="ID de la race"
      />

      <Text style={styles.label}>Niveau</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(newNiveau)}
        onChangeText={(val) => setNewNiveau(Number(val))}
      />

      <Text style={styles.label}>PV Max</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(newPvMax)}
        onChangeText={(val) => setNewPvMax(Number(val))}
      />

      <Text style={styles.label}>Force</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(newForce)}
        onChangeText={(val) => setNewForce(Number(val))}
      />
    <Text style={styles.label}>Âge</Text>
<TextInput
  style={styles.input}
  keyboardType="numeric"
  value={String(newAge)}
  onChangeText={(val) => setNewAge(Number(val))}
  placeholder="Âge"
/>

<Text style={styles.label}>Sexe</Text>
<TextInput
  style={styles.input}
  value={newSexe}
  onChangeText={setNewSexe}
  placeholder="Sexe"
/>

<Text style={styles.label}>Taille</Text>
<TextInput
  style={styles.input}
  value={newTaille}
  onChangeText={setNewTaille}
  placeholder="Taille"
/>

<Text style={styles.label}>Poids</Text>
<TextInput
  style={styles.input}
  value={newPoids}
  onChangeText={setNewPoids}
  placeholder="Poids"
/>

<Text style={styles.label}>Alignement</Text>
<TextInput
  style={styles.input}
  value={newAlignement}
  onChangeText={setNewAlignement}
  placeholder="Alignement"
/>

<Text style={styles.label}>Points d'expérience</Text>
<TextInput
  style={styles.input}
  keyboardType="numeric"
  value={String(newPointExp)}
  onChangeText={(val) => setNewPointExp(Number(val))}
/>

<Text style={styles.label}>PV Actuels</Text>
<TextInput
  style={styles.input}
  keyboardType="numeric"
  value={String(newPvActuel)}
  onChangeText={(val) => setNewPvActuel(Number(val))}
/>

<Text style={styles.label}>Bonus Force</Text>
<TextInput
  style={styles.input}
  keyboardType="numeric"
  value={String(newBonusForce)}
  onChangeText={(val) => setNewBonusForce(Number(val))}
/>

<Text style={styles.label}>Dextérité</Text>
<TextInput
  style={styles.input}
  onChangeText={(val) => setNewDexterite(Number(val))}
  value={String(newDexterite)}
  keyboardType="numeric"
  
/>

<Text style={styles.label}>Bonus Dextérité</Text>
<TextInput
  style={styles.input}
  keyboardType="numeric"
  value={String(newBonusDexterite)}
  onChangeText={(val) => setNewBonusDexterite(Number(val))}
/>

<Text style={styles.label}>Constitution</Text>
<TextInput
  style={styles.input}
  keyboardType="numeric"
  value={String(newConstitution)}
  onChangeText={(val) => setNewConstitution(Number(val))}
/>

<Text style={styles.label}>Bonus Constitution</Text>
<TextInput
  style={styles.input}
  keyboardType="numeric"
  value={String(newBonusConstitution)}
  onChangeText={(val) => setNewBonusConstitution(Number(val))}
/>

<Text style={styles.label}>Intelligence</Text>
<TextInput
  style={styles.input}
  keyboardType="numeric"
  value={String(newIntelligence)}
  onChangeText={(val) => setNewIntelligence(Number(val))}
/>

<Text style={styles.label}>Bonus Intelligence</Text>
<TextInput
  style={styles.input}
  keyboardType="numeric"
  value={String(newBonusIntelligence)}
  onChangeText={(val) => setNewBonusIntelligence(Number(val))}
/>

<Text style={styles.label}>Sagesse</Text>
<TextInput
  style={styles.input}
  keyboardType="numeric"
  value={String(newSagesse)}
  onChangeText={(val) => setNewSagesse(Number(val))}
/>

<Text style={styles.label}>Bonus Sagesse</Text>
<TextInput
  style={styles.input}
  keyboardType="numeric"
  value={String(newBonusSagesse)}
  onChangeText={(val) => setNewBonusSagesse(Number(val))}
/>

<Text style={styles.label}>Charisme</Text>
<TextInput
  style={styles.input}
  keyboardType="numeric"
  value={String(newCharisme)}
  onChangeText={(val) => setNewCharisme(Number(val))}
/>

<Text style={styles.label}>Bonus Charisme</Text>
<TextInput
  style={styles.input}
  keyboardType="numeric"
  value={String(newBonusCharisme)}
  onChangeText={(val) => setNewBonusCharisme(Number(val))}
/>

<Text style={styles.label}>Vitesse</Text>
<Picker
  selectedValue={newVitesse}
  onValueChange={(itemValue) => setNewVitesse(itemValue)}
 
>
  {[...Array(61).keys()].map((val) => (
    <Picker.Item key={val} label={`${val}`} value={val} />
  ))}
</Picker>

<Text style={styles.label}>Attaque</Text>
<TextInput
  style={styles.input}
  value={newAttaque}
  onChangeText={setNewAttaque}
/>

<Text style={styles.label}>Défense</Text>
<TextInput
  style={styles.input}
  keyboardType="numeric"
  value={String(newDefense)}
  onChangeText={(val) => setNewDefense(Number(val))}
/>

<Text style={styles.label}>Sort</Text>
<TextInput
  style={styles.input}
  value={newSort}
  onChangeText={setNewSort}
/>

<Text style={styles.label}>Équipement</Text>
<TextInput
  style={styles.input}
  value={newEquipement}
  onChangeText={setNewEquipement}
/>

<Text style={styles.label}>Apparence</Text>
<TextInput
  style={styles.input}
  value={newApparence}
  onChangeText={setNewApparence}
/>

<Text style={styles.label}>Histoire</Text>
<TextInput
  style={styles.input}
  value={newHistoire}
  onChangeText={setNewHistoire}
/>

<Text style={styles.label}>Alliés</Text>
<TextInput
  style={styles.input}
  value={newAlies}
  onChangeText={setNewAlies}
/>

<Text style={styles.label}>Trésor</Text>
<TextInput
  style={styles.input}
  value={newTresor}
  onChangeText={setNewTresor}
/>

<Text style={styles.label}>Notes</Text>
<TextInput
  style={styles.input}
  value={newNotes}
  onChangeText={setNewNotes}
/>

<Text style={styles.label}>Notes de sort</Text>
<TextInput
  style={styles.input}
  value={newNotesSort}
  onChangeText={setNewNotesSort}
/>

      <TouchableOpacity style={styles.bouton} onPress={ajouter}>
        <Text style={styles.boutonTexte}>Ajouter le personnage</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
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
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  bouton: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  boutonTexte: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EcranAjout;
