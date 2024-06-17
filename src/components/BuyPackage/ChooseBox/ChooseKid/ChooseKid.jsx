import React, { useEffect, useRef, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Empty, Input, Radio, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import './ChooseKid.css'
import { useDispatch, useSelector } from "react-redux";
import { getKidProfile } from "../../../../redux/actions/kid.action";

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 3,
        gender: "Boy",
    },
    {
        key: '2',
        name: 'Elys Black',
        age: 10,
        gender: "Girl",
    },
    {
        key: '3',
        name: 'Joe Hathawway',
        age: 8,
        gender: "Boy",
    },
    {
        key: '4',
        name: 'David Robinson',
        age: 13,
        gender: "Unisex",
    },
    {
        key: '5',
        name: 'David Ahihi',
        age: 5,
        gender: "Boy",
    },
    {
        key: '6',
        name: 'Zizi',
        age: 16,
        gender: "Girl",
    },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        // disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
    }),
};

const ChooseKid = ({ setNextEnabled, selectedRowKey, setSelectedRowKey, paginationState, setPaginationState }) => {

    const dispatch = useDispatch();

    const [selectionType, setSelectionType] = useState('radio');
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
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
                    <Button
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
                    </Button>
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
            title: 'Name',
            dataIndex: 'fullName',
            // render: (text) => <a>{text}</a>,
            className: 'column',
            ...getColumnSearchProps('fullName'),
        },
        // {
        //     title: 'Age',
        //     dataIndex: 'age',
        //     className: 'column',
        //     sorter: (a, b) => a.age - b.age,
        // },
        {
            title: "Age",
            dataIndex: "yob",
            className: "column",
            // sorter: (a, b) => a.age - b.age,
            sorter: (a, b) => calculateAge(a.yob) - calculateAge(b.yob),
            sortDirections: ['descend', 'ascend'],
            render: (text, record) => calculateAge(record.yob),
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            className: 'column',
            ...getColumnSearchProps('gender'),
            // filters: [
            //     {
            //         text: 'Boy',
            //         value: 'Boy',
            //     },
            //     {
            //         text: 'Girl',
            //         value: 'Girl',
            //     },
            //     {
            //         text: 'Unisex',
            //         value: 'Unisex',
            //     },
            // ],
            // onFilter: (value, record) => record.gender.indexOf(value) === 0,
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        setPaginationState(pagination);
        console.log('params', pagination, filters, sorter, extra);
    };


    const [isRowSelected, setIsRowSelected] = useState(false);

    const handleRowSelection = () => ({
        onClick: () => {
            setIsRowSelected(true); // Cập nhật trạng thái khi có hàng được chọn
        },
    });

    useEffect(() => {
        if (selectedRowKey) {
            setIsRowSelected(true);
        }
        setNextEnabled(isRowSelected); // Truyền trạng thái của việc chọn hàng lên component cha
        dispatch(getKidProfile());
    }, [selectedRowKey, isRowSelected, setNextEnabled]);

    const kids = useSelector((state) => state.kidReducer?.dataKids);

    return (
        <div className='choose_kid-container'>
            <Table
                className='choose_kid-table'
                // rowSelection={{
                //     type: selectionType,
                //     ...rowSelection,
                // }}
                rowSelection={{
                    type: selectionType,
                    selectedRowKeys: selectedRowKey ? [selectedRowKey] : [], // Chỉ đánh dấu hàng đã chọn nếu đã có selectedRowKey
                    onSelect: (record) => setSelectedRowKey(record.key), // Cập nhật selectedRowKey khi chọn một hàng
                    onChange: (selectedRowKeys) => {
                        const selectedKey = selectedRowKeys[0];
                        setSelectedRowKey(selectedKey);
                    },
                }}
                columns={columns}
                dataSource={kids.map((kid) => ({ ...kid, key: kid.id }))}
                onChange={onChange}
                onRow={(record, rowIndex) => ({
                    ...handleRowSelection(record, rowIndex),
                })}
                showSorterTooltip={{
                    target: 'sorter-icon',
                }}
                // pagination={{
                //     pageSize: 5
                // }}
                pagination={paginationState} // Đặt phân trang về trạng thái phân trang hiện tại
                locale={{
                    emptyText: <Empty description="You have no kid here" />,
                }}
            />
        </div>
    )
}

export default ChooseKid