package com.temariflow.repository;
import com.temariflow.entity.BookBorrow; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface BookBorrowRepository extends JpaRepository<BookBorrow, UUID> { List<BookBorrow> findBySchoolId(UUID schoolId); }
