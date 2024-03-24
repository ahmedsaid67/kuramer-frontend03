import React, { useState, useEffect } from 'react';
import SurguluBanner from '../compenent/SurguluBanner'
import KitapSerileri from '../compenent/KitapSerileri'
import KuramerTv from '../compenent/KuramerTv'
import YayinlarimizdanSecmeler from '../compenent/YayinlarimizdanSecmeler'
import Temel from '../compenent/Temel';
import Musaf from '../compenent/Musaf';
import Popup from '../compenent/Pupup';

import Head from 'next/head';



function Index() {
  const [showPopup, setShowPopup] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000); // 5 saniye sonra aç



    return () => clearTimeout(timer);
  }, []);


  return (
    <>
    <Head>
      <title>Ana Sayfa - Kuramer</title>
      <link rel="icon" href="/kuramerlogo.png" />


    </Head>

     <SurguluBanner/>

     <KitapSerileri/>

     <Temel/>

     <div>
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}

    </div>

     <YayinlarimizdanSecmeler/>

     <Musaf/>

     <KuramerTv/>

     

 
    </>
  );
}

export default Index;