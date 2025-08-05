import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, FicheDNDContexte } from '../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DNDFicheContexteType } from '../modeles/ModeleFicheDND';

type Props = NativeStackScreenProps<RootStackParamList, 'Accueil'>;

const EcranAccueil = ({ navigation }: Props) => {
  const {
    themes,
    modifierTheme,
    loadTheme,
  } = useContext(FicheDNDContexte) as DNDFicheContexteType;

  const themeActuel = themes[0]?.theme ?? 'clair';

  const toggleTheme = () => {
    const nouveauTheme = themeActuel === 'clair' ? 'sombre' : 'clair';
    modifierTheme(1, nouveauTheme);
    loadTheme();
  };

  // Couleurs dynamiques selon le thème
  const couleurs = {
    background: themeActuel === 'clair' ? '#ffffff' : '#121212',
    texte: themeActuel === 'clair' ? '#000000' : '#ffffff',
    bouton: themeActuel === 'clair' ? '#34C759' : '#BB86FC',
    boutonSecondaire: themeActuel === 'clair' ? '#007AFF' : '#03DAC5',
  };

  return (
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
          onPress={toggleTheme}
          style={[styles.bouton, { backgroundColor: couleurs.boutonSecondaire }]}
        >
          <Text style={styles.boutonTexte}>
            Passer en thème {themeActuel === 'clair' ? 'sombre' : 'clair'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bouton, { backgroundColor: couleurs.bouton }]}
          onPress={() => navigation.navigate('Des', { theme: themeActuel })}
        >
          <Text style={styles.boutonTexte}>Aller à la page Dés</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bouton, { backgroundColor: couleurs.bouton }]}
          onPress={() => navigation.navigate('InformationPersonnage')}
        >
          <Text style={styles.boutonTexte}>Aller à la page Information Personnage</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bouton, { backgroundColor: couleurs.bouton }]}
          onPress={() => navigation.navigate('Modifier')}
        >
          <Text style={styles.boutonTexte}>Aller à la page Modifier</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bouton, { backgroundColor: couleurs.bouton }]}
          onPress={() => navigation.navigate('Ajouter')}
        >
          <Text style={styles.boutonTexte}>Aller à la page Ajouter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bouton, { backgroundColor: couleurs.bouton }]}
          onPress={() => navigation.navigate('ListePersonnage', { theme: themeActuel })}
        >
          <Text style={styles.boutonTexte}>Aller à la page Liste Personnage</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

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
