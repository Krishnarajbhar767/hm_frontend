function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-200 p-4 mt-8">
            <div className="max-w-6xl mx-auto text-center text-sm">
                &copy; {new Date().getFullYear()} MyApp. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
