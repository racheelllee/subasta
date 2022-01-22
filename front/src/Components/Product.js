import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import {  useParams } from "react-router-dom";


const Product = () => {
    const [ product, setProduct ]= useState(null)
    const [ currentPrice, setCurrentPrice ]= useState(0)
    let params = useParams();
 
    const loadProduct = () => {
        fetch(`http://localhost:3030/${params.idProduct}`)
            .then(res => res.json())
            .then(body => {
                console.log(body)
                setProduct(body);
            })
            .catch((error) => {
                console.log(error)
            });
    };
    const sendOffert = (price)=>{
        console.log(JSON.stringify({price}))
        fetch(`http://localhost:3030/${product.id}`, 
            { method:'PUT', body: JSON.stringify({price}), headers: {"Content-Type": "application/json"} }
        )
        .then(res => res.json())
        .then(body => {
            console.log(body)
            setProduct(body);
        })
        .catch((error) => {
            console.log(error)
        });
    };

    useEffect(() => {
        loadProduct()
    }, []);

    useEffect(()=>{
        setCurrentPrice(product && product.price? product.price[product.price.length-1] : 0)
    }, [product]);
        

  return (
    product && 
    <div style={{ margin: '10vh auto',
                  maxWidth: 900, 
                  height: '80vh', 
                  overflow: 'hidden', 
                  textAlign: 'center', 
                  background: 'black'
    }}>
        <img src={`http://localhost:3030/image/${product.id}`} />
        <div style={{display: 'flex', justifyContent: 'center', columnGap: 10, margin: 10}}>
            <Button danger="true" type="primary" shape="round" size={'large'} onClick={()=>sendOffert(currentPrice+1)}>{currentPrice+1}€</ Button><br/>
            <Button danger="true" type="primary" shape="round" size={'large'} onClick={()=>sendOffert(currentPrice+2)}>{currentPrice+2}€</ Button><br/>
            <Button danger="true" type="primary" shape="round" size={'large'}></ Button><br/>
        </div>

        <div style={{ borderRadius: 15, background: '#80808040', color:'white'}}>
            <h1 style={{color: 'white'}}> {product.name}</h1>
            <p> {product.description}</p>
            <span style={{borderRadius: 20, background: '#ff4d4f', minWidth: '60px', display:'inline-block', padding: 10}}>{currentPrice}€</span>
            <div style={{ borderRadius: "15px 0px 15px 15px", background:'black', display: 'block', maxWidth: 100, margin:'10px auto'}}>
                time
            </div>
            {product.delivery}
        </div>
    </div>
  );
};

export default Product;