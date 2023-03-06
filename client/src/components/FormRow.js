const FormRow = ({ type, name, value, handleChange, labelText, placeholder, description }) => {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">
                {labelText || name}
            </label>

            {
                description ?
                    <textarea type={type} value={value} name={name} onChange={handleChange} className="form-input" placeholder={placeholder} rows="8" cols="50" />

                    : <input
                        type={type}
                        value={value}
                        name={name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder={placeholder}
                    />
            }


        </div>
    );
};

export default FormRow;