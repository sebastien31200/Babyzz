package com.seb.exceptions;

import java.net.URI;

import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class NotFoundExceptionMapper implements ExceptionMapper<NotFoundException> {
    @Override
    @Produces(MediaType.TEXT_HTML)
    public Response toResponse(NotFoundException exception) {
        return Response.temporaryRedirect(URI.create("/")).build();
    }
}