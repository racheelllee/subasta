import React from 'react';
import { Menu as MenuO, Dropdown } from 'antd';
import { Link } from "react-router-dom";


const Menu = ({ idProduct, status }) => {
    const changeStatus = ()=>{
        if(status === 'available'){
            fetch(`http://localhost:3030/${idProduct}`, {
                method: 'PATCH', body:JSON.stringify({status:'inProcess'}), headers: {'Content-Type': 'application/json'}
            }).then(res => res.json())
            .catch(error=>{
                console.log(error)
            })
        }

    }

    const menu = (
        <MenuO>
            <MenuO.Item key="1" >
                <Link to={`/${idProduct}`} onClick={changeStatus}>{status === 'available' ? 'Launch Auction' : 'Join Auction'}</Link>
            </MenuO.Item>
        </MenuO>
    );

    return (
        <div>
            <Dropdown.Button overlay={menu} />
        </div>
    )
};

export default Menu;