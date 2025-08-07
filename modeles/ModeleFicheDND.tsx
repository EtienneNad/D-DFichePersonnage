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
    pointExpAcquis: number;
    pointExpObjectif: number;
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
    nouveauTheme: string;
    setNouveauTheme: (nouveauTheme: string) => void;
    loadTheme(): void;

    // Contexte pour les classes  
    classes: MesClasses[];
    setClasses: string;
    nouveauClasse: string;
    selectedClasse: string;
    setSelectedClasse: (classe: string) => void;
    nomClasses: { [id: number]: string };
    setNomsClasses: (classes: { [id: number]: string }) => void;
    setNouveauClasse: (nouveauClasse: string) => void;
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
    nouveauRace: string;
    setNouveauRaces: (nouveauRace: string) => void;
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
        pointExpAcquis: number,
        pointExpObjectif: number,
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
    nouveauNomPersonnage: string;
    setNouveauNomPersonnage: (nouveauNomPersonnage: string) => void;
    nouveauAge: number;
    setNouveauAge: (nouveauAge: number) => void;
    nouveauSexe: string;
    setNouveauSexe: (nouveauSexe: string) => void;
    nouveauTaille: string;
    setNouveauTaille: (nouveauTaille: string) => void;
    nouveauPoids: string;
    setNouveauPoids: (nouveauPoids: string) => void;
    nouveauClasse_id: number;
    setNouveauClasse_id: (nouveauClasse_id: number) => void;
    nouveauRace_id: number;
    setNouveauRace_id: (nouveauRace_id: number) => void;
    nouveauNiveau: number;
    setNouveauNiveau: (nouveauNiveau: number) => void;
    nouveauAlignement: string;
    setNouveauAlignement: (nouveauAlignement: string) => void;
    nouveauPointExperianceAcquis: number;
    setNouveauPointExperianceAcquis: (nouveauPointExperianceAcquis: number) => void;
    nouveauPointExpObjectif: number;
    setNouveauPointExpObjectif: (nouveauPointExpObjectif: number) => void;
    nouveauPvMax: number;
    setNouveauPvMax: (nouveauPvMax: number) => void;
    nouveauPvActuel: number;
    setNouveauPvActuel: (nouveauPvActuel: number) => void;
    nouveauForce: number;
    setNouveauForce: (nouveauForce: number) => void;
    nouveauBonusForce: number;
    setNouveauBonusForce: (nouveauBonusForce: number) => void;
    nouveauDexterite: number;
    setNouveauDexterite: (nouveauDexterite: number) => void;
    nouveauBonusDexterite: number;
    setNouveauBonusDexterite: (nouveauBonusDexterite: number) => void;
    nouveauConstitution: number;
    setNouveauConstitution: (nouveauConstitution: number) => void;
    nouveauBonusConstitution: number;
    setNouveauBonusConstitution: (nouveauBonusConstitution: number) => void;
    nouveauIntelligence: number;
    setNouveauIntelligence: (nouveauIntelligence: number) => void;
    nouveauBonusIntelligence: number;
    setNouveauBonusIntelligence: (nouveauBonusIntelligence: number) => void;
    nouveauSagesse: number;
    setNouveauSagesse: (nouveauSagesse: number) => void;
    nouveauBonusSagesse: number;
    setNouveauBonusSagesse: (nouveauBonusSagesse: number) => void
    nouveauCharisme: number;
    setNouveauCharisme: (nouveauCharisme: number) => void;
    nouveauBonusCharisme: number;
    setNouveauBonusCharisme: (nouveauBonusCharisme: number) => void;
    nouveauVitesse: number;
    setNouveauVitesse: (nouveauVitesse: number) => void;
    nouveauAttaque: string;
    setNouveauAttaque: (nouveauAttaque: string) => void;
    nouveauDefense: number;
    setNouveauDefense: (nouveauDefense: number) => void;
    nouveauSort: string;
    setNouveauSort: (nouveauSort: string) => void;
    nouveauEquipement: string;
    setNouveauEquipement: (nouveauEquipement: string) => void;
    nouveauApparence: string;
    setNouveauApparence: (nouveauApparence: string) => void;
    nouveauHistoire: string;
    setNouveauHistoire: (nouveauHistoire: string) => void;
    nouveauAlies: string;
    setNouveauAlies: (nouveauAlies: string) => void;
    nouveauTresor: string;
    setNouveauTresor: (nouveauTresor: string) => void;
    nouveauNotes: string;
    setNouveauNotes: (nouveauNotes: string) => void;
    nouveauNotesSort: string;
    setNouveauNotesSort: (nouveauNotesSort: string) => void;
    loadPersonnage(): void;
}