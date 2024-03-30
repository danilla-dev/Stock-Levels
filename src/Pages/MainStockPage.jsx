import React, { useEffect, useState } from 'react'
// Components
import Product from '../components/Product'
// Styles
// Contexts
// Lib
import { child, get } from 'firebase/database'
// DB
import { dbRef } from '../database/firebaseConfig'
// Icons

const MainStockPage = () => {
	const [products, setProducts] = useState([])
	get(child(dbRef, `products`)).then(snapshot => {
		if (snapshot.exists()) {
			const dataArray = Object.values(snapshot.val())
			setProducts(dataArray)
		} else {
			console.log('No data available')
		}
	})
	return (
		<>
			{products !== undefined &&
				products.map((product, index) => {
					return <Product id={product.id} stockLevel={product.stockLevel} img={product.img} key={index} />
				})}
		</>
	)
}

export default MainStockPage
