import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

export default function RenderAfterNaverMap({ children }) {
    const dispatch = useDispatch();
    useEffect(() => {

    }, [])
    return (
        <>
            {children}
        </>
    )
}
