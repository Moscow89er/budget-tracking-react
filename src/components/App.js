import Header from "./Header";
import DailyRecords from "./DailyRecords";
import Transactions from "./Transactions";
import Goals from "./Goals";
import IndexedDB from "./IndexedDB";

function App() {
  const db = new IndexedDB('BudgetTrackingDB');

  return (
    <div>
      <Header />
      <DailyRecords db={db} />
      <Goals db={db} />
      <Transactions db={db} />
    </div>
  );
}

export default App;
