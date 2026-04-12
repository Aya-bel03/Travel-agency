import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getReservations, getCurrentUser } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Reservations = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // useRef باش نضمنو بلي الطلب ما يصرى حتى يعاود يتريندار الـ component
  const isFetched = useRef(false);

  useEffect(() => {
    const user = getCurrentUser();

    if (!user) {
      navigate('/login');
      return;
    }

    // هاد الشرط هو اللي يحبس الـ 4000 طلب
    if (isFetched.current) return;

    const loadData = async () => {
      try {
        setIsLoading(true);
        console.log("الطلب راهو يروح دركا لـ userId:", user.id);
        const data = await getReservations(user.id);
        
        if (data.success) {
          setReservations(data.reservations || []);
          isFetched.current = true; // نمركيو بلي جبنا البيانات خلاص
        }
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

    // المصفوفة الفارغة [] هي أهم حاجة باش يحبس الـ Loop
  }, [navigate]); 

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <LoadingSpinner />
        <p className="mt-4">Chargement de vos réservations...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Mes Réservations ({reservations.length})</h1>
      {reservations.length === 0 ? (
        <p>Aucune réservation trouvée.</p>
      ) : (
        <div className="grid gap-4">
          {reservations.map((res) => (
            <div key={res.id} className="p-4 border rounded shadow-sm bg-white">
              <h3 className="font-bold">{res.destination}</h3>
              <p className="text-sm text-gray-500">{res.date_depart}</p>
              <p className="text-emerald-600 font-bold">{res.prix_total} DZD</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reservations;