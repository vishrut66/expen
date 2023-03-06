import React from 'react'
// import DonutChart from 'react-donut-chart';
import { ChartDonut } from '@patternfly/react-charts';
import { useAppContext } from "../../context/appContext.js"

const PieChart = () => {

    const { stats } = useAppContext();
    const { income, expense } = stats;

    let incomeCount;
    let expenseCount;
    let total;

    if (income && expense) {
        incomeCount = income ? income.total : 0;
        expenseCount = expense ? expense.total : 0;
        total = income && expense ? income.total + expense.total : 0
    }


    return (
        <div style={{ height: '300px', width: '300px' }}>
            <ChartDonut
                ariaDesc="income vs expense"
                constrainToVisibleArea
                data={[{ x: 'Income', y: incomeCount }, { x: 'Expense', y: expenseCount }]}
                height={300}
                labels={({ datum }) => `${datum.x}: ${datum.y}`}
                name="chart5"
                subTitle="Toneover"
                title={total}
                colorScale={["#38812F", "#A30000"]}
                width={300}
            />
        </div>
    )
}

export default PieChart
