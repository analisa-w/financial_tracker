


const barValues = [
    {type: "Shopping", maxVal: 5000, curVal: 3000},
    {type: "Groceries",maxVal: 3000, curVal: 700},
    {type: "Going Out",maxVal: 200, curVal: 30},
    {type: "Investing",maxVal: 300, curVal: 298},
    

]

interface ProgressBarProps {
  type: string
  curVal: number
  maxVal: number
}


function ProgressBar({type, curVal, maxVal}: ProgressBarProps) {
    const percentage = (curVal / maxVal) * 100

    return(
        <div style={{ marginBottom: '16px' }} >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span>{type}</span>
                <span>{curVal}/{maxVal}</span>
            </div>
            <div style={{
                width: '100%',
                height: '12px',
                backgroundColor: 'lightgray',
                borderRadius: '6px',
            }}>
                <div style={{
                    width: `${percentage}%`,
                    height: '100%',
                    backgroundColor: 'var(--color-pink)',
                    borderRadius: '6px',
                }}/>
            </div>
        </div>
    )
}

export default function BudgetCard(){
    const progressBars = barValues.map( (bar, index) => (
        <ProgressBar
            key = {index} 
            type = {bar.type}
            curVal = {bar.curVal}
            maxVal = {bar.maxVal}
            />
            
    ))
    
    return(
    <section>
        {progressBars}
    </section>  
    )
}