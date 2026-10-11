
const transactions= [
    {type: 'expense', title : 'Uber', category : 'transportation', amount: 200},
    {type: 'income', title : 'Nana gift!', category : 'gift', amount: 300},
    {type: 'expense', title : 'Uber', category : 'transportation', amount: 200},
    {type: 'expense', title : 'Uber', category : 'transportation', amount: 200},
    {type: 'expense', title : 'Uber', category : 'transportation', amount: 200}
];




export default function RecentTransactionsCard() {
    // there will be income and expenses 
    return(
        <table className = 'transactions-card'>
            <thead>
                <tr> 
                    <th>title</th>
                    <th>category</th>
                    <th>amount</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map( (transaction, key) =>
                    <tr key={key}>
                        <td>{transaction.title}</td>
                        <td>{transaction.category}</td>
                        <td style={{color: transaction.type === 'income' ? 'var(--color-income)' : 'var(--color-expense)'} }>
                            {transaction.type === 'income' ? '+' : '-'}
                            ${transaction.amount}</td>
                    </tr>

                )}
                
            </tbody>

        </table>

    )
}