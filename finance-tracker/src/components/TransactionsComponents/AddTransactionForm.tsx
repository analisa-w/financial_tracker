import './AddTransactionForm.css'
import React, { useEffect, useState } from 'react';

const categories = [
    {type : 'shopping'},
    {type : 'eating out'},
    {type : 'clothes'},
    {type : 'craft supplies'},
    {type : 'transportation'},
    {type : 'misc'},
    {type : 'food'},
    {type : 'groceries'},
    {type : 'crafting!'},
    {type : 'gift'},
]

const cards = [
    {type : 'AMEX'},
    {type : 'Chase'},
    {type : 'Visa'},
    {type : 'BoA'},
    {type : 'Debit'},
]

export interface TransactionData {
  date: string;
  card: string;
  category: string;
  title: string;
  notes: string;
  amount: number;
  type: 'income' | 'expense';
}

interface AddTransactionFormProps {
  onClose: () => void;
  onSubmit: (data:TransactionData) => void;
  initialData?: TransactionData | null;
  isEditing?: boolean;
}

export default function AddTransactionForm({ onClose, onSubmit, initialData, isEditing = false }: AddTransactionFormProps) {
    
    
    const [date, setDate] = useState(initialData?.date ?? '');
    const [type, setType] = useState<'income' | 'expense'>(initialData?.type ?? 'expense');
    const [category, setCategory] = useState(
      initialData && categories.some(({ type: option }) => option === initialData.category)
        ? initialData.category
        : categories[0].type
    );
    const [title, setTitle] = useState(initialData?.title ?? '');
    const [notes, setNotes] = useState(initialData?.notes ?? '');
    const [amount, setAmount] = useState(initialData ? String(initialData.amount) : '');
    const [card, setCard] = useState(
      initialData && cards.some(({ type: option }) => option === initialData.card)
        ? initialData.card
        : cards[0].type
    );

    useEffect(() => {
      setDate(initialData?.date ?? '');
      setType(initialData?.type ?? 'expense');
      setCategory(
        initialData && categories.some(({ type: option }) => option === initialData.category)
          ? initialData.category
          : categories[0].type
      );
      setTitle(initialData?.title ?? '');
      setNotes(initialData?.notes ?? '');
      setAmount(initialData ? String(initialData.amount) : '');
      setCard(
        initialData && cards.some(({ type: option }) => option === initialData.card)
          ? initialData.card
          : cards[0].type
      );
    }, [initialData]);

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevents page reload

        const formData: TransactionData = {
            date,
            type,
            title,
            category,
            notes,
            amount: Number(amount),
            card,
        };


        onSubmit(formData);
    };


    return(
       
            
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    }}>
        <div style={{
            background: 'white',
            padding: '32px',
            borderRadius: '12px',
            width: '400px',
        }} className="transaction-form-container" >
            <form onSubmit={handleSubmit} className="transaction-form">
                <h2 className = 'title'>{isEditing ? 'Edit Transaction' : 'Add Transaction'}</h2>

                <div className="form-field">
                    <label>date</label>
                    <input 
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required 
                    />
                </div> 
                
                <div className="form-field">
                    <p>
                        <label>type: </label><br></br>
                        <label>
                        <input 
                            type="radio" 
                            name="transactionType"
                            value="expense"
                            checked={type === 'expense'}
                            onChange={() => setType('expense')}
                        />
                        expense
                        </label>
                        <br></br>
                        <label>
                        <input 
                            type="radio" name="transactionType"
                            value="income"
                            checked={type === 'income'}
                            onChange={() => setType('income')}
                        />
                        income
                        </label>
                    </p>
                    </div>
          
                <div className="form-field">
                    <label>category</label>
                    <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map( (category) =>
                            <option key={category.type} value={category.type}>{category.type}</option>
                        )}
                    </select>
                </div>
               

                <div className="form-field">
                    <label> short title</label>
                    <input 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                </div>
             
                

                <div className="form-field">
                    <label>notes</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                

                <div className="form-field">
                    <label>amount</label>
                    <input 
                        type="number" 
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
            
                <div className="form-field">
                    <label>card</label>
                    <select value={card}
                        onChange={(e) => setCard(e.target.value)}
                    >
                        {cards.map( (card) =>
                            <option key={card.type} value={card.type}>{card.type}</option>
                        )}

                    </select>
                </div>
                
                <div className = "button-row">
                    <button className = 'cancel-button' type = 'button' onClick={onClose}>Cancel</button> 
                    <button className = 'submit-button' type = 'submit'>Submit</button>
                </div>
            </form>
        </div>
    </div>
   
  )
}