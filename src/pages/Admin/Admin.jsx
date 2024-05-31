import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import ArticleIcon from '@mui/icons-material/Article';
import { Button, Layout, Menu, theme } from 'antd';
import Dash from '../../components/Dashboard/Dash';
const { Header, Sider, Content } = Layout;
const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <StackedBarChartIcon />,
                            label: 'Dashboard',
                        },
                        {
                            key: '2',
                            icon: <ArticleIcon />,
                            label: 'Box history order',
                        },
                        {
                            key: '3',
                            icon: <ArticleIcon />,
                            label: 'Manage Box',
                        },
                        {
                            key: '4',
                            icon: <ArticleIcon />,
                            label: 'Manage Theme',
                        },
                        {
                            key: '5',
                            icon: <ArticleIcon />,
                            label: 'Manage Product',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
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
                    <Dash />
                </Content>
            </Layout>
        </Layout>
    );
};
export default Admin;