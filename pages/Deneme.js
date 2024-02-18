// components/MyButton.js
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; 
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Link from 'next/link';

const MyButton = () => {

    const router = useRouter();

    const user = useSelector((state) => state.user);


    useEffect(() => {
        console.log("isauth:",user)
        if (!user.id) {
        console.log("push")
        }else{
        console.log("else")
        }
        
    }, [user]);

    const sendBulten = async () => {
        const bultenId = 18;  // Göndermek istediğiniz bültenin ID'si

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/appname/bultenler/send_bulten/', {
                bulten_id: bultenId
            });

            console.log('Bülten gönderildi:', response.data);
        } catch (error) {
            console.error('Bülten gönderme hatası:', error);
        }
    };

    const panel= () =>{
        router.push('/Yayinlar/Brosurler');
    }




    return (

        <>
    
            <button onClick={sendBulten}>Bülteni Gönder</button>;

            <button onClick={panel}>Panel</button>;

            <div>bosluk-------------------</div>

            <Link href={'/Yayinlar/Brosurler'}>
                link
            </Link>


        </>
    )
    
    
}

export default MyButton;

