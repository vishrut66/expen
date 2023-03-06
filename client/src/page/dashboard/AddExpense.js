import React from 'react'
import { FormRow, Alert, FormRowSelect } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddExpense = () => {
    const {
        isEditing,
        showAlert,
        displayAlert,
        typeOptions,
        typeOp,
        catagoryType,
        amount,
        refrence,
        date,
        description,
        handleChange,
        clearValues,
        createExpense,
        editExp

    } = useAppContext();



    const handleSubmit = (e) => {
        e.preventDefault();

        if (!catagoryType || !typeOp || !amount) {
            displayAlert();
            return;
        }
        if (isEditing) {
            editExp()
            return;
        }
        createExpense();

    };

    const handleAddInput = (e) => {
        handleChange({ name: e.target.name, value: e.target.value });
    };

    return (
        <Wrapper>
            <form className="form">
                <h3>{isEditing ? "edit job" : "add job"} </h3>
                {showAlert && <Alert />}

                {/* amount */}
                <div className="form-center">
                    <FormRow
                        type="number"
                        name="amount"
                        value={amount}
                        handleChange={handleAddInput}
                        placeholder={"500₹"}
                    />

                    <FormRowSelect
                        lableText={'Type'}
                        name='typeOp'
                        value={typeOp}
                        handleChange={handleAddInput}
                        list={typeOptions}
                    />

                    <FormRow
                        type="text"
                        name="catagoryType"
                        value={catagoryType}
                        handleChange={handleAddInput}
                        placeholder={"ex: salary, investment, travel"}
                    />
                    <FormRow
                        type="date"
                        name="date"
                        value={date}
                        handleChange={handleAddInput}
                    />
                    <FormRow
                        type="text"
                        name="refrence"
                        value={refrence}
                        handleChange={handleAddInput}
                    />
                    <FormRow
                        type="text"
                        name="description"
                        value={description}
                        handleChange={handleAddInput}
                        description={true}
                        placeholder={"only 120 words"}
                    />

                    <div className="btn-container">
                        <button
                            className="btn btn-block submit-btn"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            {isEditing ? "update" : "submit"}
                        </button>
                        {/* clear Values */}
                        <button
                            className="btn btn-block clear-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                clearValues();
                            }}
                        >
                            clear
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
};

export default AddExpense;