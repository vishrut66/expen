import Wrapper from "../../assets/wrappers/StatItem";



function StatItem({ incomeCount, expenseCount, total, color, bcg, title, }) {
    return (
        <>


            <Wrapper color={color} bcg={bcg}>
                <header>
                    <span className="count"></span>
                    <div className="icon">{title}: {total}</div>
                </header>
                <h5 className="title">{incomeCount} Income</h5>
                <h5 className="title">{expenseCount} expense</h5>
            </Wrapper>

        </>
    );
}

export default StatItem;