import { useState } from "react";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext.js";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const Profile = () => {
    const { user, showAlert, displayAlert, updateUser, isLoading } =
        useAppContext();


    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [profession, setprofession] = useState(user?.profession);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !profession) {
            // test and remove temporary
            displayAlert();
            return;
        }

        updateUser({ name, email, profession, });
    };
    return (
        <Wrapper>
            <form className="form" onSubmit={handleSubmit}>
                <h3>profile </h3>
                {showAlert && <Alert />}

                {/* name */}
                <div className="form-center">
                    <FormRow
                        type="text"
                        name="name"
                        value={name}
                        handleChange={(e) => setName(e.target.value)}
                    />
                    <FormRow
                        labelText="last name"
                        type="text"
                        name="profession"
                        value={profession}
                        handleChange={(e) => setprofession(e.target.value)}
                    />
                    <FormRow
                        type="email"
                        name="email"
                        value={email}
                        handleChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="btn btn-block" type="submit" disabled={isLoading}>
                        {isLoading ? "Please Wait..." : "save changes"}
                    </button>
                </div>
            </form>
        </Wrapper>
    );
};

export default Profile;