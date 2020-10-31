import React, { useState } from 'react'
import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons';

const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent] = useState('home')

    const handleClick = (e) => {
        setCurrent(e.key)
    }
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<AppstoreOutlined />}>
                Home
        </Item>

            <Item key="register" icon={<UserAddOutlined />} className='float-right'>
                Register
        </Item>


            <Item key="login" icon={<UserOutlined />} className='float-right'>
                Login
        </Item>

            <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Username">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>


            </SubMenu>
        </Menu>
    )
}

export default Header;