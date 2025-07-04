import { Route, Routes } from 'react-router-dom';
import ListOverview from './pages/ListOverview';
import ListDetail from './pages/ListDetail';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ListOverview />} />
            <Route path="/list/:id" element={<ListDetail />} />
        </Routes>
    );
}
