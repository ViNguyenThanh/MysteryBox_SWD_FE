import React, { useEffect, useState } from 'react'
import "./CreateKid.css"

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Breadcrumb } from 'antd';

export default function CreateKid({ kid, showTable, isDisable }) {
    // làm chức năng Update Profile
    const [profile, setProfile] = useState({
        fullName: '',
        yob: null,
        gender: '',
        descriptionHobby: '',
        type: '',
        color: '',
        material: '',
        toyOrigin: ''
    });

    const [hasSelectedColor, setHasSelectedColor] = useState(false);
    const [hasSelectedGender, setHasSelectedGender] = useState(false);
    const [hasSelectedMaterial, setHasSelectedMaterial] = useState(false);
    const [hasSelectedType, setHasSelectedType] = useState(false);
    const [hasSelectedMadeIn, setHasSelectedMadeIn] = useState(false);

    useEffect(() => {
        // Nếu kid có giá trị thì gán giá trị profile
        if (kid) {
            setProfile({
                fullName: kid.fullName || '',
                yob: null,
                gender: kid.gender || '',
                descriptionHobby: kid.descriptionHobby || '',
                type: kid.type || '',
                color: kid.color || '',
                material: kid.material || '',
                toyOrigin: kid.toyOrigin || ''
            });
            console.log(kid);

            // Set lại các trạng thái đã chọn ban đầu dựa trên giá trị hiện tại
            setHasSelectedColor(kid.color !== '');
            setHasSelectedGender(kid.gender !== '');
            setHasSelectedMaterial(kid.material !== '');
            setHasSelectedType(kid.type !== '');
            setHasSelectedMadeIn(kid.toyOrigin !== '');
        }
    }, [kid]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProfile({
            ...profile,
            [name]: value
        });

        if (name === 'color' && value !== '') {
            setHasSelectedColor(true)
        }
        if (name === 'gender' && value !== '') {
            setHasSelectedGender(true)
        }
        if (name === 'material' && value !== '') {
            setHasSelectedMaterial(true)
        }
        if (name === 'type' && value !== '') {
            setHasSelectedType(true)
        }
        if (name === 'toyOrigin' && value !== '') {
            setHasSelectedMadeIn(true)
        }
    };

    const handleDateChange = (date) => {
        setProfile({
            ...profile,
            yob: date,
        })
    }

    // const [isEditable, setIsEditTable] = useState(false)

    // const toggleEdit = () => {
    //     setIsEditTable(!isEditable)
    // }

    const handleUpdateKidProfile = () => {

    }

    const handleCreateKidProfile = () => {

    }

    return (
        <div className='create_kid-container'>
            {(kid &&
                <div className="breadcrumb-wrapper">
                    <Breadcrumb
                        items={[
                            // {
                            //     title: "Kid's profile",
                            // },
                            {
                                title: <span
                                    onClick={showTable}
                                    style={{
                                        cursor: 'pointer',
                                        padding: '3px',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = '#f0f0f0';
                                        e.target.style.borderRadius = '20px';
                                        e.target.style.padding = '10px 15px';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = 'transparent';
                                    }}
                                >Kids list</span>,
                            },
                            {
                                title: `${kid.fullName}`,
                            },
                        ]}
                    />
                </div>)}
            <div className="field">
                <p>Fullname: </p>
                <input
                    type="text"
                    name="fullName"
                    placeholder="Input kid's name"
                    value={profile.fullName}
                    // readOnly={!isEditable}
                    readOnly={isDisable}
                    onChange={handleInputChange}
                    // style={{ color: isEditable ? '#000000' : '#a8a8a8' }}
                    style={{ color: isDisable ? '#a8a8a8' : '#000000' }}
                />
            </div>

            <div className="field">
                <p>Hobby: </p>
                <input
                    type="text"
                    name="descriptionHobby"
                    placeholder="Input kid's hobby"
                    value={profile.descriptionHobby}
                    // readOnly={!isEditable}
                    readOnly={isDisable}
                    onChange={handleInputChange}
                    // style={{ color: isEditable ? '#000000' : '#a8a8a8' }}
                    style={{ color: isDisable ? '#a8a8a8' : '#000000' }}
                />
            </div>

            <div className="two-field">
                <div className="field-to-select">
                    <p>Birth: </p>
                    <div className="field">
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    // label={'"year", "month" and "day"'}
                                    views={['year', 'month', 'day']}
                                    className="custom-datepicker"
                                    value={profile.yob}
                                    // readOnly={!isEditable}
                                    readOnly={isDisable}
                                    onChange={handleDateChange}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'transparent',
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'transparent',
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'transparent',
                                            },
                                            '& input': {
                                                // color: isEditable ? '#000000' : '#a8a8a8'
                                                color: isDisable ? '#a8a8a8' : '#000000'
                                            }
                                        },
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </div>

                <div className="field-to-select">
                    <p>Color: </p>

                    <select
                        className='select-field'
                        name="color"
                        value={profile.color}
                        onChange={handleInputChange}
                        // disabled={!isEditable}
                        // style={{ color: isEditable ? '#000000' : '#a8a8a8' }}
                        disabled={isDisable}
                        style={{ color: isDisable ? '#a8a8a8' : '#000000' }}
                    >
                        {/* vì nếu ko có dòng này thì value đầu tiên nó hiện ra sẽ ko lưu đc pink, nó ra "", mà khi chọn lại nó mới chịu */}
                        {!hasSelectedColor && <option value="">Choose color</option>}
                        <option value="pink">Pink</option>
                        <option value="orange">Orange</option>
                    </select>
                </div>
            </div>

            <div className="two-field">
                <div className="field-to-select">
                    <p>Gender: </p>

                    <select
                        className='select-field'
                        name="gender"
                        value={profile.gender}
                        onChange={handleInputChange}
                        // disabled={!isEditable}
                        // style={{ color: isEditable ? '#000000' : '#a8a8a8' }}
                        disabled={isDisable}
                        style={{ color: isDisable ? '#a8a8a8' : '#000000' }}
                    >
                        {!hasSelectedGender && <option value="">Choose gender</option>}
                        <option value="boy">Boy</option>
                        <option value="girl">Girl</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div>

                <div className="field-to-select">
                    <p>Material: </p>

                    <select
                        className='select-field'
                        name="material"
                        value={profile.material}
                        onChange={handleInputChange}
                        // disabled={!isEditable}
                        // style={{ color: isEditable ? '#000000' : '#a8a8a8' }}
                        disabled={isDisable}
                        style={{ color: isDisable ? '#a8a8a8' : '#000000' }}
                    >
                        {!hasSelectedMaterial && <option value="">Choose material</option>}
                        <option value="wood">Wood</option>
                        <option value="plastic">Plastic</option>
                    </select>
                </div>
            </div>

            <div className="two-field">
                <div className="field-to-select">
                    <p>Type: </p>

                    <select
                        className='select-field'
                        name="type"
                        value={profile.type}
                        onChange={handleInputChange}
                        // disabled={!isEditable}
                        // style={{ color: isEditable ? '#000000' : '#a8a8a8' }}
                        disabled={isDisable}
                        style={{ color: isDisable ? '#a8a8a8' : '#000000' }}
                    >
                        {!hasSelectedType && <option value="">Choose type</option>}
                        <option value="lego">Lego</option>
                        <option value="puzzle">Puzzle</option>
                        <option value="doll">Doll</option>
                    </select>
                </div>

                <div className="field-to-select">
                    <p>Made In: </p>

                    <select
                        className='select-field'
                        name="toyOrigin"
                        value={profile.toyOrigin}
                        onChange={handleInputChange}
                        // disabled={!isEditable}
                        // style={{ color: isEditable ? '#000000' : '#a8a8a8' }}
                        disabled={isDisable}
                        style={{ color: isDisable ? '#a8a8a8' : '#000000' }}
                    >
                        {!hasSelectedMadeIn && <option value="">Choose origin</option>}
                        <option value="china">China</option>
                        <option value="canada">Canada</option>
                        <option value="usa">USA</option>
                        <option value="france">France</option>
                        <option value="vietnam">Vietnam</option>
                        <option value="japan">Japan</option>
                        <option value="russia">Russia</option>
                        <option value="thai">Thai</option>
                        <option value="korea">Korea</option>
                        <option value="england">England</option>
                    </select>
                </div>
            </div>

            <div className="btn">
                {/* <button onClick={toggleEdit}>
                    {isEditable ? "Save Profile" : "Update Profile"}
                </button> */}
                {!isDisable && (kid ?
                    <button onClick={handleUpdateKidProfile}>Update Profile</button>
                    :
                    <button onClick={handleCreateKidProfile}>Create Profile</button>
                )}
            </div>
        </div>
    )
}
