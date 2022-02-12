package com.jackyCode.jackyKanban.exception;

public class UsernameExistResponse {

    private String username;

    public UsernameExistResponse(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
