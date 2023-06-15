import Header from "./Header";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import DailyRecords from "./DailyRecords";
import Transactions from "./Transactions";
import Goals from "./Goals";
import IndexedDB from "./IndexedDB";
import ExchangeRate from "./ExchangeRate";
import Footer from "./Footer";

function App() {
  const db = new IndexedDB('BudgetTrackingDB');

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<DailyRecords db={db} />} />
          <Route path='/goals' element={<Goals db={db} />} />
          <Route path='/transactions' element={
            <>
              <Transactions db={db} />
              <ExchangeRate />
            </>
            } 
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
