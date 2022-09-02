import React, {useState} from 'react';

export const AddForm = ({fetchAllItems,setFormView}) => {
    const [title,setTitle] = useState("");
    const [price,setPrice] = useState(0);
    const [description,setDescription] = useState("");
    const [category,setCategory] = useState("");
    const [image,setImage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const reqOptions = {
            method: "POST",
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
        try {
            await fetch("http://localhost:3000/items/",reqOptions)
        }
        catch (err) {
            console.log("Error!");
            alert(err);
        }
        setTitle("");
        setPrice(0);
        setDescription("");
        setCategory("");
        setImage("");
        fetchAllItems();
        setFormView(!setFormView);
    }

    return ( <>
    <form onSubmit={handleSubmit} className="form">
        <h3>Add item:</h3>
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