import { useEffect, useState } from "react";
import "./Reservas.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Reservas = () => {
  const [reservations, setReservations] = useState([]);

  const fetchAllReservations = async () => {
    try {
      const response = await axios.get(
        "https://backend-central-production-f267.up.railway.app/api/reservation"
      );
      if (response.data.success) {
        // Cambié `response.reservations.success` por `response.data.success`
        setReservations(response.data.reservations.reverse()); // Cambié `response.reservations.data` por `response.data.reservations`
      } else {
        toast.error("Error al obtener las reservas");
      }
    } catch (error) {
      toast.error("Error en la conexión con el servidor");
    }
  };

  useEffect(() => {
    fetchAllReservations();
  }, []);

  return (
    <div className="reservation add">
      <h3>Página de Reservas</h3>
      <div className="reservation-list">
        {reservations.map((reservation, index) => (
          <div key={index} className="reservation-item">
            <img
              src={assets.reser_icon}
              alt=""
              className="reservation-item-icon"
            />
            <div>
              <p className="reservation-item-name">{reservation.name}</p>
              <p className="reservation-item-email">{reservation.email}</p>
              <p className="reservation-item-phone">{reservation.phone}</p>
              <p className="reservation-item-date">
                {new Date(reservation.date).toLocaleDateString()} a las{" "}
                {reservation.time}
              </p>
              <p className="reservation-item-guests">
                Número de invitados: {reservation.guests}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservas;
