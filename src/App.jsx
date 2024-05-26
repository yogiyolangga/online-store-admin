import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontPage from "./component/mobile/FrontPage";
import LoginPage from "./component/mobile/LoginPage";
import CreateAdmin from "./component/mobile/CreateAdminPage";
import Dashboard from "./component/mobile/DashboardPage";
import Categories from "./component/mobile/CategoriesPage";
import BankPayment from "./component/mobile/BankPayment";
import PaymentConfirm from "./component/mobile/PaymentConfirm";
import Packaged from "./component/mobile/Packaged";
import Shipping from "./component/mobile/Shipping";
import Finished from "./component/mobile/Finished";
import OrderDetails from "./component/mobile/OrderDetails";
import Users from "./component/mobile/Users";
import Banner from "./component/mobile/Banner";

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
            <Route path="/payment" element={<PaymentConfirm />} />
            <Route path="/packaged" element={<Packaged />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/finished" element={<Finished />} />
            <Route path="/users" element={<Users />} />
            <Route path="/banner" element={<Banner />} />
            <Route
              path="/order/detail/:product/:orderitem/:order"
              element={<OrderDetails />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
