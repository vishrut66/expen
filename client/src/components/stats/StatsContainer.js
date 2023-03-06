import { useAppContext } from "../../context/appContext";
import StatItem from "./StatItem";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from "../../assets/wrappers/StatsContainer";

const StatsContainer = () => {
    const { stats } = useAppContext();

    const { income, expense } = stats;

    // console.log(stats);
    const defaultStats = [
        {
            title: "Total Transaction",
            total: income && expense ? income.count + expense.count : 0,
            incomeCount: income ? income.count : 0,
            expenseCount: expense ? expense.count : 0,
            color: "#e9b949",
            bcg: "#fcefc7",
        },
        {
            title: "Toneover",
            total: income && expense ? income.total + expense.total : 0,
            incomeCount: income ? income.total : 0,
            expenseCount: expense ? expense.total : 0,
            color: "#647acb",
            bcg: "#e0e8f9",
        },
    ];

    return (
        <Wrapper>
            {defaultStats.map((item, index) => {
                return <StatItem key={index} {...item} />;
            })}

        </Wrapper>
    );
};

export default StatsContainer;