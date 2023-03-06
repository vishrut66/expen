
import React, { useState } from "react";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/ChartsContainer";
import PieChart from "./PieChart";
import Barchart from "./barchart";



export default function ChartsContainer() {
    const [barChart, setBarChart] = useState(true);
    //   const { monthlyApplications: data } = useAppContext();

    return (
        <Wrapper>
            <h4>Overview</h4>

            {/* <div className="chart">
                <PieChart />
            </div> */}
            <button type="button" onClick={() => setBarChart(!barChart)}>
                {barChart ? "Transaction" : "Toneover"}
            </button>
            <div className="chart">
                {barChart ? <Barchart /> : <PieChart />}
            </div>

        </Wrapper>
    );
}