import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { sampleDataset } from '../sampleData';
import AdminTab from './tabs/AdminTab';
import KeyValueTab from './tabs/KeyValueTab';
import SystemTab from './tabs/SystemTab';

const TABS = [
  { id: 'administrative', label: 'Administrative Data' },
  { id: 'key-values', label: 'Key value for chemical safety assessment' },
  { id: 'system', label: 'System Information' }
];

export default function DatasetPage() {
  const { datasetId, tab } = useParams();
  const navigate = useNavigate();
  const currentTab = tab || 'administrative';
  const [dataset, setDataset] = useState(null);

  useEffect(() => {
    const ref = doc(db, 'datasets', datasetId);
    getDoc(ref)
      .then((snap) => {
        if (snap.exists()) {
          setDataset(snap.data());
        } else {
          setDataset(sampleDataset);
        }
      })
      .catch(() => setDataset(sampleDataset));
  }, [datasetId]);

  const updateKeyValue = async (updatedRow) => {
    const keyValues = dataset.keyValues.map((kv) =>
      kv.id === updatedRow.id ? updatedRow : kv
    );
    setDataset((prev) => ({ ...prev, keyValues }));
    try {
      const ref = doc(db, 'datasets', datasetId);
      await updateDoc(ref, { keyValues });
    } catch (e) {
      console.error(e);
    }
  };

  if (!dataset) return <div>Loading...</div>;

  return (
    <div>
      <h1>{dataset.title}</h1>
      <nav>
        {TABS.map((t) => (
          <Link
            key={t.id}
            to={`/datasets/${datasetId}/${t.id}`}
            style={{ marginRight: 16, textDecoration: currentTab === t.id ? 'underline' : 'none' }}
          >
            {t.label}
          </Link>
        ))}
      </nav>
      <div style={{ marginTop: 20 }}>
        {currentTab === 'administrative' && (
          <AdminTab data={dataset.administrativeData} />
        )}
        {currentTab === 'key-values' && (
          <KeyValueTab rows={dataset.keyValues} onSave={updateKeyValue} />
        )}
        {currentTab === 'system' && (
          <SystemTab data={dataset.systemInformation} />
        )}
      </div>
    </div>
  );
}
