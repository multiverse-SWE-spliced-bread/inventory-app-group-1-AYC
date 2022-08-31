import React, {useState} from 'react';

export const ItemsList = ({items,setItems}) => {
    return <>
        {
            items.map((item, idx) => {
                return <>
                    <h3>{item.title}</h3>
                    <h3>{item.price}</h3>
                    <p>{item.description}</p>
                </>
            })
        }
    </>
}