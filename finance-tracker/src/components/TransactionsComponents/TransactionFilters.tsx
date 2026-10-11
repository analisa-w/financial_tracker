 import "./TransactionFilters.css"
 

interface TransactionFiltersProps {
  category: string;
  setCategory: (value: string) => void;
  month: string;
  setMonth: (value: string) => void;
  card: string;
  setCard: (value: string) => void;
  typeexpense: string;
  setType: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  sortDirection: string;
  setSortDirection: (value: string) => void;
  onClear: () => void;
}
 
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

const months = [
    {type : 'jan'},
    {type : 'feb'},
    {type : 'mar'},
    {type : 'apr'},
    {type : 'may'},
    {type : 'jun'},
    {type : 'jul'},
    {type : 'aug'},
    {type : 'sept'},
    {type : 'oct'},
    {type : 'nov'},
    {type : 'dec'},
]

const cards = [
    {type : 'AMEX'},
    {type : 'Chase'},
    {type : 'Visa'},
    {type : 'BoA'},
    {type : 'Debit'},
]

const types = [
    {type: 'income'},
    {type: 'expense'}
]

export default function TransactionFilters({
  category, setCategory,
  month, setMonth,
  card, setCard,
  typeexpense, setType,
  sortBy, setSortBy,
  sortDirection, setSortDirection,
  onClear
}: TransactionFiltersProps) {
    
    

    return(
        <div className="filters-row">
            <div className="filter-group">
                <label>&nbsp;</label>  {/* empty label for alignment */}
                <button>All</button>
            </div>


            <div className="filter-group">
                <label>type</label>
                    <select 
                        value={typeexpense}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="">-- Any --</option>
                        {types.map( (typeexpense) =>
                            <option key={typeexpense.type} value={typeexpense.type}>{typeexpense.type}</option>
                        )}
                    </select>
            </div>
            
            <div className="filter-group">
                <label>category</label>
                    <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">-- Any --</option>
                        {categories.map( (category) =>
                            <option key={category.type} value={category.type}>{category.type}</option>
                        )}
                    </select>
            </div>

            <div className="filter-group">
                <label>month</label>
                    <select 
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                    >
                        {months.map( (month) =>
                            <option key={month.type} value={month.type}>{month.type}</option>
                        )}
                    </select>
            </div>

            <div className="filter-group">
                <label>sort options</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="">-- sort by --</option>
                    <option value="date">date</option>
                    <option value="amount">amount</option>
                </select>
            </div>
        
            
                {sortBy !== ''&& (
                    <div className="filter-group">
                <select value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
                    <option value="asc">ascending</option>
                    <option value="desc">descending</option>
                </select>
                </div>
                )}
            

            <div className="filter-group">
                <label>card</label>
                        <select value={card}
                            onChange={(e) => setCard(e.target.value)}
                        >
                            <option value="">-- Any --</option>
                            {cards.map( (card) =>
                                <option key={card.type} value={card.type}>{card.type}</option>
                            )}

                        </select>
            </div>


            <button>Apply</button>
            <button onClick={onClear}>Clear</button>
        </div>
    )

}