import React, { useEffect, useRef, useState } from 'react'
import { FilterFilled, SearchOutlined } from '@ant-design/icons';
import { Button, Empty, Input, Radio, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import './ChooseKid.css'
import { useDispatch, useSelector } from "react-redux";
import { getKidProfile } from "../../../../redux/actions/kid.action";
import { getChooseKid } from "../../../../apis/kid.request";

const ChooseKid = ({ setNextEnabled, selectedRowKey, setSelectedRowKey, paginationState, setPaginationState }) => {

    const dispatch = useDispatch();

    const [selectionType, setSelectionType] = useState('radio');
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [genderFilter, setGenderFilter] = useState(null);
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
            render: (gender) => (
                <p>
                    {gender === "MALE" ? "Boy" : gender === "FEMALE" ? "Girl" : "Unisex"}
                </p>
            ),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Radio.Group
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : []);
                            setGenderFilter(e.target.value);
                            confirm();
                        }}
                        value={genderFilter}
                    >
                        <Radio value="MALE">Boy</Radio>
                        <Radio value="FEMALE">Girl</Radio>
                        <Radio value="OTHER">Unisex</Radio>
                    </Radio.Group>
                    <Space style={{ marginTop: 8 }}>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => {
                                clearFilters();
                                setGenderFilter(null);
                                confirm();
                            }}
                        >
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: (filtered) => (
                <FilterFilled
                    style={{
                        color: filtered ? '#1677ff' : undefined,
                    }}
                />
            ),
            onFilter: (value, record) => record.gender.indexOf(value) === 0,
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        setPaginationState(pagination);
        // console.log('params', pagination, filters, sorter, extra);
    };


    const [isRowSelected, setIsRowSelected] = useState(false);
    const [kids, setKids] = useState([]);
    
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
        const fetchDataKidProfile = async () => {
            const response = await getChooseKid();
            setKids(response.data?.kidProfiles);
        };
        fetchDataKidProfile();
    }, [selectedRowKey, isRowSelected, setNextEnabled]);

    // const kids = useSelector((state) => state.kidReducer?.dataKids);

    return (
        <div className='choose_kid-container'>
            <Table
                className='choose_kid-table'
                rowSelection={{
                    type: selectionType,
                    selectedRowKeys: selectedRowKey ? [selectedRowKey] : [], // Chỉ đánh dấu hàng đã chọn nếu đã có selectedRowKey
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
                    emptyText: <Empty description="All children are in buying mode" />,
                }}
            />
        </div>
    )
}

export default ChooseKid