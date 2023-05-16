import Wrapper from '@/components/Wrapper';
import { fetchDataFromApi } from '@/utils/api';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react'

const SocietyDetail = ({ item }) => {
    const society = item?.data?.[0]?.attributes;
    return (
        <>
            <Head>
                <title>{society.name}|Dare Enterprise</title>
                <meta
                    name="description"
                    content={society.description}
                />
            </Head>
            <div className='w-full md:py-20'>
                <Wrapper>
                    <div className='flex flex-col md:px-10 gap-[50px] lg:gap-[100px] mx-auto items-center justify-center'>
                        <h1 className='text-[34px] font-semibold mb-1 leading-tight'>
                            {society.name}
                        </h1>
                        <Image
                            className='rounded-lg'
                            src={society.logo?.data?.attributes?.url}
                            alt={society.name}
                            width={"800"}
                            height={"1200"}
                            priority
                        />
                        <div>
                            {society.description}
                        </div>
                        <div className='flex flex-col items-center'>
                            <p className="mr-2 text-lg font-semibold">
                                Numéro Principal :{society.principal_phone}
                            </p>
                            {society.secondary_phone && (
                                <p className="text-base font-medium">
                                    Numéro Secondaire : {society.secondary_phone}
                                </p>
                            )}
                            <p className="mr-2 text-lg font-semibold">
                                Email :{society.email}
                            </p>
                            <p className="mr-2 text-lg font-semibold">
                                Site web :{society.website}
                            </p>
                            {society.facebook_link && (
                                <p className="mr-2 text-lg font-semibold">
                                    Facebook Link :{society.facebook_link}
                                </p>
                            )}

                        </div>
                    </div>
                </Wrapper>
            </div>
        </>
    )
}

export default SocietyDetail


export async function getStaticPaths() {
    const items = await fetchDataFromApi("/api/societies?populate=*");
    const paths = items?.data?.map((p) => ({
        params: {
            slug: p.attributes.slug,
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params: { slug } }) {
    const item = await fetchDataFromApi(
        `/api/societies?populate=*&filters[slug][$eq]=${slug}`
    );

    return {
        props: {
            item,
        },
    };
}