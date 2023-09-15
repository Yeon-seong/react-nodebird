/* -------------------- 트위터 프로필 페이지 -------------------- */


import React from 'react';
import Head from 'next/head';

import AppLayout from '../components/AppLayout';

const Profile = () => {
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>내 프로필</AppLayout>
    </>
  );
}

export default Profile;