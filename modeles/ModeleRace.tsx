export interface MesRaces {
  id: number | null;
  race: string;
}

export type RaceContexteType = {
  races: MesRaces[];
  setRaces: string;
  newRace: string;
  setNewRace: (newRace: string) => void;
  loadDataCallback(): void;
  loadRace(): void;
}