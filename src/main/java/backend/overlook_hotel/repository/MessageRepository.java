package backend.overlook_hotel.repository;

import backend.overlook_hotel.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MessageRepository extends JpaRepository<Message, UUID> {
//    List<Message> findByClientId(UUID clientId);
//    List<Message> findByProfileId(UUID profileId);
//    List<Message> findByEvaluation(int evaluation);
}
