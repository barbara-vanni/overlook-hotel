package backend.overlook_hotel.service;

import backend.overlook_hotel.model.Payment;
import backend.overlook_hotel.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Optional<Payment> getPaymentById(UUID id) {
        return paymentRepository.findById(id);
    }

    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public Payment updatePayment(UUID id, Payment updated) {
        return paymentRepository.findById(id).map(payment -> {
            payment.setClient(updated.getClient());
            payment.setReservation(updated.getReservation());
            payment.setPrice(updated.getPrice());
            payment.setNumber(updated.getNumber());
            payment.setCvv(updated.getCvv());
            payment.setDate(updated.getDate());
            return paymentRepository.save(payment);
        }).orElse(null);
    }

    public void deletePayment(UUID id) {
        paymentRepository.deleteById(id);
    }
}
