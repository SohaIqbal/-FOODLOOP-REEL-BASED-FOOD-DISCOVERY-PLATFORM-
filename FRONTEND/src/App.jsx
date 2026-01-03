import React from 'react';
import AppRoutes from './routes/routes.jsx';
import { ThemeProvider,} from './context/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;