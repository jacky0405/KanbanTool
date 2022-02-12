package com.jackyCode.jackyKanban.repository;

import com.jackyCode.jackyKanban.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    User findByUsername(String name);
    User getById(Long id);

}
