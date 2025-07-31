export interface MesPersonnages {
    id: number | null;
    nomPersonnage: string;
    age: number;
    sexe: string;
    taille: string;
    poids: string;
    classe: number;
    race: number;
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
    équipement: string;
    apparence: string;
    histoire: string;
    Aliés: string;
    tresor: string;
    notes: string;
    notesSort: string;
}

export type PersonnageContexteType = {
    personnages: MesPersonnages[];
    setMesPersonnages: (personnages: MesPersonnages[]) => void;
    addMesPersonnages: (personnages: MesPersonnages) => void;
    modifierPersonnages: (
        id: number | null,
        url: string,
        nomApp: string,
        nomUtilisateur: string,
        adresseCourriel: string,
        motsPasse: string,
    ) => void;
    deletePersonnages: (id: number | null) => void;
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
    newClasse: number;
    setNewClasse: (newClasse: number) => void;
    newRace: number;
    setNewRace: (newRace: number) => void;  
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
    newVitesse: string;
    setNewVitesse: (newVitesse: string) => void;
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
    loadDataCallback(): void;
    loadPersonnages(): void;
};
