// services/db-services.tsx
// inspiré de https://blog.logrocket.com/using-sqlite-with-react-native/
import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { MesThemes,MesClasses, MesRaces, MesPersonnages } from '../modeles/ModeleFicheDND';


const tablePersonnage = 'personnage';
const tableRace = 'race';
const tableClasse = "classe";
const tableTheme = 'theme';

enablePromise(true);

// Méthode permettant d'obtenir une connexion à la base de données
export const recupererDBConnection = async () => {
  return openDatabase({ name: 'dnd-personnage-data.db', location: 'default' });
};

// Méthode permettant de créer la table des classes
export const creationTableClasse = async (db: SQLiteDatabase) => {
  // crée la table si elle n'existe pas
  const query = `CREATE TABLE IF NOT EXISTS ${tableClasse}(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  classe TEXT NOT NULL
   );`;

  await db.executeSql(query);
};

// Méthode permettant de créer la table des classes
export const creationTableRace = async (db: SQLiteDatabase) => {
        // crée la table si elle n'existe pas
  const query =
    `CREATE TABLE IF NOT EXISTS ${tableRace}( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    race TEXT NOT NULL
   ); `;
await db.executeSql(query);
};

// Méthode permettant de créer la table des personnages
export const creationTablePersonnage = async (db: SQLiteDatabase) => {
  // crée la table si elle n'existe pas
  const query = `CREATE TABLE IF NOT EXISTS ${tablePersonnage}
  (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nomPersonnage TEXT NOT NULL,
      age INTEGER,
      sexe TEXT,
      taille TEXT,
      poids TEXT,
      classe_id INTEGER,
      race_id INTEGER,
      niveau INTEGER,
      alignement TEXT,
      pointExpAcquis INTEGER,
      pointExpObjectif INTEGER,
      pvMax INTEGER,
      pvActuel INTEGER,
      force INTEGER ,
      bonusForce INTEGER,
      dexterite INTEGER,
      bonusDexterite INTEGER,
      constitution INTEGER,
      bonusConstitution INTEGER,
      intelligence INTEGER,
      bonusIntelligence INTEGER,
      sagesse INTEGER,
      bonusSagesse INTEGER,
      charisme INTEGER,
      bonusCharisme INTEGER,
      vitesse INTEGER,
      attaque TEXT,
      defense INTEGER,
      sort TEXT,
      equipement TEXT,
      apparence TEXT,
      histoire TEXT,
      alies TEXT,
      tresor TEXT,
      notes TEXT,
      notesSort TEXT,
      FOREIGN KEY(classe_id) REFERENCES ${tableClasse}(id),
      FOREIGN KEY(race_id) REFERENCES ${tableRace}(id)
      );`;

  await db.executeSql(query);
};

