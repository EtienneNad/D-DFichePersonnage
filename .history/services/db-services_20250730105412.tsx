// inspiré de https://blog.logrocket.com/using-sqlite-with-react-native/
import {enablePromise, openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';
import


const tablePersonnage = 'personnage';
const tableRace = 'race';
const tableClasse = "classe";
const tableTheme = 'theme';

enablePromise(true);

export const getDBConnection = async () => {
    return openDatabase({name: 'dnd-personnage-data.db', location: 'default'});
};

export const createTableClasse = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableClasse}
  (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ...
      );`;

  await db.executeSql(query);
};

export const createTableRace = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableRace}
  (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ...
      );`;

  await db.executeSql(query);
};
export const createTablePersonnage = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tablePersonnage}
  (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ...
      );`;

  await db.executeSql(query);
};
export const createTablePersonnage = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tablePersonnage}
  (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ...
      );`;

  await db.executeSql(query);
};
