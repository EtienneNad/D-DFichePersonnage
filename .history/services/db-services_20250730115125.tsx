// inspiré de https://blog.logrocket.com/using-sqlite-with-react-native/
import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { MesClasses } from '../modeles/ModeleClasse';
import { MesRaces } from '../modeles/ModeleRace';
import { MesPersonnages } from '../modeles/ModelePersonnage'; 
import { MesThemes } from '../modeles/ModeleTheme';


const tablePersonnage = 'personnage';
const tableRace = 'race';
const tableClasse = "classe";
const tableTheme = 'theme';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'dnd-personnage-data.db', location: 'default' });
};

export const createTableClasse = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableClasse}(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  classe TEXT NOT NULL
   );`;

  await db.executeSql(query);
};

export const createTableRace = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query =
    `CREATE TABLE IF NOT EXISTS ${tableRace}( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    race TEXT NOT NULL
   ); `;
await db.executeSql(query);
};
export const createTablePersonnage = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tablePersonnage}
  (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nomPersonnage TEXT NOT NULL,
      age INTEGER NOT NULL,
      sexe TEXT NOT NULL,
      taille TEXT NOT NULL,
      poids TEXT NOT NULL,
      classe INTEGER NOT NULL,
      race INTEGER NOT NULL,
      theme INTEGER NOT NULL
      niveau INTEGER NOT NULL,
      alignement TEXT NOT NULL,
      pointExp INTEGER NOT NULL,
      pvMax INTEGER NOT NULL,
      pvActuel INTEGER NOT NULL,
      force INTEGER NOT NULL,
      bonusForce INTEGER NOT NULL,
      dexterite INTEGER NOT NULL,
      bonusDexterite INTEGER NOT NULL,
      constitution INTEGER NOT NULL,
      bonusConstitution INTEGER NOT NULL,
      intelligence INTEGER NOT NULL,
      bonusIntelligence INTEGER NOT NULL,
      sagesse INTEGER NOT NULL,
      bonusSagesse INTEGER NOT NULL,
      charisme INTEGER NOT NULL,
      bonusCharisme INTEGER NOT NULL
      vitesse TEXT NOT NULL,
      attaque TEXT NOT NULL,
      defense INTEGER NOT NULL,
      sort TEXT NOT NULL,
      équipement TEXT NOT NULL,
      apparence TEXT NOT NULL,
      histoire TEXT NOT NULL,
      Aliés TEXT NOT NULL,
      tresor TEXT NOT NULL,
      notes TEXT NOT NULL,
      notesSort TEXT NOT NULL
      );`;

  await db.executeSql(query);
};
export const createTableTheme = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableTheme}
  (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ...
      );`;

  await db.executeSql(query);
};
