import React, {useState} from 'react';
import {AddForm} from "./AddForm";

export const ItemsList = ({items,setItems,fetchAllItems}) => {
    const [formView,setFormView] = useState(false);

    async function addItem(id){
		try {
            const reqOptions = {
                method: "PUT",
                headers: {
                   "Content-Type": 'application/json'
                }
            }
			const res = await fetch(`http://localhost:3000/items/${id}/1`,reqOptions);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

    async function singleItem(id){
		try {
			const res = await fetch(`http://localhost:3000/items/${id}`);
			const itemData = await res.json();
			console.log("Found",[itemData]);
			setItems([itemData]);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

    if (items.length === 1) {
        return (<>
            <h3 onClick={() => singleItem(items[0].id)}>{items[0].title}</h3>
            <h3>{items[0].price}</h3>
            <p>{items[0].description}</p>
            <button onClick={() => addItem(items[0].id)}>Add to basket</button>
            <button onClick={() => fetchAllItems()}>Back</button>         
        </>)
    }
    else {
        return (<>
        {
            items.map((item, idx) => {
                return <>
                    <h3 onClick={() => singleItem(item.id)}>{item.title}</h3>
                    <h3>{item.price}</h3>
                </>
            })
        }
        {
            (formView) ? <AddForm fetchAllItems={fetchAllItems} setFormView={setFormView}/> : <button onClick={() => setFormView(!formView)}>Add item</button>
        }
    </>)
    }
}