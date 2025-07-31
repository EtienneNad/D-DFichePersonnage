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

// Méthode permettant d'obtenir une connexion à la base de données
export const getDBConnection = async () => {
  return openDatabase({ name: 'dnd-personnage-data.db', location: 'default' });
};

// Méthode permettant de créer la table des classes
export const createTableClasse = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableClasse}(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  classe TEXT NOT NULL
   );`;

  await db.executeSql(query);
};

// Méthode permettant de créer la table des classes
export const createTableRace = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query =
    `CREATE TABLE IF NOT EXISTS ${tableRace}( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    race TEXT NOT NULL
   ); `;
await db.executeSql(query);
};

// Méthode permettant de créer la table des personnages
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
      classe_id INTEGER NOT NULL,
      race_id INTEGER NOT NULL,
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
      equipement TEXT NOT NULL,
      apparence TEXT NOT NULL,
      histoire TEXT NOT NULL,
      alies TEXT NOT NULL,
      tresor TEXT NOT NULL,
      notes TEXT NOT NULL,
      notesSort TEXT NOT NULL,
      FOREIGN KEY(classe_id) REFERENCES ${tableClasse}(id),
      FOREIGN KEY(race_id) REFERENCES ${tableRace}(id)
      );`;

  await db.executeSql(query);
};

// Méthode permettant de créer la table des thèmes
export const createTableTheme = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableTheme}
  (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      theme TEXT NOT NULL
      );`;

  await db.executeSql(query);
};


// méthode permettant de récupérer les personnages
export const getPersonnages = async (db: SQLiteDatabase): Promise<MesPersonnages[]> => {
  try {
    const personnages: MesPersonnages[] = [];
    const query = `SELECT * FROM ${tablePersonnage};`;
    const result = await db.executeSql(query);
    for (let index = 0; index < result[0].rows.length; index++) {
      personnages.push(result[0].rows.item(index));
    }
    return personnages;
  } catch (error) {

    console.error(error);
    throw new Error("Erreur lors de la récupération des personnages");
  }
};

// Méthode permettant d'ajouter un nouveau personnage
export const ajouterPersonnage = async (db: SQLiteDatabase, mesPersonnages: MesPersonnages[]) => {
  await db.transaction(async personnage => {
    const insertQuery = `INSERT INTO ${tablePersonnage} 
    (nomPersonnage, age, sexe, taille, poids, classe_id, race_id, niveau, alignement, pointExp, pvMax, 
    pvActuel, force, bonusForce, dexterite, bonusDexterite, constitution, bonusConstitution, intelligence, 
    bonusIntelligence, sagesse, bonusSagesse, charisme, bonusCharisme, vitesse, attaque, defense, sort, 
    equipement, apparence, histoire, alies, tresor, notes, notesSort) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    for (const personnage of mesPersonnages) {
      await db.executeSql(insertQuery, [
        personnage.nomPersonnage, personnage.age, personnage.sexe, personnage.taille, personnage.poids,
        personnage.classe_id, personnage.race_id, personnage.niveau, personnage.alignement, personnage.pointExp,
        personnage.pvMax, personnage.pvActuel, personnage.force, personnage.bonusForce, personnage.dexterite,
        personnage.bonusDexterite, personnage.constitution, personnage.bonusConstitution, personnage.intelligence,
        personnage.bonusIntelligence, personnage.sagesse, personnage.bonusSagesse, personnage.charisme,
        personnage.bonusCharisme, personnage.vitesse, personnage.attaque, personnage.defense, personnage.sort,
        personnage.equipement, personnage.apparence, personnage.histoire,
        personnage.alies, personnage.tresor, personnage.notes, personnage.notesSort
      ]);
    }
  });
};
// Méthode permettant de modifier un personnage
export const modifierPersonnage = async (
  db: SQLiteDatabase,
  id: number | null, nomPersonnage: string, age: number, sexe: string, taille: string, poids: string,
  classe: number, race: number, niveau: number, alignement: string, pointExp: number, pvMax: number,
  pvActuel: number, force: number, bonusForce: number, dexterite: number, bonusDexterite: number,
  constitution: number, bonusConstitution: number, intelligence: number, bonusIntelligence: number,
  sagesse: number, bonusSagesse: number, charisme: number, bonusCharisme: number, vitesse: number,
  attaque: number, defense: number, sort: string, equipement: string, apparence: string, histoire: string,
  alies: string, tresor: string, notes: string, notesSort: string
) => {
  const updateQuery = `UPDATE ${tablePersonnage} SET
    nomPersonnage = ?,
    age = ?,
    sexe = ?,
    taille = ?,
    poids = ?,
    classe = ?,
    race = ?,
    niveau = ?,
    alignement = ?,
    pointExp = ?,
    pvMax = ?,
    pvActuel = ?,
    force = ?,
    bonusForce = ?,
    dexterite = ?,
    bonusDexterite = ?,
    constitution = ?,
    bonusConstitution = ?,
    intelligence = ?,
    bonusIntelligence = ?,
    sagesse = ?,
    bonusSagesse = ?,
    charisme = ?,
    bonusCharisme = ?,
    vitesse = ?,
    attaque = ?,
    defense = ?,
    sort = ?,
    equipement = ?,
    apparence = ?,
    histoire = ?,
    alies = ?,
    tresor = ?,
    notes = ?,
    notesSort = ?
  WHERE id = ?`;

  await db.executeSql(updateQuery, [
    nomPersonnage, age, sexe, taille, poids, classe, race, niveau, alignement, pointExp, pvMax,
    pvActuel, force, bonusForce, dexterite, bonusDexterite, constitution, bonusConstitution, intelligence,
    bonusIntelligence, sagesse, bonusSagesse, charisme, bonusCharisme, vitesse, attaque, defense, sort,
    equipement, apparence, histoire, alies, tresor, notes, notesSort, id
  ]);
};

