package org.studench.backend.exceptions;

public class IncorrectLoginDataException extends RuntimeException {
    public IncorrectLoginDataException(String message) {
        super(message);
    }
}
