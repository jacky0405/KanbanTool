package com.jackyCode.jackyKanban.services;

import com.jackyCode.jackyKanban.domain.User;
import com.jackyCode.jackyKanban.exception.UsernameExistException;
import com.jackyCode.jackyKanban.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User user) {
        try{
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            // do not persist or show confirmPassword
            user.setConfirmPassword("");
            return userRepository.save(user);
        }catch(Exception e){
            throw new UsernameExistException("Username " + user.getUsername() + " already exists");
        }
    }

}
