import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontPage from "./component/mobile/FrontPage";
import LoginPage from "./component/mobile/LoginPage";
import CreateAdmin from "./component/mobile/CreateAdminPage";
import Dashboard from "./component/mobile/DashboardPage";
import Categories from "./component/mobile/CategoriesPage";
import BankPayment from "./component/mobile/BankPayment";

function App() {
  return (
    <>
      <Router>
        <div className="max-w-[360px] mx-auto">
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create" element={<CreateAdmin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/bank" element={<BankPayment />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
