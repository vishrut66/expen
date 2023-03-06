import moment from "moment";
import { RiFileEditLine } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
import { useAppContext } from "../../context/appContext.js";
import { Link } from "react-router-dom";


const Exp = ({ type, amount, catagory, date, refrence, _id }) => {

    const { setEditExp, deleteExp } = useAppContext();

    let dat = moment(date);
    dat = dat.format("MMM Do, YYYY");

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td data-label="Date">{dat}</td>
                        <td data-label="Amount">{amount}</td>
                        <td data-label="Category">{catagory}</td>
                        <td data-label="Type">{type}</td>
                        <td data-label="Refrence">{refrence}</td>
                        <td data-label="Action">
                            <footer>
                                <div className="actions">

                                    <Link
                                        to="/add-expense"
                                        onClick={() => setEditExp(_id)}
                                        className="btn edit-btn"
                                    >
                                        < RiFileEditLine />
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn delete-btn"
                                        onClick={() => deleteExp(_id)}
                                    >
                                        <AiOutlineDelete />
                                    </button>
                                </div>
                            </footer>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
};

export default Exp;


