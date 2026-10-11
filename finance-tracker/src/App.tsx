
import { useState } from 'react'
import './App.css'
import LineChartCard from './components/LineChartCard.tsx'
import BudgetCard from './components/BudgetCard.tsx'
import Sidebar from './Sidebar.tsx'
import RecentTransactionsCard from './components/RecentTransactionsCard.tsx'
import GoalsCard from  './components/GoalsCard.tsx'
import TransactionsPage, { initialTransactions } from './pages/TransactionsPage.tsx'







function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [transactions, setTransactions] = useState(initialTransactions)
  const [dashboardCategories, setDashboardCategories] = useState<string[]>([
    'shopping',
    'groceries',
    'eating out',
    'transportation',
  ])

  const handleToggleDashboardCategory = (category: string) => {
    setDashboardCategories(prev => {
      const isSelected = prev.includes(category)

      if (isSelected) {
        return prev.filter(item => item !== category)
      }

      if (prev.length >= 4) {
        return [...prev.slice(1), category]
      }

      return [...prev, category]
    })
  }

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
                <BudgetCard
                  transactions={transactions}
                  mode="dashboard"
                  selectedCategories={dashboardCategories}
                />
              </div>
              <div className= "card">
                <h2 className = "title"> Goals Progress </h2>
                <GoalsCard/>
              </div>
          </div>
        </div>
        )}
        {activePage === 'transactions' && (
          <TransactionsPage transactions={transactions} setTransactions={setTransactions} />
        )}
        {activePage === 'budget' && (
          <BudgetCard
            transactions={transactions}
            mode="budget"
            selectedCategories={dashboardCategories}
            onToggleCategory={handleToggleDashboardCategory}
          />
        )}
      </div>
    </div>
  
 
  )
}

export default App
