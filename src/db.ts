import Dexie, { Table } from 'dexie';

export interface TrialResult {
  id?: number;
  user: string;
  date: string;
  result: any;
}

export class MediAIDB extends Dexie {
  trialResults!: Table<TrialResult, number>;
  constructor() {
    super('MediAIDB');
    this.version(1).stores({
      trialResults: '++id, user, date'
    });
  }
}

export const db = new MediAIDB();
