package com.jackyCode.jackyKanban.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UsernameExistException extends RuntimeException {

    public UsernameExistException(String message) {
        super(message);
    }
}
