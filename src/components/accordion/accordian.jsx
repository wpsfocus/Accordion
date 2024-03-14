import React from 'react'
import { useState } from 'react'
import data from './data'
import './styles.css'

export default function Accordion() {
    const [selected, setSelected] = useState(null)
    const [multiple, setSelectedMultiple] = useState([])
    const [isMultipleEnabled, setisMultipleEnabled] = useState(false)

    function handleSingleSelection(currentId) {
        setSelected(currentId === selected ? null : currentId)
    }

    function handleMultipleSelection(currentId) {
        let copyMultiple = [...multiple]
        const findIndexCurrentId = copyMultiple.indexOf(currentId)
        if (findIndexCurrentId === -1) {
            copyMultiple.push(currentId)
        } else {
            copyMultiple.splice(findIndexCurrentId, 1)
        }
        setSelectedMultiple(copyMultiple)
    }

    return (
        <section className='wrapper'>
            <div className='accordion'>
                <button onClick={() => setisMultipleEnabled(!isMultipleEnabled)}
                className={!isMultipleEnabled ? 'disabled' : 'enabled'}>
                    <h3>{isMultipleEnabled ? 'Multiple Selection Enabled' : 'Enable Multiple Selection'}</h3>
                </button>

                {
                    data && data.length > 0 ?
                        data.map(dataItem =>
                            <div className='item' key={dataItem.id}>
                                <div onClick={isMultipleEnabled ? () => handleMultipleSelection(dataItem.id) : () => handleSingleSelection(dataItem.id)}
                                    className='title' style={{ 'borderBottom': selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1 ? '1px solid lightgray' : 'none' }}>
                                    <h3>{dataItem.name}</h3>
                                    <span>+</span>
                                </div>
                                { isMultipleEnabled ? multiple.indexOf(dataItem.id) !== -1 && (
                                    <div className='about'><p>{dataItem.about}</p></div>
                                )
                                    : selected === dataItem.id && (
                                        <div className='about'><p>{dataItem.about}</p></div>
                                )}

                            </div>
                        )
                        : <div>No data found.</div>
                }
            </div>
        </section>
    )
}