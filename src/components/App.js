import Header from "./Header";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DailyRecords from "./DailyRecords";
import Transactions from "./Transactions";
import Goals from "./Goals";
import IndexedDB from "./IndexedDB";
import ExchangeRate from "./ExchangeRate";
import Footer from "./Footer";

function App() {
  const rubToUsd = 92.38; //курс рубля к доллару на 24.06.2023
  const rubToGel = 35.00; //курс рубля к лари на 24.06.2023

  const db = new IndexedDB('BudgetTrackingDB');

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<DailyRecords db={db} />} />
          <Route path='/goals' element={<Goals db={db} />} />
          <Route path='/transactions' element={
            <>
              <ExchangeRate rubToUsd={rubToUsd} rubToGel={rubToGel} />
              <Transactions db={db} rubToUsd={rubToUsd} rubToGel={rubToGel} />
            </>
            } 
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
