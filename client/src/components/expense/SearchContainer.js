import { FormRow, FormRowSelect } from "../index";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/SearchContainer";
const SearchContainer = () => {
    const {
        isLoading,
        search,
        amounts,
        type,
        typeOptions,
        handleChange,
        clearFilters,
    } = useAppContext();

    const handleSearch = (e) => {
        if (isLoading) return;
        handleChange({ name: e.target.name, value: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        clearFilters();
    };

    return (
        <Wrapper>
            <form className="form">
                <h4>search form</h4>
                {/* search position */}
                <div className="form-center">
                    <FormRow
                        type="text"
                        name="search"
                        value={search}
                        handleChange={handleSearch}
                    ></FormRow>
                    <FormRowSelect
                        labelText="Expense type"
                        name="type"
                        value={type}
                        handleChange={handleSearch}
                        list={["all", ...typeOptions]}
                    ></FormRowSelect>
                    <button
                        className="btn btn-block btn-danger"
                        disabled={isLoading}
                        onClick={handleSubmit}
                    >
                        clear filters
                    </button>
                </div>
            </form>
        </Wrapper>
    );
};

export default SearchContainer;