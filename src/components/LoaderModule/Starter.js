import React from 'react';
import './Starter.scss';

const Starter = () => {
    const styleStart = {
        stopColor: '#0994F2',
        stopOpacity: 1
    };
    const styleEnd = {
        stopColor: '#F8635A',
        stopOpacity: 1
    };
    return (
        <div className="c-starter">
            <svg>
                <g>
                    <path d="M 50,100 A 1,1 0 0 1 50,0" />
                </g>
                <g>
                    <path d="M 50,75 A 1,1 0 0 0 50,-25" />
                </g>
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={styleStart} />
                        <stop offset="100%" style={styleEnd} />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export default Starter;
