import Header from "./Header";
import DailyRecords from "./DailyRecords";
import Transactions from "./Transactions";
import Goals from "./Goals";
import IndexedDB from "./IndexedDB";
import ExchangeRate from "./ExchangeRate";
import Footer from "./Footer";

function App() {
  const db = new IndexedDB('BudgetTrackingDB');

  return (
    <div>
      <Header />
      <DailyRecords db={db} />
      <Goals db={db} />
      <Transactions db={db} />
      <ExchangeRate />
      <Footer />
    </div>
  );
}

export default App;
