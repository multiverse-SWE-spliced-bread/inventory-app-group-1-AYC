import React, {useState} from 'react';

export const EditForm = ({fetchAllItems, setEditFormView, items}) => {
    const [title,setTitle] = useState("");
    const [price,setPrice] = useState(0);
    const [description,setDescription] = useState("");
    const [category,setCategory] = useState("");
    const [image,setImage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const reqOptions = {
            method: "PUT",
            headers: {
               "Content-Type": 'application/json'
            },
            body : JSON.stringify({
                title: title,
                price: price,
                description: description,
                category: category,
                image: image
            })
        }
        console.log(items)
        try {
            await fetch(`http://localhost:3000/items/${items[0].id}`,reqOptions)
        }
        catch (err) {
            console.log(err);
            alert(err);
        }
        setTitle("");
        setPrice(0);
        setDescription("");
        setCategory("");
        setImage("");
        fetchAllItems();
        setEditFormView(!setEditFormView);
    }

    return ( <>
    <form onSubmit={handleSubmit}>
        <h3>Edit item:</h3>
        <label>
            Title:
            <input value={title} onChange={(event) => setTitle(event.target.value)} type="text"></input>
        </label>
        <label>
            Price:
            <input value={price} onChange={(event) => setPrice(event.target.value)} type="number" step=".01" min="0"></input>
        </label>
        <label>
            Description:
            <input value={description} onChange={(event) => setDescription(event.target.value)} type="text"></input>
        </label>
        <label>
            Category:
            <input value={category} onChange={(event) => setCategory(event.target.value)} type="text"></input>
        </label>
        <label>
            Image URL:
            <input value={image} onChange={(event) => setImage(event.target.value)} type="text"></input>
        </label>
        <button type="submit">Submit</button>
    </form>
    </>)
}