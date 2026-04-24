package com.temariflow.repository;
import com.temariflow.entity.Book; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface BookRepository extends JpaRepository<Book, UUID> { List<Book> findBySchoolId(UUID schoolId); }
