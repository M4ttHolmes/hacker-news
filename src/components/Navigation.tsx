import React from "react"
import {Navbar, NavbarBrand, Nav, NavLink} from "reactstrap"
import BrandLogo from "../assets/y18.gif"

// Props passed in from ApiFetch component
type FetchProps = {
    updateFetchType: (fetch: string) => void;
}

const Navigation = (props: FetchProps) => {

    return(
        <div>
            <Navbar dark expand="md">
                <NavbarBrand href="/"><img id="brand-logo" alt="brand logo" src={BrandLogo}></img>Hacker News</NavbarBrand>
                <Nav className="ms-auto" navbar>
                    <NavLink onClick={() => {props.updateFetchType("newstories")}}>Newest</NavLink>
                    <NavLink href="/">Past</NavLink>
                    <NavLink href="/">Comments</NavLink>
                    <NavLink onClick={() => {props.updateFetchType("askstories")}}>Ask</NavLink>
                    <NavLink onClick={() => {props.updateFetchType("showstories")}}>Show</NavLink>
                    <NavLink onClick={() => {props.updateFetchType("jobstories")}}>Jobs</NavLink>
                    <NavLink href="/">Submit</NavLink>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="input-box mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline my-2 my-sm-0" id="search-button" type="submit"><i className="fas fa-search"></i></button>
                    </form>
                </Nav>
            </Navbar>
        </div>
    );
};



export default Navigation;