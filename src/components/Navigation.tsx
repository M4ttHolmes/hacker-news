import React, { useState }from "react"
import {Navbar, NavbarBrand, Nav, NavLink, Collapse, NavbarToggler} from "reactstrap"
import BrandLogo from "../assets/y18.gif"

// Props passed in from ApiFetch component
type FetchProps = {
    updateFetchType: (fetch: string) => void;
    searchFetch: () => void;
    setSearch: (search: string) => void;
}

const Navigation = (props: FetchProps) => {
    const [navOpen, setNavOpen] = useState(false)


    const toggle = () => {
        setNavOpen(!navOpen)
    }

    // Main Navigation for app. Links to cycle between different fetch types.
    return(
        <div>
            <Navbar fixed="top" dark expand="md">
                <NavbarBrand href="/"><img id="brand-logo" alt="brand logo" src={BrandLogo}></img>Hacker News</NavbarBrand>
                <NavbarToggler className="me-2" onClick={toggle} />
                <Collapse isOpen={navOpen} navbar >
                    <Nav className="ms-auto" navbar>
                        <NavLink tabIndex={0} onClick={() => {props.updateFetchType("newstories"); toggle()}}>Newest</NavLink>
                        <NavLink href="/">Past</NavLink>
                        <NavLink href="/">Comments</NavLink>
                        <NavLink tabIndex={0} onClick={() => {props.updateFetchType("askstories"); toggle()}}>Ask</NavLink>
                        <NavLink tabIndex={0} onClick={() => {props.updateFetchType("showstories"); toggle()}}>Show</NavLink>
                        <NavLink tabIndex={0} onClick={() => {props.updateFetchType("jobstories"); toggle()}}>Jobs</NavLink>
                        <NavLink href="/">Submit</NavLink>
                        <form className="form-inline my-2 my-lg-0" onSubmit={(e) => {props.searchFetch(); e.preventDefault(); }}>
                            <input className="input-box mr-sm-2" type="search" placeholder="Search" aria-label="Search Field" required onChange={(e) => props.setSearch(e.target.value)}/>
                            <button className="btn btn-outline my-2 my-sm-0" id="search-button" aria-label="Search Button" type="submit"><i className="fas fa-search"></i></button>
                        </form>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};



export default Navigation;