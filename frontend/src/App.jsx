import { Container } from "react-bootstrap";
import { Routes, Route, HashRouter } from "react-router-dom";
import Header from "./components/partials/Header.jsx";
import Footer from "./components/partials/Footer.jsx";
import Productpage from "./components/pages/Productpage.jsx";
import Homepage from "./components/pages/Homepage.jsx";
import Cartpage from "./components/pages/Cartpage.jsx";

import LoginPage from "./components/pages/UserLoginPage.jsx";
import RegisterPage from "./components/pages/UserRegisterPage.jsx";
import ProfilePage from "./components/pages/ProfilePage.jsx";
import ShippingPage from "./components/pages/ShippingPage.jsx";
import PaymentPage from "./components/pages/PaymentPage.jsx";
import PlaceOrderPage from "./components/pages/PlaceOrderPage.jsx";
import OrderPage from "./components/pages/OrderPage.jsx";

function App() {
	return (
		<HashRouter>
			<Header />
			<main className="py-3">
				<Container>
					<Routes>
						<Route path="/" element={<Homepage />} exact />
						<Route path="/product/:id" element={<Productpage />} />
						<Route path="/cart/" element={<Cartpage />} />
						<Route path="/cart/:id" element={<Cartpage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/profile" element={<ProfilePage />} />
						<Route path="/shipping" element={<ShippingPage />} />
						<Route path="/payment" element={<PaymentPage />} />
						<Route path="/placeorder" element={<PlaceOrderPage />} />
						<Route path="/order/:id" element={<OrderPage />} />
					</Routes>
				</Container>
			</main>
			<Footer />
		</HashRouter>
	);
}

export default App;
