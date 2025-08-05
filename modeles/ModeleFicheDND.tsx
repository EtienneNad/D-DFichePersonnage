// modeles/modeleFicheDND.tsx
// Interface pour la gestion des classes de personnages dans l'application D&D
export interface MesClasses {
    id: number | null;
    classe: string;
}
// Interface pour la gestion des races de personnages dans l'application D&D
export interface MesRaces {
    id: number | null;
    race: string;
}
// Interface pour la gestion des thèmes dans l'application D&D
export interface MesThemes {
    id: number | null;
    theme: string;
}
// Interface pour la gestion des personnages dans l'application D&D
export interface MesPersonnages {
    id: number | null;
    nomPersonnage: string;
    age: number;
    sexe: string;
    taille: string;
    poids: string;
    classe_id: number | null;
    race_id: number | null;
    niveau: number;
    alignement: string;
    pointExp: number;
    pvMax: number;
    pvActuel: number;
    force: number;
    bonusForce: number;
    dexterite: number;
    bonusDexterite: number;
    constitution: number;
    bonusConstitution: number;
    intelligence: number;
    bonusIntelligence: number;
    sagesse: number;
    bonusSagesse: number;
    charisme: number;
    bonusCharisme: number;
    vitesse: number;
    attaque: string;
    defense: number;
    sort: string;
    equipement: string;
    apparence: string;
    histoire: string;
    alies: string;
    tresor: string;
    notes: string;
    notesSort: string;
}

// Type pour le contexte des fiche de personnage D&D
export type DNDFicheContexteType = {

    // Contexte pour les thèmes
    themes: MesThemes[];
    setThemes: string;
    modifierTheme: (id: number | null, theme: string) => void;
    newTheme: string;
    setNewTheme: (newTheme: string) => void;
    loadTheme(): void;

    // Contexte pour les classes  
    classes: MesClasses[];
    setClasses: string;
    newClasse: string;
    selectedClasse: string;
    setSelectedClasse: (classe: string) => void;
    nomClasses: { [id: number]: string };
    setNomsClasses: (classes: { [id: number]: string }) => void;
    setNewClasse: (newClasse: string) => void;
    selectedClasseValeur: { id: number; name: string } | null;
    setSelectedClasseValeur: (classe: { id: number; name: string } | null) => void;
    loadClasse(): void;

    // Contexte pour les races
    nomRaces: { [id: number]: string };
    setNomsRaces: (races: { [id: number]: string }) => void;
    selectedRace: string;
    setSelectedRace: (race: string) => void;
    selectedRaceValeur: { id: number; name: string } | null;
    setSelectedRaceValeur: (race: { id: number; name: string } | null) => void;
    races: MesRaces[];
    setRaces: string;
    newRace: string;
    setNewRaces: (newRace: string) => void;
    loadRace(): void;

    // Contexte pour les personnages
    personnages: MesPersonnages[];
    setMesPersonnages: (personnages: MesPersonnages[]) => void;
    ajouterPersonnage: (personnages: MesPersonnages) => void;
    modifierPersonnage: (
        id: number | null,
        nomPersonnage: string,
        age: number,
        sexe: string,
        taille: string,
        poids: string,
        classe_id: number | null,
        race_id: number | null,
        niveau: number,
        alignement: string,
        pointExp: number,
        pvMax: number,
        pvActuel: number,
        force: number,
        bonusForce: number,
        dexterite: number,
        bonusDexterite: number,
        constitution: number,
        bonusConstitution: number,
        intelligence: number,
        bonusIntelligence: number,
        sagesse: number,
        bonusSagesse: number,
        charisme: number,
        bonusCharisme: number,
        vitesse: number,
        attaque: string,
        defense: number,
        sort: string,
        equipement: string,
        apparence: string,
        histoire: string,
        alies: string,
        tresor: string,
        notes: string,
        notesSort: string,
    ) => void;
    supprimerPersonnage: (id: number | null) => void;
    newNomPersonnage: string;
    setNewNomPersonnage: (newNomPersonnage: string) => void;
    newAge: number;
    setNewAge: (newAge: number) => void;
    newSexe: string;
    setNewSexe: (newSexe: string) => void;
    newTaille: string;
    setNewTaille: (newTaille: string) => void;
    newPoids: string;
    setNewPoids: (newPoids: string) => void;
    newClasse_id: number;
    setNewClasse_id: (newClasse_id: number) => void;
    newRace_id: number;
    setNewRace_id: (newRace_id: number) => void;
    newNiveau: number;
    setNewNiveau: (newNiveau: number) => void;
    newAlignement: string;
    setNewAlignement: (newAlignement: string) => void;
    newPointExp: number;
    setNewPointExp: (newPointExp: number) => void;
    newPvMax: number;
    setNewPvMax: (newPvMax: number) => void;
    newPvActuel: number;
    setNewPvActuel: (newPvActuel: number) => void;
    newForce: number;
    setNewForce: (newForce: number) => void;
    newBonusForce: number;
    setNewBonusForce: (newBonusForce: number) => void;
    newDexterite: number;
    setNewDexterite: (newDexterite: number) => void;
    newBonusDexterite: number;
    setNewBonusDexterite: (newBonusDexterite: number) => void;
    newConstitution: number;
    setNewConstitution: (newConstitution: number) => void;
    newBonusConstitution: number;
    setNewBonusConstitution: (newBonusConstitution: number) => void;
    newIntelligence: number;
    setNewIntelligence: (newIntelligence: number) => void;
    newBonusIntelligence: number;
    setNewBonusIntelligence: (newBonusIntelligence: number) => void;
    newSagesse: number;
    setNewSagesse: (newSagesse: number) => void;
    newBonusSagesse: number;
    setNewBonusSagesse: (newBonusSagesse: number) => void
    newCharisme: number;
    setNewCharisme: (newCharisme: number) => void;
    newBonusCharisme: number;
    setNewBonusCharisme: (newBonusCharisme: number) => void;
    newVitesse: number;
    setNewVitesse: (newVitesse: number) => void;
    newAttaque: string;
    setNewAttaque: (newAttaque: string) => void;
    newDefense: number;
    setNewDefense: (newDefense: number) => void;
    newSort: string;
    setNewSort: (newSort: string) => void;
    newEquipement: string;
    setNewEquipement: (newEquipement: string) => void;
    newApparence: string;
    setNewApparence: (newApparence: string) => void;
    newHistoire: string;
    setNewHistoire: (newHistoire: string) => void;
    newAlies: string;
    setNewAlies: (newAlies: string) => void;
    newTresor: string;
    setNewTresor: (newTresor: string) => void;
    newNotes: string;
    setNewNotes: (newNotes: string) => void;
    newNotesSort: string;
    setNewNotesSort: (newNotesSort: string) => void;
    loadPersonnage(): void;
}