// Méthode permettant de créer la table des thèmes
export const creationTableTheme = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableTheme}
  (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      theme TEXT NOT NULL
      );`;

  await db.executeSql(query);
};


// méthode permettant de récupérer les personnages
export const recupererPersonnages = async (db: SQLiteDatabase): Promise<MesPersonnages[]> => {
  try {
    // Récupération de tous les personnages
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
    // Insertion des personnages dans la base de données
    const insertQuery = `INSERT INTO ${tablePersonnage} 
    (nomPersonnage, age, sexe, taille, poids, classe_id, race_id, niveau, alignement, pointExpAcquis, pointExpObjectif, pvMax, 
    pvActuel, force, bonusForce, dexterite, bonusDexterite, constitution, bonusConstitution, intelligence, 
    bonusIntelligence, sagesse, bonusSagesse, charisme, bonusCharisme, vitesse, attaque, defense, sort, 
    equipement, apparence, histoire, alies, tresor, notes, notesSort) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    for (const personnage of mesPersonnages) {
      // Exécution de la requête d'insertion
      // Utilisation de la méthode executeSql pour insérer les données
      await db.executeSql(insertQuery, [
        personnage.nomPersonnage, personnage.age, personnage.sexe, personnage.taille, personnage.poids,
        personnage.classe_id, personnage.race_id, personnage.niveau, personnage.alignement, personnage.pointExpAcquis,
        personnage.pointExpObjectif, personnage.pvMax, personnage.pvActuel, personnage.force, personnage.bonusForce, personnage.dexterite,
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
  classe_id: number | null, race_id: number | null, niveau: number, alignement: string, pointExpAcquis: number, pointExpObjectif: number, pvMax: number,
  pvActuel: number, force: number, bonusForce: number, dexterite: number, bonusDexterite: number,
  constitution: number, bonusConstitution: number, intelligence: number, bonusIntelligence: number,
  sagesse: number, bonusSagesse: number, charisme: number, bonusCharisme: number, vitesse: number,
  attaque: string, defense: number, sort: string, equipement: string, apparence: string, histoire: string,
  alies: string, tresor: string, notes: string, notesSort: string
) => {
  // Requête SQL pour mettre à jour les informations du personnage
  const updateQuery = `UPDATE ${tablePersonnage} SET
    nomPersonnage = ?, age = ?, sexe = ?, taille = ?, poids = ?, classe_id = ?, race_id = ?, niveau = ?,
    alignement = ?, pointExpAcquis = ?, pointExpObjectif = ?, pvMax = ?, pvActuel = ?, force = ?, bonusForce = ?, dexterite = ?,
    bonusDexterite = ?, constitution = ?, bonusConstitution = ?, intelligence = ?, bonusIntelligence = ?,
    sagesse = ?, bonusSagesse = ?, charisme = ?, bonusCharisme = ?, vitesse = ?, attaque = ?, defense = ?,
    sort = ?, equipement = ?, apparence = ?, histoire = ?, alies = ?, tresor = ?, notes = ?, notesSort = ?
  WHERE id = ?`;
 // Exécution de la requête de mise à jour
  await db.executeSql(updateQuery, [
    nomPersonnage, age, sexe, taille, poids, classe_id, race_id, niveau, alignement, pointExpAcquis, pointExpObjectif, pvMax,
    pvActuel, force, bonusForce, dexterite, bonusDexterite, constitution, bonusConstitution, intelligence,
    bonusIntelligence, sagesse, bonusSagesse, charisme, bonusCharisme, vitesse, attaque, defense, sort,
    equipement, apparence, histoire, alies, tresor, notes, notesSort, id
  ]);
};

// Méthode permettant de supprimer un personnage
export const supprimerPersonnage = async (db: SQLiteDatabase, id: number | null) => {
  // Requête SQL pour supprimer un personnage par son ID
  const deleteQuery = `DELETE FROM ${tablePersonnage} WHERE id = ?`;
  await db.executeSql(deleteQuery, [id]);
};

// Méthode permettant de récupérer les races
export const recupererRaces = async (db: SQLiteDatabase): Promise<MesRaces[]> => {
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
// Méthode permettant de récupérer les race selon son id
export const recupererRaceID = async (db: SQLiteDatabase, id: number | null): Promise<MesRaces | null> => {
  try {
    const query = `SELECT race FROM ${tableRace} WHERE id = ?;`;
    const result = await db.executeSql(query, [id]);
    if (result[0].rows.length) {
      return result[0].rows.item(0);
    }
    return null;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la récupération de la race");
  }
};
    
// Méthode permettant d'ajouter une nouvelle race
export const ajouterRace = async (db: SQLiteDatabase, mesRaces: MesRaces[]) => {
  await db.transaction(async race => {
    // Insertion des races dans la base de données
    const insertQuery = `INSERT INTO ${tableRace} (race) VALUES (?);`;
    for (const races of mesRaces) {
      await db.executeSql(insertQuery, [races.race]);
    }
  });
};

// Méthode permettant de récupérer les classes
export const recupererClasses = async (db: SQLiteDatabase): Promise<MesClasses[]> => {
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
// Méthode permettant de récupérer une classe selon son id
export const recupererClasseID = async (db: SQLiteDatabase, id: number | null): Promise<MesClasses | null> => {
  try {
    const query = `SELECT classe FROM ${tableClasse} WHERE id = ?;`;
    const result = await db.executeSql(query, [id]);
    if (result[0].rows.length) {
      return result[0].rows.item(0);
    }
    return null;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la récupération de la classe");
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
export const recupererTheme = async (db: SQLiteDatabase): Promise<MesThemes[]> => {
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
  // Requête SQL pour mettre à jour le thème
    const updateQuery = `UPDATE ${tableTheme} SET theme = ? WHERE id = ?`;
  await db.executeSql(updateQuery, [
    theme,
    id,
  ]);
  
};
// Méthode permettant de supprimer les tables si elles existent
export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `DROP TABLE IF EXISTS ${tablePersonnage}, ${tableRace}, ${tableClasse}, ${tableTheme};`;

  return db.executeSql(query);
};