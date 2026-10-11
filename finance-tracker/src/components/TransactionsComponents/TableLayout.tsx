/* transactions are going to look like this 
{
  id: number,
  date: string,
  card: 'AMEX'| 'Chase' | 'BoA' | 'Debit' ,
  category: 'food' | 'groceries' | 'transportation' | 'clothes' | 'crafting!' |'gift' ,
  notes: string,
  amount: number,
  type: 'income' | 'expense'
}
*/
import './TableLayout.css'
import { Pencil, Trash2 } from 'lucide-react'
import {type TransactionData,}from './AddTransactionForm';


export interface Transaction extends TransactionData {
  id: number;
}

interface TableLayoutProps {
  transactions: Transaction[];
}


export default function TableLayout({transactions,} : TableLayoutProps) {
  return( 
    <table className = 'table-layout striped-table'>
      <thead className = 'table-head'>
        <tr>
          <th>s.no</th>
          <th>date</th>
          <th>type of transaction</th>
          <th>category</th>
          <th>notes</th>
          <th>amount</th>
          <th>card</th>
          <th>edit/delete</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map( (transaction, key) => (
                    <tr key={key}>
                        <td>{transaction.id}</td>
                        <td>{transaction.date}</td>
                        <td><b>{transaction.type}</b></td>
                        <td><b>{transaction.category}</b></td>
                        <td>{transaction.notes}</td>
                        <td style={{color: transaction.type === 'income' ? 'var(--color-income)' : 'var(--color-expense)'} }>
                            <b>{transaction.type === 'income' ? '+' : '-'}
                            ${transaction.amount} </b></td>
                        <td>{transaction.card}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button title = 'Edit' className = 'edit-btn' > 
                              <Pencil size={16} color = 'var(--color-navy)'/>
                            </button>
            
                            <button title = 'Delete' className = 'delete-btn' > 
                              <Trash2 size={16} color = 'var(--color-darkpink)'/>
                            </button>
                          </div>
                        </td>
                    </tr>

                ))}

      </tbody>
    </table>

  );

}

