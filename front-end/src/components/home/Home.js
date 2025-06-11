import { Link } from "react-router-dom";
import BackGround from "../../asset/note.jpg"
const Home = () => {
    return (
        <div
            className="h-screen flex items-center justify-center bg-cover bg-center relative"
            style={{
                backgroundImage: `url(${BackGround})`, // Correct background image URL
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '100vh',
              }}
        >
            <div className="absolute inset-0 bg-black opacity-40"></div> {/* Optional overlay for better readability */}
            <div className="relative z-10 text-center">
                <h2 className="text-4xl font-semibold text-white mb-8 tracking-tight">Welcome to Your Task management List</h2>
                <Link to="/todo">
                    <button
                        className="px-8 py-4 text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
                    >
                        Start Your Task List
                    </button>
                </Link>
            </div>
        </div>

    );
};

export default Home;
