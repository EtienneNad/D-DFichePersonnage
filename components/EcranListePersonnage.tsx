import React, { useContext } from 'react';
import {
  View,
  Text,
  Button,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FicheDNDContexte, RootStackParamList } from '../App';
import { DNDFicheContexteType } from '../modeles/ModeleFicheDND';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'ListePersonnage'>;

const EcranListePersonnage = ({ navigation }: Props) => {
  const { themes, personnages } = useContext(FicheDNDContexte) as DNDFicheContexteType;
  const themeActuel = themes[0]?.theme ?? 'clair';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeActuel === 'clair' ? '#fff' : '#111' }}>
      <ScrollView>
        <View style={styles.containerListe}>
          <Text style={[styles.titre, { color: themeActuel === 'clair' ? '#000' : '#fff' }]}>
            D&D - Personnages
          </Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            {personnages.map((perso, index) => (
              <View
                key={index}
                style={[
                  styles.boite,
                  { borderColor: themeActuel === 'clair' ? '#111' : '#fff' },
                ]}
              >
                <Text style={[styles.text, { color: themeActuel === 'clair' ? '#000' : '#fff' }]}>
                  {perso.nomPersonnage}
                </Text>
                <Text style={[styles.text, { color: themeActuel === 'clair' ? '#444' : '#ccc', fontSize: 12 }]}>
                  Niveau {perso.niveau}
                </Text>
                <Button
                  title="Mes infos"
                  onPress={() => navigation.navigate('InformationPersonnage')}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      
    </SafeAreaView>
  );
};

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
  containerBouttonNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
});

export default EcranListePersonnage;
