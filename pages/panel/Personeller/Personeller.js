import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function Personeller() {
    const [selectedFile, setSelectedFile] = useState(null);

    const getPersoneller=async ()=>{

        

        // get endpointi. ne kadar personel var ise listelenir. tabi pagination olduğundan
        // dolayı 10'ar şeklinde geliyor.
        // http://127.0.0.1:8000/api/appname/personeller/?page=1/  ilk 10 veri 
        // http://127.0.0.1:8000/api/appname/personeller/?page=2/  ikinci 10 veri 
        const response= await axios.get("http://127.0.0.1:8000/api/appname/personeller/")
        //console.log("response",response.data)
        console.log("personeller",response.data.results)
    }

    useEffect(()=>{
        getPersoneller()
    },[])



    // post endpoint

    //<input type="file" onChange={handleFileChange} />

    // burada temsili olarak görsel dosya girdisi kurdum

    // handleFileChange fonksiyonu ile girilen dosyayı nasıl backende gönderecek hale
    // getirilmesi gerektiğini gösterdim

    // burada temsili post butonu oluşturdum. 
    // <button onClick={handleClick}>Butona Bas</button>
    // tabi statik. maksat post endpointi nasıl kullandığımız. 
    // handleClick fonksiyonunda nasıl kullandığımızı göreceksin.

    // ad veriis soayd verisi unvan verisi varsa görsel verisi istiyorum. birde
    // personel_turu_id verisi istiyorum. personel_turu bir nesne doğrudan bana onu
    // gönderemiyorsun onun id'sini göndermen benim için yetiyor ben daha sonra id ile
    // backendde onu yakalıyorum..




    const handleClick = async () => {
        const formData = new FormData();
        formData.append('ad', 'Talha');
        formData.append('soyad', 'Esinti');
        formData.append('unvan', 'Profesör Doktor');
        formData.append('personel_turu_id', '44');  // veritabanımda bilim kurulu adlı personeltürü id 44 olduğu için 44 giriyorum
        formData.append('img', selectedFile);
        formData.append('durum', true);
        const response= await axios.post("http://127.0.0.1:8000/api/appname/personeller/",formData)
        console.log("res:",response)
      };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        console.log("img:",selectedFile)
        
    };


    // update endpoint

    // http://127.0.0.1:8000/api/appname/personeller/id/"
    // yukarıdaki id'i personelin id'sini temsil ediyor. güncelleme işlemini hangi personel için
    // yapmak istediğini buraya gireceğin id ile belirliyorsun.

    // update de zorunlu alanlar var. ad,soyad,personel_turu_id, gibi. hangi alanı güncelllersen 
    // güncelle bunları da göndermek zorundasın. sen tüm alanları gönder, değiştirmediğin
    // alanları dahi, hiç kafa karışıklığı olmasın.



    const handleUpdateClick = async () => {
        try {
          const formData01 = new FormData();
          formData01.append('ad', 'Talha03');
          formData01.append('soyad', 'Esinti');
          formData01.append('unvan', 'Profesör Doktor');
          formData01.append('personel_turu_id', '44');
          formData01.append('img', selectedFile);  // ön yüzde, dosya seç inputuna, öncelikle bir görsel girmen lazım ki buradaki teste de hata dönmesin. selectedFile state sine veriyi oradan çekiyoruz çünkü.
          formData01.append('durum', true);
          
          const response = await axios.put("http://127.0.0.1:8000/api/appname/personeller/4/", formData01);
          console.log("res01:", response.data);  // Assuming response data contains useful information
        } catch (error) {
          console.error("Error updating data:", error);
          // Inspect the error object for more details
        }
    };

    // delete endpoint

    // biz backend den veri silmiyoruz. her verinin is_removed adında alanı var.
    // verileri getirirken bu alanın değerinin false olanlarını getiriyoruz.
    // bu alanı True yapmamız demek bir anlamda silmek manası taşıyacak.

    // bu işlem için yazdığım end point
    // http://127.0.0.1:8000/api/appname/personeller/bulk_soft_delete/
    // bu endpointe post isteği atacaksın ve
    // bir liste ile birlikte işlemi sağlayacaksın.
    // bu liste silmek istediğin personelin yada personellerin id'sini bulunduracak.
    // tek koşul var string biçiminde göndermeni istiyorum. ["5","7"] şeklinde
    // aşağıda uygulamalı örnek mevcut. 
    // tek personeli silecek olsan dahi liste içinde göndereceksin.


    const handleDeleteClick = async () => {
        const selectedIds = ["4"];
        const res = await axios.post('http://127.0.0.1:8000/api/appname/personeller/bulk_soft_delete/', { ids: selectedIds });
        console.log("resdelete:", res);
    };
    

    






    return(
        <>
            <div>personeller</div>

            <input type="file" onChange={handleFileChange} />


            <button onClick={handleClick}>Butona Bas-post</button>

            <button onClick={handleUpdateClick}>Butona Bas-update</button>

            <button onClick={handleDeleteClick}>Butona Bas-delete</button>
        </>
    )
}