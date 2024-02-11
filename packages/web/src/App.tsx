import "./App.css";
import Home from "./components/HomePage/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import Devices from "./components/DevicesPage/Devices";

function App() {
	return (
		<div className="App">
			<Router>
				<Topbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/devices" element={<Devices />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
