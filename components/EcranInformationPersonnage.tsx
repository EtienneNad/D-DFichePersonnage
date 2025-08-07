// components/EcranInformationPersonnage.tsx
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FicheDNDContexte, RootStackParamList } from '../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DNDFicheContexteType } from '../modeles/ModeleFicheDND';
import { recupererClasseID, recupererDBConnection, recupererRaceID } from '../services/db-services';

// Type pour les propriétés du composant utilisé pour la navigation et les paramètres de route
type Props = NativeStackScreenProps<RootStackParamList, 'InformationPersonnage'>;

// Page permettant d'afficher les informations d'un personnage
const EcranInformationPersonnage = ({ route, navigation }: Props) => {
  // Récupération des paramètres de la route
  const { theme, id, nomPersonnage,
    age, sexe, taille, poids, classe_id, race_id, niveau, alignement, pointExpAcquis, pointExpObjectif, pvMax,
    pvActuel, force, bonusForce, dexterite, bonusDexterite, constitution, bonusConstitution, intelligence,
    bonusIntelligence, sagesse, bonusSagesse, charisme, bonusCharisme, vitesse, attaque, defense, sort,
    equipement, apparence, histoire, alies, tresor, notes, notesSort
  } = route.params;
  // constantes de la  page EcranInformationPersonnage
  const { supprimerPersonnage } = useContext(FicheDNDContexte) as DNDFicheContexteType;
  const [popupEstVisible, setPopupEstVisible] = useState(false);

  // Couleurs dynamiques selon le thème
  const couleurTexte = theme === 'clair' ? '#000' : '#fff';
  const fond = theme === 'clair' ? '#fff' : '#111';
  
  // Fonction pour récupérer le nom de la race à partir de son ID
  const recupererRace = async (id: number): Promise<string> => {
    const db = await recupererDBConnection();
    const race = await recupererRaceID(db, id);
    return race ? race.race : '';
  };
  // Fonction pour récupérer le nom de la classe à partir de son ID
  const recupererClasse = async (id: number): Promise<string> => {
    const db = await recupererDBConnection();
    const classe = await recupererClasseID(db, id);
    return classe ? classe.classe : '';
  };

  // Fonction pour changer la page d'information du personnage
  const handleDeletePress = () => {
    setPopupEstVisible(true);
  };
  // Fonction pour annuler la suppression du personnage
  const handleDeleteCancel = () => {
    setPopupEstVisible(false);
  };
  // Fonction pour confirmer la suppression du personnage
  const handleDeleteConfirm = () => {
    supprimerPersonnage(id);
    setPopupEstVisible(false);
    navigation.navigate('ListePersonnage', { theme: theme });
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: fond }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.titre, { color: couleurTexte }]}>
          {nomPersonnage}
        </Text>

        <Text style={[styles.sectionTitre, { color: couleurTexte }]}>Informations générales</Text>
        <Text style={[styles.info, { color: couleurTexte }]}>Âge : {age}</Text>
        <Text style={[styles.info, { color: couleurTexte }]}>Sexe : {sexe}</Text>
        <Text style={[styles.info, { color: couleurTexte }]}>Taille : {taille}</Text>
        <Text style={[styles.info, { color: couleurTexte }]}>Poids : {poids}</Text>
        <Text style={[styles.info, { color: couleurTexte }]}>Alignement : {alignement}</Text>

        <Text style={[styles.sectionTitre, { color: couleurTexte }]}>Statistiques</Text>
        <Text style={[styles.info, { color: couleurTexte }]}>Classe ID : {recupererClasse(classe_id)}</Text>
        <Text style={[styles.info, { color: couleurTexte }]}>Race ID : {recupererRace(race_id)}</Text>
        <Text style={[styles.info, { color: couleurTexte }]}>Points d'expérience acquis : {pointExpAcquis}/{pointExpObjectif}</Text>
        <Text style={[styles.info, { color: couleurTexte }]}>Niveau : {niveau}</Text>
        <Text style={[styles.info, { color: couleurTexte }]}>PV : {pvActuel} / {pvMax}</Text>
        <Text style={[styles.info, { color: couleurTexte }]}>Vitesse : {vitesse}</Text>

        <Text style={[styles.info, { color: couleurTexte }]}>Force : {force} (Bonus : {bonusForce})</Text>
        <Text style={[styles.info, { color: couleurTexte }]}>Dextérité : {dexterite} (Bonus : {bonusDexterite})</Text>
        <Text style={[styles.info, { color: couleurTexte }]}>Constitution : {constitution} (Bonus : {bonusConstitution})</Text>
        <Text style={[styles.info, { color: couleurTexte }]}>Intelligence : {intelligence} (Bonus : {bonusIntelligence})</Text>
        <Text style={[styles.info, { color: couleurTexte }]}>Sagesse : {sagesse} (Bonus : {bonusSagesse})</Text>
        <Text style={[styles.info, { color: couleurTexte }]}>Charisme : {charisme} (Bonus : {bonusCharisme})</Text>

        <Text style={[styles.sectionTitre, { color: couleurTexte }]}>Combat et magie</Text>
        <Text style={[styles.info, { color: couleurTexte }]}>Attaque : {attaque}</Text>
        <Text style={[styles.info, { color: couleurTexte }]}>Défense : {defense}</Text>
        <Text style={[styles.info, { color: couleurTexte }]}>Sorts : {sort}</Text>

        <Text style={[styles.sectionTitre, { color: couleurTexte }]}>Équipement & Histoire</Text>
        <Text style={[styles.info, { color: couleurTexte }]}>Équipement : {equipement}</Text>
        <Text style={[styles.info, { color: couleurTexte }]}>Apparence : {apparence}</Text>
        <Text style={[styles.info, { color: couleurTexte }]}>Histoire : {histoire}</Text>
        <Text style={[styles.info, { color: couleurTexte }]}>Alliés : {alies}</Text>
        <Text style={[styles.info, { color: couleurTexte }]}>Trésor : {tresor}</Text>
        <Text style={[styles.info, { color: couleurTexte }]}>Notes : {notes}</Text>
        <Text style={[styles.info, { color: couleurTexte }]}>Notes de sorts : {notesSort}</Text>

        <TouchableOpacity
          style={[styles.bouton, { backgroundColor: '#007AFF', marginTop: 30 }]}
          onPress={() => navigation.navigate('Modifier', {
            theme: theme, id: id, nomPersonnage: nomPersonnage, age: age,
            sexe: sexe, taille: taille, poids: poids, classe_id: classe_id, race_id: race_id, niveau: niveau,
            alignement: alignement, pointExpAcquis: pointExpAcquis, pointExpObjectif: pointExpObjectif, pvMax: pvMax,
            pvActuel: pvActuel, force: force, bonusForce: bonusForce, dexterite: dexterite, bonusDexterite: bonusDexterite,
            constitution: constitution, bonusConstitution: bonusConstitution, intelligence: intelligence, bonusIntelligence: bonusIntelligence,
            sagesse: sagesse, bonusSagesse: bonusSagesse, charisme: charisme, bonusCharisme: bonusCharisme, vitesse: vitesse, attaque: attaque,
            defense: defense, sort: sort, equipement: equipement, apparence: apparence, histoire: histoire, alies: alies, tresor: tresor,
            notes: notes, notesSort: notesSort
          })}
        >
          <Text style={styles.boutonTexte}>Aller à la page Modifier</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.bouton, { backgroundColor: '#FF3B30', marginTop: 20 }]}
          onPress={() => {
            handleDeletePress();
          }}>
          <Text >
            Supprimer
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={popupEstVisible}
          onRequestClose={handleDeleteCancel}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ backgroundColor: fond, padding: 20, borderRadius: 10, width: '80%' }}>
              <Text style={{ color: couleurTexte, fontSize: 16, marginBottom: 10, textAlign: 'center' }}>
                Êtes-vous sûr de vouloir supprimer ?
              </Text>
              <TouchableOpacity
                style={{ backgroundColor: '#FF3B30', padding: 10, borderRadius: 5, marginBottom: 10 }}
                onPress={handleDeleteConfirm}
              >
                <Text style={{ color: '#fff', textAlign: 'center' }}>Confirmer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ backgroundColor: '#ccc', padding: 10, borderRadius: 5 }}
                onPress={handleDeleteCancel}
              >
                <Text style={{ textAlign: 'center' }}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>

  );
};
// Styles pour le composant EcranInformationPersonnage
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  titre: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitre: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  bouton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  boutonTexte: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EcranInformationPersonnage;
