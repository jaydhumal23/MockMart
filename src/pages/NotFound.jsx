import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-amber-500 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-foreground mb-2">Page Not Found</h2>
                <p className="text-muted-foreground mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-block px-6 py-3 rounded-lg bg-amber-500 text-white font-semibold hover:opacity-90 transition-opacity"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
