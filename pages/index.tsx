import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
const DynamicMain = dynamic(() => import('../src/main'), {
  suspense: true,
  ssr: false
})

const IndexPage = ({}) => {
  return (
    <Suspense fallback={`Loading...`}>
      <Head>
        <title>Contamy Nation</title>
      </Head>
      <DynamicMain />
    </Suspense>
  );
};

export default IndexPage;
