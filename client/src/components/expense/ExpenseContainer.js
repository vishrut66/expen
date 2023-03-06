import { useAppContext } from "../../context/appContext";
import { useEffect } from "react";
import Loading from "../Loading";
import Exp from "./exp";
import PageBtnContainer from "./PageBtnContainer";
import Wrapper from "../../assets/wrappers/JobsContainer";


const ExpenseContainer = () => {


    const { getExpense, expense, isLoading, page, totalExpense, search, amounts, type, numOfPages } = useAppContext();

    useEffect(() => {
        getExpense();

        // eslint-disable-next-line
    }, [page, search, amounts, type,]);

    if (isLoading) {
        return <Loading center />;
    }

    if (expense.length === 0) {
        return (
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        );
    }

    return (

        <Wrapper>
            <h5>
                {totalExpense} {expense.length > 1 ? "entries" : "entry"} found
            </h5>
            <div className="jobs">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Category</th>
                            <th scope="col">Type</th>
                            <th scope="col">Refrence</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                </table>
                {expense.map((exp) => {
                    return <Exp key={exp._id} {...exp} />;
                })}
                {numOfPages > 1 && <PageBtnContainer />}
            </div>

        </Wrapper>
    );
};
export default ExpenseContainer;