import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    const year = new Date().getFullYear();
    return (


        <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0">
                        <Image src="/images/logo.png" alt='logo' height={70} width={100} />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Darecorp</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <Link href="/contact" className="hover:underline">Contact</Link>
                        </li>
                        <li>
                            <Link href="/societies" className="hover:underline">Societes</Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {year} <a href="https://darecorp.org/" className="hover:underline">Darecorp</a>. Tous Droits Réservés.</span>
            </div>
        </footer>



    )
}

export default Footer