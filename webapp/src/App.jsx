import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DatasetPage from './pages/DatasetPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/datasets/:datasetId/:tab?" element={<DatasetPage />} />
        <Route path="*" element={<Navigate to="/datasets/demo/administrative" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
