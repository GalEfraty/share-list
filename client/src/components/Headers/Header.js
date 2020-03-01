import React, {useContext} from 'react'
import { authContext } from "../../context/auth";
import PublicHeader from "./PublicHeader"
import PrivateHeader from "./PrivateHeader"
import "../../styles/Headers.css"

const Header = () => {
    const { currentUser } = useContext(authContext);

    return (
        currentUser ? <PrivateHeader /> : <PublicHeader />
    )
}

export default Header
