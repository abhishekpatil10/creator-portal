import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { CreatorList } from './pages/CreatorList';
import { CreatorDetails } from './pages/CreatorDetails';
import { AddCreator } from './pages/AddCreator';
import { EditCreator } from './pages/EditCreator';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CreatorList />} />
        <Route path="/creator/:id" element={<CreatorDetails />} />
        <Route path="/add" element={<AddCreator />} />
        <Route path="/edit/:id" element={<EditCreator />} />
      </Routes>
    </Router>
  );
}

export default App;
