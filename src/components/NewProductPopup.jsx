import React, { useState } from 'react'
// Components
// Styles
import '../assets/styles/NewProductPopup.scss'
// Contexts
// Lib
// DB
import { ref, uploadBytes, getStorage, getDownloadURL } from 'firebase/storage'

// Icons
import { MdOutlineDataSaverOn, MdOutlineCancel } from 'react-icons/md'

const NewProductForm = params => {
	const [formData, setFormData] = useState({
		id: '',
		img: '',
		stockLevel: '',
	})

	// Handle save new product in DB
	const handleSaveDataAtDB = e => {
		// const storage = getStorage()
		// const storageRef = ref(storage, 'dzbanki/' + file.name)
		// const imageURL = URL.createObjectURL(file)
		// setFormData(prevData => ({
		// 	...prevData,
		// 	img: imageURL,
		// }))
		// uploadBytes(storageRef, file)
		// 	.then(snapshot => {
		// 		return getDownloadURL(snapshot.ref)
		// 	})
		// 	.then(downloadURL => {
		// 		console.log('URL przesłanego pliku:', downloadURL)
		// 	})
		// 	.catch(error => {
		// 		console.error('Błąd podczas przesyłania pliku:', error)
		// 	})
	}

	// Handle onChanges in form
	const handleFormOnChange = e => {
		const { value, name, files } = e.target
		const file = files && files[0]
		const imageURL = files && URL.createObjectURL(file)
		setFormData(prevData => ({
			...prevData,
			[name]: name === 'img' ? imageURL : value,
		}))
	}

	const { img, id, stockLevel } = formData
	return (
		<>
			<form className='new-product-form'>
				<label htmlFor='id'>Product ID:</label>
				<input type='text' name='id' value={id} onChange={handleFormOnChange} className='new-product-form__id-input' />
				<label htmlFor='stockLevel'>Initial stock level:</label>
				<input
					type='number'
					name='stockLevel'
					value={stockLevel}
					onChange={handleFormOnChange}
					className='new-product-form__stock-level-input'
				/>
				<label htmlFor='img'>Select image</label>
				<input type='file' name='img' className='new-product-form__image-input' onChange={handleFormOnChange} />
				{img && (
					<span className='new-product-form__image-preview'>
						<img src={formData.img} alt='' />
					</span>
				)}
				<div className='new-product-form__actions-buttons'>
					<button className='new-product-form__actions-buttons-save'>
						<MdOutlineDataSaverOn />
					</button>
					<button className='new-product-form__actions-buttons-cancel'>
						<MdOutlineCancel />
					</button>
				</div>
			</form>
		</>
	)
}

const NewProductPopup = () => {
	return (
		<div className='new-product-popup'>
			<NewProductForm />
		</div>
	)
}

export default NewProductPopup
