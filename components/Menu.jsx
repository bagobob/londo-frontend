import React from 'react'
import Link from "next/link";

const data = [
    { id: 1, name: "Acceuil", url: "/" },
    { id: 2, name: "Societes", url: "/societies" },
    { id: 3, name: "Contact", url: "/contact" },
];


const Menu = () => {
    return (
        <ul className="hidden md:flex items-center gap-8 font-medium text-black">
            {data && data.map((item) => (
                <React.Fragment key={item.id}>
                    <li className='cursor-pointer'>
                        <Link href={item.url}>
                            {item.name}
                        </Link>
                    </li>
                </React.Fragment>
            ))}
        </ul>
    )
}

export default Menu