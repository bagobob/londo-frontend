import React from 'react';
import Image from "next/image";
import Link from "next/link";

const Card = ({ data: { attributes: p, id } }) => {
    return (
        <div className='m-auto w--full md:w-[80%]'>
            <div className='flex items-center justify-center'>
                <Link
                    href={`/society/${p.slug}`}
                    className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
                >
                    <Image
                        width={500} height={500}
                        src={p.logo?.data?.attributes?.url}
                        alt={p.name} priority
                        className='object-contain'
                        
                    />
                </Link>
            </div>
            <div className="p-4 text-black/[0.9]">
                <h2 className="text-lg font-medium">{p.name}</h2>
                <h3>{p.description}</h3>
            </div>
        </div>
    )
}

export default Card