'use client'
import React from "react";
import styled from "styled-components";

interface InputProps {
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledInput = styled.input`
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
`;

export default function Input({ type, onChange, name, value }: InputProps): React.ReactElement {
    return (
        <StyledInput type={type} onChange={onChange} name={name} value={value} />
    );
}
