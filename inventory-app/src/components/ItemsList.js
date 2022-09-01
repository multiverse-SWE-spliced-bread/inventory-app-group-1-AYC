import React, {useState} from 'react';
import {AddForm} from "./AddForm";
import { EditForm } from './EditForm';

export const ItemsList = ({items,setItems,fetchAllItems}) => {
    const [formView,setFormView] = useState(false);
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

    async function deleteItem(id){
        const reqOptions = {
            method: "DELETE",
            headers: {
               "Content-Type": 'application/json'
            }
        }
        try {
			const res = await fetch(`http://localhost:3000/items/${id}`,reqOptions);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
        fetchAllItems()
    }

    if (items.length === 1) {
        return (<>
            <h3 className="single title">{items[0].title}</h3>
            <div className="img-grid"><img src={items[0].image}/></div>
            <h3 className="single price">£{items[0].price}</h3>
            <p className="single description">{items[0].description}</p>
            <button onClick={() => addItem(items[0].id)}>Add to basket</button>
            <button onClick={() => fetchAllItems()}>Back</button>         
        </>)
    }
    else {
        return (<>
        {
            items.map((item, idx) => {
                return <>
                <div className="multi-item">
                    <h3 onClick={() => singleItem(item.id)} className="multi title">{item.title}</h3>
                    <h3 className="multi price">£{item.price}</h3>
                </div>
                </>
            })
        }
        {
            (formView) ? <AddForm fetchAllItems={fetchAllItems} setFormView={setFormView}/> : <button onClick={() => setFormView(!formView)}>Add item</button>
        }
    </>)
    }
}