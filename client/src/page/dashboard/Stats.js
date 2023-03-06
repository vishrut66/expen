import { useEffect } from "react";
import { useAppContext } from "../../context/appContext.js";
// import { StatsContainer, Loading, ChartsContainer } from "../../components";
import { StatsContainer, Loading, ChartsContainer } from "../../components/index.js";

const Stats = () => {
    const { showStats, isLoading, monthlyApplications } = useAppContext();
    useEffect(() => {
        showStats();
    }, []);

    if (isLoading) {
        return <Loading center />;
    }

    return (
        <>
            <StatsContainer />
            <ChartsContainer />

            {/* {monthlyApplications.length > 0 && <ChartsContainer />} */}
        </>
    );
};

export default Stats;