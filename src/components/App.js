import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from "./Header";
import DailyRecords from "./DailyRecords";
import Transactions from "./Transactions";
import Goals from "./Goals";
import IndexedDB from "./IndexedDB";
import ExchangeRate from "./ExchangeRate";
import Footer from "./Footer";
import SuccessPopup from "./SuccessPopup";

function App() {
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

  const rubToUsd = 92.38; //курс рубля к доллару на 24.06.2023
  const rubToGel = 35.00; //курс рубля к лари на 24.06.2023

  const db = new IndexedDB('BudgetTrackingDB');

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<DailyRecords db={db} setIsSuccessPopupOpen={setIsSuccessPopupOpen} />} />
          <Route path='/goals' element={<Goals db={db} setIsSuccessPopupOpen={setIsSuccessPopupOpen} />} />
          <Route path='/transactions' element={
            <>
              <ExchangeRate rubToUsd={rubToUsd} rubToGel={rubToGel} />
              <Transactions db={db} rubToUsd={rubToUsd} rubToGel={rubToGel} setIsSuccessPopupOpen={setIsSuccessPopupOpen} />
            </>
            } 
          />
        </Routes>
        <SuccessPopup isOpen={isSuccessPopupOpen} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
