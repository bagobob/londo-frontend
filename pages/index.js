import Wrapper from "@/components/Wrapper";
import React from "react";
import { fetchDataFromApi } from "@/utils/api";
import Head from "next/head";
import Card from "@/components/Card";


export default function Home({ items }) {
    return (
        <>
            <Head>
                <title>Dare Enterprise</title>
                <meta
                    name="description"
                    content="Catalogue d'entreprise du pays"
                />
            </Head>
            <div className=" w-full md:py-20 relative">
                <Wrapper>
                    <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
                        <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                            Notre catalogue d'entreprise
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
                        {items?.data.map((item) => (
                            <Card key={item?.id} data={item} />
                        ))}
                    </div>
                </Wrapper>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const items = await fetchDataFromApi(`/api/societies?populate=*`);

    return {
        props: { items },
    };
}