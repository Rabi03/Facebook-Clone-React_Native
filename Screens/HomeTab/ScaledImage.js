import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Image } from "react-native";
import { ScreenStackHeaderRightView } from 'react-native-screens';

export default function ScaledImage(props) {
    const [width, setWidth] = useState(props.width)
    const [height,setHeight]=useState(props.height)
    useEffect(() => {
        Image.getSize(props.source, (width, height) => {
            if (props.width && !props.height) {
                setWidth(props.width)
                setHeight(height * (props.width / width))
                
            } else if (!props.width && props.height) {
                setWidth(width * (props.height / height))
                setHeight(props.height)
                
            } else {
                setWidth(width)
                setHeight(height)
            }
        });
    },[])
    return (
        <Image
                source={{uri:props.source}}
                style={{ height: height, width: width,...props.style }}
            />
    )
}
