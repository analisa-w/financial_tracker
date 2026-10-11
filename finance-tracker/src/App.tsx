
import { useState } from 'react'
import './App.css'
import LineChartCard from './components/LineChartCard.tsx'
import BudgetCard from './components/BudgetCard.tsx'
import Sidebar from './Sidebar.tsx'
import RecentTransactionsCard from './components/RecentTransactionsCard.tsx'
import GoalsCard from  './components/GoalsCard.tsx'
import TransactionsPage from './pages/TransactionsPage.tsx'







function App() {

  const [activePage, setActivePage] = useState('dashboard')

  return(
    <div className= "app-layout">  
      <Sidebar onNavigate={setActivePage}/>
      <div className = "main-content">
        <h1 className = "title"> Analisa's Financial Tracker!</h1>

        {activePage === 'dashboard' && (

        <div className="dashboard-container">
            <div className="dashboard-column left-column">
              <div className="card">
                <h2 className = "title"> Net Worth</h2>
                <LineChartCard/>
              </div>
              <div className="card">
                <h2 className = "title"> Recent Transactions</h2>
                <RecentTransactionsCard/>
              </div>

            </div>
            <div className="dashboard-column right-column">
              <div className="card">
                <h2 className = "title"> Budget Progress </h2>
                <BudgetCard/>
              </div>
              <div className= "card">
                <h2 className = "title"> Goals Progress </h2>
                <GoalsCard/>
              </div>
          </div>
        </div>
        )}
        {activePage === 'transactions' && <TransactionsPage/>}
        {activePage === 'budget' && <BudgetCard/>}
      </div>
    </div>
  
 
  )
}

export default App
