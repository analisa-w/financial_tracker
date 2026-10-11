import { useEffect, useMemo, useState } from 'react'
import type { Transaction } from './TransactionsComponents/TableLayout'

const categoryDefaults: Record<string, number> = {
  shopping: 500,
  'eating out': 250,
  clothes: 300,
  'craft supplies': 200,
  transportation: 180,
  misc: 220,
  food: 350,
  groceries: 400,
  'crafting!': 200,
  gift: 150,
}

const categoryOrder = [
  'shopping',
  'eating out',
  'clothes',
  'craft supplies',
  'transportation',
  'misc',
  'food',
  'groceries',
  'crafting!',
  'gift',
]

interface BudgetCardProps {
  transactions: Transaction[]
  mode?: 'dashboard' | 'budget'
  selectedCategories?: string[]
  onToggleCategory?: (category: string) => void
}

interface ProgressBarProps {
  type: string
  curVal: number
  maxVal: number
  editable?: boolean
}

function ProgressBar({ type, curVal, maxVal, editable = false }: ProgressBarProps) {
  const hasLimit = maxVal > 0
  const percentage = hasLimit ? Math.min((curVal / maxVal) * 100, 100) : 0
  const isOverBudget = curVal > maxVal
  const barColor = isOverBudget ? '#e74c3c' : 'var(--color-pink)'
  const remaining = maxVal - curVal

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', gap: '12px' }}>
        <span>{type}</span>
        <span style={{ color: isOverBudget ? '#b42318' : 'inherit', fontWeight: 600 }}>
          {editable
            ? `$${curVal.toFixed(2)}/$${maxVal.toFixed(2)}`
            : isOverBudget
              ? `Over by $${Math.abs(remaining).toFixed(2)}`
              : `$${curVal.toFixed(2)}/$${maxVal.toFixed(2)}`}
        </span>
      </div>
      <div
        style={{
          width: '100%',
          height: '12px',
          backgroundColor: 'lightgray',
          borderRadius: '6px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: barColor,
            borderRadius: '6px',
            transition: 'width 0.2s ease',
          }}
        />
      </div>
    </div>
  )
}

export default function BudgetCard({
  transactions,
  mode = 'budget',
  selectedCategories = [],
  onToggleCategory,
}: BudgetCardProps) {
  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {}

    transactions
      .filter(transaction => transaction.type === 'expense')
      .forEach(transaction => {
        totals[transaction.category] = (totals[transaction.category] ?? 0) + transaction.amount
      })

    return totals
  }, [transactions])

  const allCategories = Array.from(
    new Set([...categoryOrder, ...Object.keys(categoryTotals)])
  )

  const defaultDashboardCategories = ['shopping', 'groceries', 'eating out', 'transportation']
  const visibleCategories = mode === 'dashboard'
    ? (selectedCategories.length > 0 ? selectedCategories.slice(0, 4) : defaultDashboardCategories)
    : allCategories

  const [budgetLimits, setBudgetLimits] = useState<Record<string, number>>(() => {
    const initialLimits: Record<string, number> = {}
    for (const category of allCategories) {
      initialLimits[category] = categoryDefaults[category] ?? 0
    }
    return initialLimits
  })

  useEffect(() => {
    setBudgetLimits(prev => {
      const updatedLimits = { ...prev }

      for (const category of allCategories) {
        if (!(category in updatedLimits)) {
          updatedLimits[category] = categoryDefaults[category] ?? 0
        }
      }

      return updatedLimits
    })
  }, [allCategories])

  const handleBudgetChange = (category: string, value: string) => {
    const nextValue = Number(value)
    setBudgetLimits(prev => ({
      ...prev,
      [category]: Number.isFinite(nextValue) ? Math.max(nextValue, 0) : 0,
    }))
  }

  const progressBars = visibleCategories.map(category => {
    const currentValue = categoryTotals[category] ?? 0
    const maxValue = budgetLimits[category] ?? categoryDefaults[category] ?? 0

    return (
      <div key={category} style={{ marginBottom: '20px' }}>
        <ProgressBar
          type={category}
          curVal={currentValue}
          maxVal={maxValue}
          editable={mode === 'budget'}
        />

        {mode === 'budget' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <label style={{ fontSize: '12px', color: 'var(--color-navy)' }}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onToggleCategory?.(category)}
                style={{ marginRight: '8px' }}
              />
              Show on dashboard
            </label>

            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '12px',
                color: 'var(--color-navy)',
                gap: '8px',
              }}
            >
              Max budget
              <input
                type="number"
                min="0"
                step="10"
                value={maxValue}
                onChange={event => handleBudgetChange(category, event.target.value)}
                style={{
                  width: '100px',
                  padding: '4px 6px',
                  borderRadius: '6px',
                  border: '1px solid #d8d8d8',
                }}
              />
            </label>
          </div>
        )}
      </div>
    )
  })

  return <section>{progressBars}</section>
}