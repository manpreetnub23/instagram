import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
	return (
		<Router>
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
			</Routes>
		</Router>
	);
}

export default App;
