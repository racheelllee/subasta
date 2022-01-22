import React, { useState, useEffect } from 'react';
import { List, Avatar } from 'antd';
import Menu from './Menu'


const Home = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch('http://localhost:3030')
            .then(res => res.json())
            .then(body => {
                console.log(body)
                setData(body);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadMoreData()
    }, []);

    return (
        <div
            id="scrollableDiv"
            style={{
                height: 400,
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
        >
            <List
                dataSource={data}
                renderItem={item => (
                    <List.Item key={item.id}>
                        <List.Item.Meta
                            avatar={<Avatar src={`http://localhost:3030/image/${item.id}`} />}
                            title={item.name}
                            description={item.description}
                        />
                        <Menu idProduct={item.id} />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default Home;