function Header() {
    return (
        <header className="bg-blue-600 text-white p-4 shadow">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <h1 className="text-2xl font-bold">MyApp</h1>
                <nav className="space-x-4">
                    <a href="#" className="hover:underline">
                        Home
                    </a>
                    <a href="#" className="hover:underline">
                        About
                    </a>
                    <a href="#" className="hover:underline">
                        Contact
                    </a>
                </nav>
            </div>
        </header>
    );
}

export default Header;
