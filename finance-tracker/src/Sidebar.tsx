import { useState } from 'react';
import './Sidebar.css'

interface SidebarProps {
  onNavigate: (page: string) => void
}


export default function Sidebar({onNavigate} : SidebarProps) {
    const [open, setOpen] = useState(true);
    const Menus = [
    { title: 'Dashboard', page: 'dashboard'},
    { title: 'TransactionsPage', page: 'transactions'},
    { title: 'BudgetPage', page: 'budget'},
    ]
   

 return (
    
    <div className={`sidebar ${open ? "sidebar-open" : "sidebar-closed"}`} >

    <button onClick={() => setOpen(!open)}>
    {open ? "←" : "→"}
    </button>

    {Menus.map((item, index) => (
        <div key={index} 
            className="sidebar-item" 
            onClick={() => onNavigate(item.page)}
            >
            {open && item.title}
        </div>
      ))}
    </div>
  )
}


    


