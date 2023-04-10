import React, { useState,useEffect } from 'react';

const contextData = React.createContext({
    data : [],
    onCreate : () => {},
    onRead : () => {},
    onUpdate : () => {},
    onDelete : () => {},
})

export default contextData;


