import React from 'react';

const Icons = ({setContent, content}) => {
    const reactions = [   
        '❤️', '😆', '😯', '😢', '😡', '👍', '👎', '😄',
        '😂', '😍', '😘', '😗', '😚', '😳', '😭', '😓',
        '😤', '🤤', '👻', '💀', '🤐', '😴', '😷', '😵'
    ]

    return (
        <div className="px-2 nav-item dropdown">
            <span role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="navbarDropdown" >
                <span className="opacity-60">😆</span>
            </span>
                
            <div aria-labelledby="navbarDropdown"
                className="dropdown-menu"
            >
                <div className="grid text-center cursor-pointer grid-cols-icons">
                    {
                        reactions.map(icon => (
                            <span key={icon} className="my-1" onClick={() => setContent(content + icon)}>
                                {icon}
                            </span>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Icons
