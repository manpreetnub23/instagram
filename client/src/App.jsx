import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import UploadPage from "./pages/UploadPage";
import ProtectedRoute from "./components/ProtectedRoute";
import TopNavbar from "./components/Navbar";
import BottomNavbar from "./components/BottomNavbar";
import Comments from "../src/pages/Comments";
import Profile from "./pages/Profile"; // 👈 import profile

function Layout() {
	const location = useLocation();
	const hideNav = location.pathname === "/" || location.pathname === "/signup";

	return (
		<>
			{!hideNav && <TopNavbar />}
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route
					path="/feed"
					element={
						<ProtectedRoute>
							<Feed />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/upload"
					element={
						<ProtectedRoute>
							<UploadPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/comments/:postId"
					element={
						<ProtectedRoute>
							<Comments />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/profile/:username"
					element={
						<ProtectedRoute>
							<Profile /> {/* 👈 added profile route */}
						</ProtectedRoute>
					}
				/>
			</Routes>
			{!hideNav && <BottomNavbar />}
		</>
	);
}

function App() {
	return <Layout />;
}

export default App;
