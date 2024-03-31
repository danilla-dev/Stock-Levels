//Components
import Product from './components/Product'
import MainStockPage from './Pages/MainStockPage'
import NewProductPopup from './components/NewProductPopup'
// Styles
import './assets/styles/App.scss'

function App() {
	return (
		<div className='App'>
			<MainStockPage />
			<NewProductPopup />
		</div>
	)
}

export default App
