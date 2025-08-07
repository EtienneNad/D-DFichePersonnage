// components/EcranListePersonnage.tsx
import React, { useContext } from 'react';
import {View,Text,ScrollView, StyleSheet, TouchableOpacity,} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FicheDNDContexte, RootStackParamList } from '../App';
import { DNDFicheContexteType } from '../modeles/ModeleFicheDND';
import { SafeAreaView } from 'react-native-safe-area-context';
import { recupererClasseID, recupererDBConnection, recupererRaceID } from '../services/db-services';


// Type pour les propriétés du composant utilisé pour la navigation et les paramètres de route
type Props = NativeStackScreenProps<RootStackParamList, 'ListePersonnage'>;

//Page permettant de lister les personnages
const EcranListePersonnage = ({ navigation }: Props) => {
  const { themes, personnages } = useContext(FicheDNDContexte) as DNDFicheContexteType;
  const themeActuel = themes[0]?.theme ?? 'clair';
  const couleurTexte = themeActuel === 'clair' ? '#000' : '#fff';
  const couleurSousTexte = themeActuel === 'clair' ? '#444' : '#ccc';

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
  const changerPageInfo = (id: number | null, nomPersonnage: string, age: number, sexe: string, taille: string,
    poids: string, classe_id: number, race_id: number, niveau: number, alignement: string, pointExpAcquis: number,
    pointExpObjectif: number, pvMax: number, pvActuel: number, force: number, bonusForce: number, dexterite: number,
    bonusDexterite: number, constitution: number, bonusConstitution: number, intelligence: number, bonusIntelligence: number,
    sagesse: number, bonusSagesse: number, charisme: number, bonusCharisme: number, vitesse: number, attaque: string,
    defense: number, sort: string, equipement: string, apparence: string, histoire: string, alies: string,
    tresor: string, notes: string, notesSort: string) => {
      // Navigation vers l'écran d'information du personnage avec les paramètres nécessaires
    navigation.navigate('InformationPersonnage', {
      theme: themeActuel, id: id, nomPersonnage: nomPersonnage, age: age, sexe: sexe, taille: taille,
      poids: poids, classe_id: classe_id, race_id: race_id, niveau: niveau, alignement: alignement,
      pointExpAcquis: pointExpAcquis, pointExpObjectif: pointExpObjectif, pvMax: pvMax, pvActuel: pvActuel,
      force: force, bonusForce: bonusForce, dexterite: dexterite, bonusDexterite: bonusDexterite,
      constitution: constitution, bonusConstitution: bonusConstitution, intelligence: intelligence,
      bonusIntelligence: bonusIntelligence, sagesse: sagesse, bonusSagesse: bonusSagesse,
      charisme: charisme, bonusCharisme: bonusCharisme, vitesse: vitesse, attaque: attaque,
      defense: defense, sort: sort, equipement: equipement, apparence: apparence,
      histoire: histoire, alies: alies, tresor: tresor, notes: notes, notesSort: notesSort,
      
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeActuel === 'clair' ? '#fff' : '#111' }}>
      {/* Affichage du titre de la page */}
      <ScrollView contentContainerStyle={styles.containerListe}>
        <Text style={[styles.titre, { color: couleurTexte }]}>D&D - Personnages</Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {personnages.map((perso) => (
            <View key={perso.id}
              style={[ styles.boite, { borderColor: couleurTexte } ]}>
              
              <Text style={[styles.text, { color: couleurTexte }]}>
                {perso.nomPersonnage}
              </Text>

              <Text style={[styles.text, { color: couleurTexte }]}>
                {recupererClasse(perso.classe_id ?? 0)}
              </Text>

               <Text style={[styles.text, { color: couleurTexte }]}>
                {recupererRace(perso.race_id ?? 0)}
              </Text>
              <Text style={[styles.text, { color: couleurSousTexte, fontSize: 12 }]}>
                Niveau {perso.niveau}
              </Text>
              {/* Bouton pour afficher les informations du personnage sélectionné */}
              <TouchableOpacity style={[styles.bouton, { backgroundColor: '#007AFF', marginTop: 20 }]}
                        onPress={() => {
                          // Appel de la fonction pour changer la page d'information du personnage
                          changerPageInfo(perso.id, perso.nomPersonnage, perso.age, perso.sexe, perso.taille, perso.poids, 
                  perso.classe_id || 0, perso.race_id || 0, perso.niveau, perso.alignement, perso.pointExpAcquis, 
                  perso.pointExpObjectif, perso.pvMax, perso.pvActuel, perso.force, perso.bonusForce, 
                  perso.dexterite, perso.bonusDexterite, perso.constitution, perso.bonusConstitution, 
                  perso.intelligence, perso.bonusIntelligence, perso.sagesse, perso.bonusSagesse, 
                  perso.charisme, perso.bonusCharisme, perso.vitesse, perso.attaque, perso.defense, 
                  perso.sort, perso.equipement, perso.apparence, perso.histoire, 
                  perso.alies, perso.tresor, perso.notes, perso.notesSort)}} >
                        <Text >
                          Voir
                        </Text>
                      </TouchableOpacity>
                
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles pour le composant EcranListePersonnage
const styles = StyleSheet.create({
  containerListe: {
    padding: 16,
    paddingTop: 24,
  },
  titre: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
  },
  boite: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 12,
    margin: 10,
    minWidth: 140,
    maxWidth: 160,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  bouton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
  },
});

export default EcranListePersonnage;