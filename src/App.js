import logo from "./logo.svg";
import "./App.css";
import ListInvoices from "./components/ListInvoices.js";
function App() {
  return (
    <div className="App">
      <div className="InvoiceList">
        <ListInvoices />
      </div>
    </div>
  );
}

export default App;
