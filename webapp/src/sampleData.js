export const sampleDataset = {
  title: 'Methods for risk assessment – Food/feed of plant origin',
  administrativeData: {
    description: 'Methods for risk assessment – Food/feed of plant origin'
  },
  keyValues: [
    {
      id: 'kv1',
      analyteGroup: 'parent',
      crops: ['apple', 'zucchini', 'tomato'],
      analytes: [
        { id: 'a1', analyte: 'parent', crop: 'apple', lod: 0.01, unit: 'mg/kg', comment: '' },
      ],
      methods: [
        { id: 'm1', type: 'GC', guideline: 'test guideline' },
      ],
      references: [
        { id: 'r1', type: 'validation', citation: 'REF-1' },
      ],
    },
    {
      id: 'kv2',
      analyteGroup: 'metabolite',
      crops: ['cucumber'],
      analytes: [
        { id: 'a2', analyte: 'metabolite1', crop: 'cucumber', lod: 0.05, unit: 'mg/kg', comment: '' },
      ],
      methods: [
        { id: 'm2', type: 'LC-MS', guideline: 'method guideline 2' },
      ],
      references: [
        { id: 'r2', type: 'study', citation: 'REF-2' },
      ],
    }
  ],
  systemInformation: {
    version: 1,
    created: '2024-01-01',
    createdBy: 'demo'
  }
};
