import React from 'react';
import Link from "next/link";

const data = [
    { id: 1, name: "Acceuil", url: "/" },
    { id: 4, name: "Contact", url: "/contact" },
];

const MenuMobile = ({  setMobileMenu }) => {
    return (
        <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black">
            {data && data.map((item) => (
                <React.Fragment key={item.id}>
                    <li className='py-4 px-5 border-b'>
                        <Link href={item.url} onClick={() => setMobileMenu(false)}>
                            {item.name}
                        </Link>
                    </li>
                </React.Fragment>
            ))}
        </ul>
    )
}

export default MenuMobile