// Méthode permettant de supprimer un personnage
export const supprimerPersonnage = async (db: SQLiteDatabase, id: number | null) => {
  const deleteQuery = `DELETE FROM ${tablePersonnage} WHERE id = ?`;
  await db.executeSql(deleteQuery, [id]);
};

// Méthode permettant de récupérer les races
export const getRaces = async (db: SQLiteDatabase): Promise<MesRaces[]> => {
  try {
    const races: MesRaces[] = [];
    const query = `SELECT * FROM ${tableRace};`;
    const result = await db.executeSql(query);
    for (let index = 0; index < result[0].rows.length; index++) {
      races.push(result[0].rows.item(index));
    }
    return races;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la récupération des races");
  }
};

// Méthode permettant d'ajouter une nouvelle race
export const ajouterRace = async (db: SQLiteDatabase, mesRaces: MesRaces[]) => {
  await db.transaction(async race => {
    const insertQuery = `INSERT INTO ${tableRace} (race) VALUES (?);`;
    for (const races of mesRaces) {
      await db.executeSql(insertQuery, [races.race]);
    }
  });
};

// Méthode permettant de récupérer les classes
export const getClasses = async (db: SQLiteDatabase): Promise<MesClasses[]> => {
  try {
    const classes: MesClasses[] = [];
    const query = `SELECT * FROM ${tableClasse};`;
    const result = await db.executeSql(query);
    for (let index = 0; index < result[0].rows.length; index++) {
      classes.push(result[0].rows.item(index));
    }
    return classes;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la récupération des classes");
  }
}

// Méthode permettant d'ajouter une nouvelle classe
export const ajouterClasse = async (db: SQLiteDatabase, mesClasse: MesClasses[]) => {
  await db.transaction(async classe => {
    const insertQuery = `INSERT INTO ${tableClasse} (classe) VALUES (?);`;
    for(const classes of mesClasse) {
    await db.executeSql(insertQuery, [classes.classe]);
    }
  });
};

// Méthode permettant de récupérer les thèmes
export const getTheme = async (db: SQLiteDatabase): Promise<MesThemes[]> => {
  try {
    const themes: MesThemes[] = [];
    const query = `SELECT * FROM ${tableTheme};`;
    const result = await db.executeSql(query);
    for (let index = 0; index < result[0].rows.length; index++) {
      themes.push(result[0].rows.item(index));
    }
    return themes;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la récupération des thèmes");
  }
};
// Méthode permettant d'ajouter un nouveau thème
export const ajouterTheme = async (
    db: SQLiteDatabase,
    mesTheme: MesThemes[],
) => {
  await db.transaction(async theme => {
    const insertQuery = `INSERT OR REPLACE INTO ${tableTheme}(theme) VALUES(?)`;
    for (const theme of mesTheme) {
      await db.executeSql(insertQuery, [
        theme.theme,
      ]);
    }
  });
};
// Méthode permettant de modifier un thème
export const modifierTheme = async (
    db: SQLiteDatabase,
    id: number | null,
    theme: string
) => {
    const updateQuery = `UPDATE ${tableTheme} SET theme = ? WHERE id = ?`;
  await db.executeSql(updateQuery, [
    theme,
    id,
  ]);
};
