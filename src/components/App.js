import Header from "./Header";
import DailyRecords from "./DailyRecords";
import Transactions from "./Transactions";
import Goals from "./Goals";
import IndexedDB from "./IndexedDB";
import ExchangeRate from "./ExchangeRate";

function App() {
  const db = new IndexedDB('BudgetTrackingDB');

  return (
    <div>
      <Header />
      <ExchangeRate />
      <DailyRecords db={db} />
      <Goals db={db} />
      <Transactions db={db} />
    </div>
  );
}

export default App;
