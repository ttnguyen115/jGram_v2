import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import Search from './Search';

const Header = () => {
    return (
        <div className="sticky top-0 left-0 z-10 w-full shadow min-h-70px">
            <nav className="flex items-center justify-between w-full h-full navbar navbar-expand-lg">
                <Link to="/" className="m-auto">
                    <h1 className="p-0 text-2xl font-bold uppercase md:text-3xl navbar-brand hover:text-black focus:text-black">jGram</h1>
                </Link>

                <Search />

                <Menu />
            </nav>
        </div>
    )
}

export default Header
