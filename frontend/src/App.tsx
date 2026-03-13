import { AuthProvider } from './contexts/AuthProvider';
import { AppRoutes } from './routes/AppRoutes';
import { GlobalStyle } from './styles/GlobalStyle';

function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;