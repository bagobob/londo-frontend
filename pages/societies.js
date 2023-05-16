import Wrapper from "@/components/Wrapper";
import React, { useState } from "react";
import { fetchDataFromApi } from "@/utils/api";
import Head from "next/head";
import useSWR from "swr";
import Card from "@/components/Card";

const maxResult = 6;

const Societies = ({ items }) => {
    const [pageIndex, setPageIndex] = useState(1);

    const { data, error, isLoading } = useSWR(
        `/api/societies?populate=*&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
        fetchDataFromApi,
        {
            fallbackData: items,
        }
    );
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
                            Retrouvez toutes les entreprises ici
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
                        {data?.data.map((item) => (
                            <Card key={item?.id} data={item} />
                        ))}
                    </div>
                    {/* PAGINATION BUTTONS START */}
                    {data?.meta?.pagination?.total > maxResult && (
                        <div className="flex gap-3 items-center justify-center my-16 md:my-0">
                            <button
                                className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                                disabled={pageIndex === 1}
                                onClick={() => setPageIndex(pageIndex - 1)}
                            >
                                Previous
                            </button>

                            <span className="font-bold">{`${pageIndex} of ${data && data.meta.pagination.pageCount
                                }`}</span>

                            <button
                                className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                                disabled={
                                    pageIndex ===
                                    (data && data.meta.pagination.pageCount)
                                }
                                onClick={() => setPageIndex(pageIndex + 1)}
                            >
                                Next
                            </button>
                        </div>
                    )}
                    {/* PAGINATION BUTTONS END */}
                    {isLoading && (
                        <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">

                            <span className="text-2xl font-medium">Loading...</span>
                        </div>
                    )}
                </Wrapper>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const items = await fetchDataFromApi(`/api/societies?populate=*&pagination[page]=1&pagination[pageSize]=${maxResult}`);

    return {
        props: { items },
    };
}

export default Societies