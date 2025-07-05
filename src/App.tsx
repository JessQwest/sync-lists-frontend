// App.tsx
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

export default function App() {
    console.log('Environment Variables:', process.env);

    return (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
  );
}
