import React from 'react';

interface LinkProps {
    href: string;
    children: React.ReactNode;
    ariaLabel?: string;
    className?: string;
}

const Link: React.FC<LinkProps> = ({ 
    href, 
    children, 
    ariaLabel, 
    className = "reservation-button" 
}) => {
    return (
        <a 
            className={className}
            aria-label={ariaLabel}
            href={href}
            style={{
                textDecoration: 'none',
                color: '#705816',
                padding: '10px 20px',
                borderBottom: '2px solid transparent',
                transition: 'border-bottom 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderBottom = '2px solid #705816';
                const arrow = e.currentTarget.querySelector('.arrow') as HTMLElement;
                if (arrow) arrow.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderBottom = '2px solid transparent';
                const arrow = e.currentTarget.querySelector('.arrow') as HTMLElement;
                if (arrow) arrow.style.opacity = '0';
            }}
        >
            {children}
            <span 
                className="arrow"
                style={{
                    opacity: '0',
                    transition: 'opacity 0.3s ease',
                    fontSize: '14px',
                }}
            >
                →
            </span>
        </a>
    );
};


export { Link };
export default Link;