'use client'
import React from "react";
import styled from "styled-components";

interface ButtonProps {
    label: string;
    onClick: (e: React.FormEvent) => void;
};

const StyledButton = styled.button<{ ghost?: boolean }>`
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background-color: #FF4B2B;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;

    &:active {
        transform: scale(0.95);
    }

    &:focus {
        outline: none;
    }
`;

export default function Button({ label, onClick }: ButtonProps): React.ReactElement {
    return (
        <StyledButton onClick={onClick}>
            {label}
        </StyledButton>
    );
}
