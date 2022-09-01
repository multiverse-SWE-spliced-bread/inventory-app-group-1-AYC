import React, {useState} from 'react';
import { AddForm } from "./AddForm";
import { EditForm } from './EditForm';

export const ItemsList = ({items,setItems,fetchAllItems}) => {
    const [addFormView,setAddFormView] = useState(false);
    const [editFormView,setEditFormView] = useState(false);


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
            {
            (editFormView) ? <EditForm fetchAllItems={fetchAllItems} setEditFormView={setEditFormView} items={items} /> : <button onClick={() => setEditFormView(!editFormView)}>Edit item</button>
        }
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
            (addFormView) ? <AddForm fetchAllItems={fetchAllItems} setAddFormView={setAddFormView}/> : <button onClick={() => setAddFormView(!addFormView)}>Add item</button>
        }

    </>)
    }
}