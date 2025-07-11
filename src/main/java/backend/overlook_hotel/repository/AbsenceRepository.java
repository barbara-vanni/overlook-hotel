package backend.overlook_hotel.repository;

import backend.overlook_hotel.model.Absence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AbsenceRepository extends JpaRepository<Absence, UUID> {
//    List<Absence> findByProfileId(UUID profileId);
    List<Absence> findByIdProfil(UUID idProfil);
//    List<Absence> findByCancel(boolean cancel);
//    List<Absence> findByType(String type);
}
