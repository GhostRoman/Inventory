// Импорт необходимых компонентов и модулей из 'react-router-dom' и локальных файлов
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Navigation from './components/Navigation';
import TopMenu from './components/TopMenu';
import Orders from './pages/Orders';
import Products from './pages/Products';
import './index.css'

// Главный компонент приложения
function App() {
  return (
      <Router>
        <div className="flex min-h-screen">
          <Navigation />
          <div className="flex-1 flex flex-col">
            <TopMenu />
            <Routes>
              <Route path="/" element={<Navigate to="/orders" replace />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;
