import React, { useState, useEffect } from 'react';
import { Button, InputNumber, Form } from 'antd';
import { Link } from "react-router-dom";
import {  useParams } from "react-router-dom";
import socketIOClient from 'socket.io-client'

const Product = () => {
    const [ product, setProduct ]= useState(null)
    const [ currentPrice, setCurrentPrice ]= useState(0)
    const [form] = Form.useForm();
    let params = useParams();
 
    const loadProduct = () => {
        fetch(`http://localhost:3030/${params.idProduct}`)
            .then(res => res.json())
            .then(body => {
                setProduct(body);
            })
            .catch((error) => {
                console.log(error)
            });
    };

    const sendOther = (e) => {
        sendOffert(e.price)
        form.resetFields()
    }

    const sendOffert = (price)=>{
        fetch(`http://localhost:3030/${product.id}`, 
            { method:'PATCH', body: JSON.stringify({price}), headers: {"Content-Type": "application/json"} }
        ).then(res => res.json()
        ).then(body => {
            setProduct(body);
        }).catch((error) => {
            console.log(error)
        });
    };

    useEffect(() => {
        loadProduct()
        const socket = socketIOClient('http://localhost:3030')
        socket.on("ProductoActualizado", (item) => {
            if( item.id === params.idProduct) {
                setProduct(item)
            }
        })
        return ()=>{
            socket.disconnect()
        }
    }, []);

    useEffect(()=>{
        setCurrentPrice(product && product.price? product.price[product.price.length-1] : 0)
    }, [product]);
    

    return (
        product && 
        <div style={{ margin: '5vh auto',
                    maxWidth: 900, 
                    height: '90vh', 
                    overflow: 'hidden', 
                    textAlign: 'center', 
                    background: 'black'  
        }}>
            <img src={`http://localhost:3030/image/${product.id}`} />
            <div style={{display: 'flex', justifyContent: 'center', columnGap: 10, margin: 10}}>
                <Button danger="true" type="primary" shape="round" size={'large'} onClick={()=>sendOffert(currentPrice+1)}>{currentPrice+1}€</ Button><br/>
                <Button danger="true" type="primary" shape="round" size={'large'} onClick={()=>sendOffert(currentPrice+2)}>{currentPrice+2}€</ Button><br/>
                <Form form={form} onFinish={sendOther}>
                    <Form.Item name='price' rules={[{required: true}]}>
                        <InputNumber
                            style={{ borderRadius: 25, background: '#ff4d4f', color: 'white', padding:5}}
                            bordered={false}
                            min={currentPrice + 1}
                            required={true}
                            placeholder='Other'
                        />
                    </Form.Item>
                </Form>
            </div>

            <div style={{ borderRadius: 15, background: '#80808040', color:'white'}}>
                <h1 style={{color: 'white'}}> {product.name}</h1>
                <p> {product.description}</p>
                <span style={{borderRadius: 20, background: '#ff4d4f', minWidth: '60px', display:'inline-block', padding: 10}}>{currentPrice}€</span>
                <p>
                    +{product.delivery}€ de livraison
                </p>
                {product.countDown &&
                    <div style={{ borderRadius: "15px 0px 15px 15px", background:'black', display: 'block', maxWidth: 180, margin:'10px auto', padding:10}}>
                        {product.countDown > 0 ? <>Time remaining: {product.countDown}</> : 'Closed'}
                    </div>
                }
                <p>
                    <Link to={'/'}>Go Home</Link>
                </p>

            </div>
        </div>
    );
};

export default Product;