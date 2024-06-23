import React, { useEffect, useRef, useState } from 'react'
import './TableKid.css'

import { SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Empty, Input, Popconfirm, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import CreateKid from './CreateKid';
import { useDispatch, useSelector } from "react-redux";
import { getKidProfile } from "../../../redux/actions/kid.action";

export default function TableKid() {
    const [showTable, setShowTable] = useState(false)
    const [isDisable, setIsDisable] = useState(false)
    const [kid, setKid] = useState({})
    const [kidId, setKidId] = useState("");
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getKidProfile());
    }, []);
    const kids = useSelector((state) => state.kidReducer?.dataKids);
    console.log(kids);


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    {/* <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button> */}
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleView = (record) => {
        // Thực hiện hành động khi nhấp vào "View"
        setShowTable(true)
        setIsDisable(true)
        setKid(record)
    };

    const handleUpdate = (record) => {
        // Thực hiện hành động khi nhấp vào "Update"
        setShowTable(true)
        setIsDisable(false)
        setKid(record)
        setKidId(record.id);
    };

    const handleShowTable = () => {
        setShowTable(false)
    }

    const handleDelete = (record) => {

    };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const columns = [
        {
            title: 'No.',
            key: 'index',
            width: '10%',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Full name',
            dataIndex: 'fullName',
            key: 'fullName',
            width: '30%',
            ...getColumnSearchProps('fullName'),
        },
        {
            title: 'Age',
            dataIndex: 'yob',
            key: 'age',
            width: '10%',
            sorter: (a, b) => calculateAge(a.yob) - calculateAge(b.yob),
            sortDirections: ['descend', 'ascend'],
            render: (text, record) => calculateAge(record.yob),
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (gender) => (
                <p>
                  {gender === "MALE" ? "Boy" : gender === "FEMALE" ? "Girl" : "Unisex"}
                </p>
              ),
            width: '20%'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: '20%',
            render: (text, record) => (
                <Space>
                    <Button onClick={() => handleView(record)}><EyeOutlined /></Button>
                    <Button onClick={() => handleUpdate(record)}><EditOutlined /></Button>
                    <Popconfirm title="Are you sure delete this task?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDelete(record)}>
                        <Button danger><DeleteOutlined /></Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    return (
        <div className="table_kid-container">
            {(!showTable ? <Table
                columns={columns}
                dataSource={kids}
                scroll={{ y: 300 }}
                pagination={{
                    pageSize: 5
                }}
                locale={{
                    emptyText: <Empty description="You have no kid here" />,
                }}
            /> : <CreateKid kid={kid} kidId={kidId} showTable={handleShowTable} isDisable={isDisable} />)}
        </div>
    )
}
