import React, {useState, useContext} from 'react';
import {NavLink, Link} from 'react-router-dom';
import './Navigation.css';
import axios from "axios";
import {AuthContext} from "../utils/auth-context";

const Navigation = () => {
    const auth = useContext(AuthContext);

    const [userResponse, setUserResponse] = useState('');

    if(auth.userId) {
        axios.get(`http://localhost:5000/user/${auth.userId}`)
            .then(response => {
            setUserResponse(response.data);
        })
    }

    const getUserGames = () => {
        if(userResponse) {
            let games = userResponse.games.map(function (element) {
                let id = element._id;
                return (
                    <li>
                        <NavLink to={"/game/" + id}>
                            {element.game_name}
                        </NavLink>
                    </li>
                )
            });
            return (<ul className="nav-links">{games}</ul>);
        }
    }

    return (
        <div className='ribbon'>
            <table className='navbar'>
                <tbody>
                <tr>

                    <td className='games'>
                        <span className="username">Hello {auth.username}!</span>
                        <Link to="/"><span className="logout" onClick={auth.logout}> Log out</span></Link>
                        {getUserGames()}
                    </td>

                    <td className='nav-buttons'>
                        <ul className="nav-links">
                            <li>
                                <NavLink to="/joingame">
                                    Join Game
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/newgame">
                                    New Game
                                </NavLink>
                            </li>
                        </ul>
                    </td>

                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Navigation;
