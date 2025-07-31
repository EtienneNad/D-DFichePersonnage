export interface MesClasses {
  id: number | null;
  classe: string;
}

export type ClasseContexteType = {
  classes: MesClasses[];
  setClasses: string;
  newClasse: string;
  setNewClasse: (newClasse: string) => void;
  loadDataCallback(): void;
  loadRace(): void;
}