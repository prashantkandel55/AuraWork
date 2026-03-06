import React from 'react';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: 'sm' | 'md';
}
export declare const Button: React.FC<ButtonProps>;
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
}
export declare const Card: React.FC<CardProps>;
export declare const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>>;
export declare const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement>>;
