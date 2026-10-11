import TableLayout from './../components/TransactionsComponents/TableLayout'
import AddTransactionForm, {type TransactionData, } from './../components/TransactionsComponents/AddTransactionForm'
import { useState } from 'react'
import type { Transaction } from './../components/TransactionsComponents/TableLayout'
import './TransactionsPage.css'
import TransactionFilters from './../components/TransactionsComponents/TransactionFilters'

/* transactions are going to look like this 
{
  id: number,
  date: string,
  card: 'AMEX'| 'Chase' | 'BoA' | 'Debit' ,
  category: 'food' | 'groceries' | 'transportation' | 'clothes' | 'crafting!',
  notes: string,
  amount: number,
  type: 'income' | 'expense'
}
*/


const initialTransactions: Transaction[] = [
  {
    id: 1,
    date: '8-10-2026',
    card: 'AMEX',
    category: 'clothes',
    title: 'pants',
    notes: 'got new pants',
    amount: 200,
    type: 'expense'
  },
  {
    id: 2,
    date: '8-11-2026',
    card: 'Chase',
    category: 'food',
    title: 'pants',
    notes: 'yummy fun dinner with friends',
    amount: 80,
    type: 'expense'
  },
  {
    id: 3,
    date: '8-12-2026',
    card: 'AMEX',
    category: 'groceries',
    title: 'pants',
    notes: 'self explainatory really',
    amount: 95,
    type: 'expense'
  },
  {
    id: 4,
    date: '8-12-2026',
    card: 'BoA',
    category: 'transportation',
    title: 'pants',
    notes: 'cheapest uber in the world, impossible',
    amount: 3.75,
    type: 'expense'
  },
  {
    id: 5,
    date: '8-13-2026',
    card: 'Debit',
    category: 'clothes',
    title: 'pants',
    notes: 'undies :P',
    amount: 12.99,
    type: 'expense'
  },
  {
    id: 6,
    date: '8-14-2026',
    card: 'BoA',
    category: 'crafting!',
    title: 'pants',
    notes: 'u know i gotta get that new thread',
    amount: 21.32,
    type: 'expense'
  },
  {
    id: 7,
    date: '8-14-2026',
    card: 'Chase',
    category: 'gift',
    title: 'pants',
    notes: 'love nana!!',
    amount: 105,
    type: 'income'
  }
]

export default function TransactionsPage(){
  const [showForm, setShowForm] = useState(false)

  const [category, setCategory] = useState('');
  const [month, setMonth] = useState('');
  const [card, setCard] = useState('');
  const [typeexpense, setType] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions)

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  const handleAddTransaction = (data: TransactionData) => {

    const newTransaction: Transaction = {
      id: transactions.length + 1,
      ...data
    }

    setTransactions(prevTransactions => [
      ...prevTransactions,
      newTransaction
    ])

    setShowForm(false)
  }

  const filteredTransactions = transactions
  .filter(t => typeexpense === '' || t.type === typeexpense)
  .filter(t => category === '' || t.category === category)
  .filter(t => card === '' || t.card === card)
  .filter(t => month === '' || t.date.toLowerCase().includes(month.toLowerCase()))
  .sort((a, b) => {
    if (sortBy === '') return 0
    if (sortBy === 'amount') {
      return sortDirection === 'asc' ? a.amount - b.amount : b.amount - a.amount
    }
    if (sortBy === 'date') {
      return sortDirection === 'asc'
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date)
    }
    return 0
  })

  const handleClear = () => {
  setType('')
  setCategory('')
  setCard('')
  setMonth('')
  setSortBy('')
  setSortDirection('asc')
}


  return(
    <div>
      <button onClick={toggleForm} 
        className = "open-button"
      >
        Open
      </button>
      {showForm && (
        <AddTransactionForm 
          onSubmit={handleAddTransaction}  
          onClose={() => setShowForm(false)}  /> )}

      <TransactionFilters
        category={category} setCategory={setCategory}
        month={month} setMonth={setMonth}
        card={card} setCard={setCard}
        typeexpense={typeexpense} setType={setType}
        sortBy={sortBy} setSortBy={setSortBy}
        sortDirection={sortDirection} setSortDirection={setSortDirection}
        onClear={handleClear}
      />

      <TableLayout transactions={filteredTransactions} />


      

      
    </div>
  )
}