export const NEW_TIMEOUT_IN_SECONDS = 15 * 60

export function setItemWithTimeout(key, value, timeoutInSeconds) {
	const item = {
		value: value,
		timeout: Date.now() + timeoutInSeconds * 1000, // Convert seconds to milliseconds
	};
	localStorage.setItem(key, JSON.stringify(item));
}

export function getItemWithTimeout(key) {
	const itemString = localStorage.getItem(key);
	if (!itemString) {
		return null; // Item doesn't exist
	}

	window.onload = () => {
		setItemWithTimeout(key, item.value, NEW_TIMEOUT_IN_SECONDS);
		return item.value;
	}
	// documen.addEventListener('click', () => {

	// })

	const item = JSON.parse(itemString);
	if (item.timeout && Date.now() >= item.timeout) {
		// If the item has expired, set a new timeout and update the item
		localStorage.removeItem(key);
		return null
	}

	return item.value;
}


export function checkAndRemoveExpiredData(key, timeout) {
	const storedData = JSON.parse(localStorage.getItem(key));

	if (storedData) {
		const { data, timestamp } = storedData;
		const currentTime = Date.now();

		// Check if the data has expired
		if (currentTime - timestamp > timeout) {
			// Data has expired, remove it
			localStorage.removeItem(key);
			alert('Time out, please login again')
		}

		return data
	}
	return null
}

// Store data and timestamp
// localStorage.setItem('myData', JSON.stringify({ data: 'your data', timestamp: Date.now() }));

// // Check and remove expired data on page load
// checkAndRemoveExpiredData('myData', 3600 * 1000); // You can adjust the timeout value

// // Retrieve data
// const storedData = JSON.parse(localStorage.getItem('myData'));
// if (storedData) {
// 	console.log(storedData.data);
// }