import React, { useState, useEffect } from 'react';
import { ItemsList } from './ItemsList';

export const App = () => {
  const [items,setItems] = useState([]);

  async function fetchAllItems(){
		try {
			const response = await fetch("http://localhost:3000/items/");
			const itemsData = await response.json();
      console.log(itemsData);
			setItems(itemsData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchAllItems();
	}, []);

  return (
    <main>	
      <h1>Inventory App</h1>
			<ItemsList items={items} setItems={setItems} />
		</main>
  );
}

export default App;
