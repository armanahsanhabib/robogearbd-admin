import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AdminDashboard from "./pages/AdminDashboard";
import AllInvoices from "./pages/AllInvoices";
import CreateInvoice from "./pages/CreateInvoice";
import ProductsManagement from "./pages/ProductsManagement";
import StockIn from "./pages/StockIn";
import StockOut from "./pages/StockOut";

const App = () => {
  return (
    <Router>
      <div className="App grid grid-cols-6">
        <div className="sidebar col-span-1">
          <Sidebar />
        </div>
        <div className="main col-span-5">
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route
              path="/products-management"
              element={<ProductsManagement />}
            />
            <Route path="/create-invoice" element={<CreateInvoice />} />
            <Route path="/stock-in" element={<StockIn />} />
            <Route path="/stock-out" element={<StockOut />} />
            <Route path="/all-invoices" element={<AllInvoices />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
