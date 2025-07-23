import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import Comments from "./pages/Comments";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Feed />} />
				<Route path="/comments/:postId" element={<Comments />} />
			</Routes>
		</Router>
	);
}
