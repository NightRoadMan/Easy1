import { useState } from 'react';

function ListEditor({ title, items, onChange, fields }) {
  const addItem = () => {
    const newItem = { id: Date.now().toString() };
    fields.forEach((f) => (newItem[f] = ''));
    onChange([...items, newItem]);
  };

  const updateItem = (id, field, value) => {
    onChange(items.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  };

  const removeItem = (id) => {
    onChange(items.filter((it) => it.id !== id));
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h4>{title}</h4>
      {items.map((it) => (
        <div key={it.id} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          {fields.map((f) => (
            <input
              key={f}
              value={it[f]}
              onChange={(e) => updateItem(it.id, f, e.target.value)}
              placeholder={f}
            />
          ))}
          <button onClick={() => removeItem(it.id)}>Delete</button>
        </div>
      ))}
      <button onClick={addItem}>Add {title}</button>
    </div>
  );
}

export default function KeyValueTab({ rows, onSave }) {
  const [editing, setEditing] = useState(null);

  const open = (row) => setEditing(JSON.parse(JSON.stringify(row)));
  const close = () => setEditing(null);
  const save = () => {
    onSave(editing);
    close();
  };

  return (
    <div style={{ position: 'relative' }}>
      <table border="1" cellPadding="4" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Analyte group</th>
            <th>Crops</th>
            <th>Methods</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} onClick={() => open(r)} style={{ cursor: 'pointer' }}>
              <td>{r.analyteGroup}</td>
              <td>{r.crops.join(', ')}</td>
              <td>{r.methods.map((m) => m.type).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '40%',
            height: '100%',
            background: '#fff',
            boxShadow: '-2px 0 5px rgba(0,0,0,0.3)',
            padding: 20,
            overflow: 'auto'
          }}
        >
          <h3>Edit {editing.analyteGroup}</h3>
          <div>
            <label>Analyte group: </label>
            <input
              value={editing.analyteGroup}
              onChange={(e) => setEditing({ ...editing, analyteGroup: e.target.value })}
            />
          </div>
          <div>
            <label>Crops (comma separated): </label>
            <input
              value={editing.crops.join(', ')}
              onChange={(e) => setEditing({ ...editing, crops: e.target.value.split(',').map((s) => s.trim()) })}
            />
          </div>

          <ListEditor
            title="Methods"
            items={editing.methods}
            onChange={(val) => setEditing({ ...editing, methods: val })}
            fields={['type', 'guideline']}
          />
          <ListEditor
            title="Analytes"
            items={editing.analytes}
            onChange={(val) => setEditing({ ...editing, analytes: val })}
            fields={['analyte', 'crop', 'lod', 'unit', 'comment']}
          />
          <ListEditor
            title="References"
            items={editing.references}
            onChange={(val) => setEditing({ ...editing, references: val })}
            fields={['type', 'citation']}
          />

          <button onClick={save}>Save</button>
          <button onClick={close} style={{ marginLeft: 8 }}>Cancel</button>
        </div>
      )}
    </div>
  );
}
