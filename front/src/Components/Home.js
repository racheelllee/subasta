import React, { useState, useEffect } from 'react';
import { List, Avatar, Divider } from 'antd';
import Menu from './Menu'
import socketIOClient from 'socket.io-client'


const socket = socketIOClient('http://localhost:3030')

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(false);

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch('http://localhost:3030')
            .then(res => res.json())
            .then(body => {
                setData(body);
                setLoading(false);
                
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadMoreData()

        return ()=>{
            socket.disconnect()
        }
    }, []);

    useEffect(() => {
        if(data.length && flag === false) {
            setFlag(true)
            socket.on("ProductoActualizado", (item) => {
                let oldDatas = [ ...data ]
                let oldIndex = oldDatas.findIndex(e => e.id == item.id)
                if(oldIndex > -1) {
                    oldDatas[oldIndex] = item
                    setData(oldDatas) 
                }
            })
        }
    }, [data]);

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
                        {item.status !== 'closed' ?
                        <Menu idProduct={item.id} status={item.status}/>
                        : <div>Closed</div>
                        }
                    </List.Item>
                )}
            />
        </div>
    );
};

export default Home;