import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { API_ROUTES } from '../../../../utils/constants';

export default function Kategori() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(API_ROUTES.VIDEO_GALERI_KATEGORI_ACTIVE)
      .then(response => {
        setItems(response.data);
        console.log("res:",response.data)
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {items.map((item) => (
        <div key={item.id} style={{ margin: '10px', border: '1px solid #ddd', padding: '10px', width: '300px' }}>
          <img src={item.kapak_fotografi} alt={item.baslik} style={{ width: '100%', height: 'auto' }}/>
          <Link href={`/medyagaleri/videogaleri/kategori/${item.slug}`}>
            <h5>{item.baslik}</h5>
          </Link>
        </div>
      ))}
    </div>
  );
}
