import React from 'react';
import { Menu as MenuO, Dropdown } from 'antd';
import { Link } from "react-router-dom";


const Menu = ({ idProduct }) => {
    const handleMenuClick = (e) => {
        console.log('click', e);
        console.log(idProduct)
    }

    const menu = (
        <MenuO onClick={handleMenuClick}>
            <MenuO.Item key="1" >
                <Link to={`/${idProduct}`}>Launch Auction</Link>
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