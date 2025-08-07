// components/EcranAccueil.tsx
import React, { useContext } from 'react';
import {View,Text,TouchableOpacity,StyleSheet,ScrollView} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, FicheDNDContexte } from '../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DNDFicheContexteType } from '../modeles/ModeleFicheDND';

// Type pour les propriétés du composant utilisé pour la navigation et les paramètres de route
type Props = NativeStackScreenProps<RootStackParamList, 'Accueil'>;

// Page permettant d'afficher l'écran d'accueil de l'application
const EcranAccueil = ({ navigation }: Props) => {
  // Constantes récupérees du contexte principal de l'application qui est dans App.tsx
  const { themes, modifierTheme, loadTheme } = useContext(FicheDNDContexte) as DNDFicheContexteType;
  
  // Récupération du thème actuel ou définition par défaut
  const themeActuel = themes[0]?.theme ?? 'clair';

  // Fonction pour changer le thème
  const ChangementTheme = () => {
    const nouveauTheme = themeActuel === 'clair' ? 'sombre' : 'clair';
    modifierTheme(1, nouveauTheme);
    loadTheme();
  };

  // Couleurs dynamiques selon le thème
  const couleurs = {
    background: themeActuel === 'clair' ? '#ffffff' : '#121212',
    texte: themeActuel === 'clair' ? '#000000' : '#ffffff',
    bouton: themeActuel === 'clair' ? '#34C759' : '#0800ffff',
    boutonSecondaire: themeActuel === 'clair' ? '#007AFF' : '#03da11ff',
  };

  return (
    // Affichage de l'écran d'accueil
    <SafeAreaView style={{ flex: 1, backgroundColor: couleurs.background }}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: couleurs.background },
        ]}
      >
        <Text style={[styles.titre, { color: couleurs.texte }]}>
          D&D fiche personnage
        </Text>
        <View style={{ height: 20 }} />
        <TouchableOpacity
          onPress={ChangementTheme}
          style={[styles.bouton, { backgroundColor: couleurs.boutonSecondaire }]}
        >
            {/* Affichage du texte du bouton selon le thème */}
          <Text style={styles.boutonTexte}>
            Thème: {themeActuel === 'sombre' ? 'clair' : 'sombre'}
          </Text>
        </TouchableOpacity>
        {/* Navigation vers la page de dés */}
        <TouchableOpacity
          style={[styles.bouton, { backgroundColor: couleurs.bouton }]}
          onPress={() => navigation.navigate('Des', { theme: themeActuel })}
        >
          <Text style={styles.boutonTexte}>🎲Dés</Text>
        </TouchableOpacity>
     
        {/* Navigation vers la page d'ajout de personnage */}
        <TouchableOpacity
          style={[styles.bouton, { backgroundColor: couleurs.bouton }]}
          onPress={() => navigation.navigate('Ajouter', { theme: themeActuel })}
        >
          <Text style={styles.boutonTexte}>➕Ajouter</Text>
        </TouchableOpacity>
           {/* Navigation vers la liste des personnages */}
        <TouchableOpacity
          style={[styles.bouton, { backgroundColor: couleurs.bouton }]}
          onPress={() => navigation.navigate('ListePersonnage', { theme: themeActuel })}
        >
          <Text style={styles.boutonTexte}>📜Liste des personnages</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
// Styles pour les composantes EcranAccueil
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 10,
    paddingTop: 20,
  },
  titre: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bouton: {
    padding: 20,
    borderRadius: 12,
    margin: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  boutonTexte: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EcranAccueil;
