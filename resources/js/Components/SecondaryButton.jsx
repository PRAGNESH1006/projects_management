import React from 'react';
import clsx from 'clsx';

export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled = false,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={clsx(
                'inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out',
                'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                {
                    'opacity-25 cursor-not-allowed': disabled, 
                    'hover:bg-gray-100': !disabled, 
                },
                className
            )}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
