package backend.overlook_hotel.service;

import backend.overlook_hotel.model.Absence;
import backend.overlook_hotel.repository.AbsenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AbsenceService {

    @Autowired
    private AbsenceRepository absenceRepository;

    public List<Absence> getAllAbsences() {
        return absenceRepository.findAll();
    }

    public Optional<Absence> getAbsenceById(UUID id) {
        return absenceRepository.findById(id);
    }

    public List<Absence> getAbsencesByIdProfil(UUID idProfil) {
        return absenceRepository.findByIdProfil(idProfil);
    }

    public Absence createAbsence(Absence absence) {
        return absenceRepository.save(absence);
    }

    public Absence updateAbsence(UUID id, Absence updatedAbsence) {
        return absenceRepository.findById(id).map(absence -> {
            absence.setType(updatedAbsence.getType());
            absence.setStartDate(updatedAbsence.getStartDate());
            absence.setEndDate(updatedAbsence.getEndDate());
            absence.setCancel(updatedAbsence.isCancel());
            absence.setIdProfil(updatedAbsence.getIdProfil());
            return absenceRepository.save(absence);
        }).orElse(null);
    }

    public void deleteAbsence(UUID id) {
        absenceRepository.deleteById(id);
    }
}
