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
    deleteMotsPasses: (id: number | null) => void;
    newTheme: string;
    setNewTheme: (newTheme: string) => void;
    newUrl: string;
    setNewUrl: (newUrl: string) => void;
    newNomApp: string;
    setNewNomApp: (newNomApp: string) => void;
    newNomUtilisateur: string;
    setNewNomUtilisateur: (newNomUtilisateur: string) => void;
    newAdresseCourriel: string;
    setNewAdresseCourriel: (newAdresseCourriel: string) => void;
    newMotsPasse: string;
    setNewMotsPasse: (newMotsPasse: string) => void;
    loadDataCallback(): void;
    loadTheme(): void;
};
