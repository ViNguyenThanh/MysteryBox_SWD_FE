import React, { useState } from 'react';
import {
    AppstoreOutlined,
    ContainerOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    LogoutOutlined
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/auth.action';
import './Admin.css'
import logo from "/assets/Logo.png"

const { Header, Sider, Content } = Layout;

const items = [
    {
        key: "theme",
        icon: <PieChartOutlined />,
        label: "Theme Management",
        route: "manage-theme",
    },
    {
        key: "product",
        icon: <ContainerOutlined />,
        label: "Product Management",
        route: "manage-product",
    },
    {
        key: "package",
        label: "Package Management",
        icon: <AppstoreOutlined />,
        children: [
            {
                key: "5",
                label: "Package Management",
                route: "manage-package",
            },
            {
                key: "6",
                label: "Package Trash",
                route: "trash-package",
            },
        ],
    },
    {
        key: "box",
        label: "Mystery Box",
        icon: <AppstoreOutlined />,
        children: [
            {
                key: "9",
                label: "History Box Chosen",
                route: "manage-box-history",
            },
            {
                key: "10",
                label: "Box Management",
                route: "manage-box",
            },
        ],
    },
    {
        key: "order",
        label: "Order Management",
        icon: <AppstoreOutlined />,
        children: [
            {
                key: "1",
                label: "Dashboard",
                route: "manage-order/dashboard",
            },
            {
                key: "2",
                label: "Order Status",
                route: "manage-order/status",
            },
        ],
    },
];

const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        message.success("Log Out Successfully");
    };

    const handleMenuClick = (e) => {
        let selectedItem;

        items.forEach((item) => {
            if (item.key === e.key) {
                selectedItem = item;
            }
            if (item.children) {
                item.children.forEach((child) => {
                    if (child.key === e.key) {
                        selectedItem = child;
                    }
                });
            }
        });

        if (selectedItem?.route) {
            navigate(selectedItem.route);
        }
    };
    const listDropdown = [
        {
            label: "Log out",
            key: '1',
            icon: <LogoutOutlined />,
            onClick: handleLogout,
        },
    ];

    const menu = (
        <Menu items={listDropdown} />
    );

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="header-admin">
                    {!collapsed ? <img src={logo} className='logo' /> : <></>}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    style={{ height: '100vh' }}
                    onClick={handleMenuClick}
                    items={items}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />

                    <Dropdown menu={{ items: listDropdown }} trigger={['click']} className='dropdown' >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <Avatar
                                    src={
                                        "https://cdn-media.sforum.vn/storage/app/media/THANHAN/avatar-trang-98.jpg"
                                    }
                                    style={{ cursor: "pointer", width: '40px', height: '40px', marginRight: '20px' }}
                                />
                            </Space>
                        </a>
                    </Dropdown>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default Admin;