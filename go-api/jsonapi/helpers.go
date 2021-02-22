package jsonapi

import (
	"net/http"

	"github.com/austinhyde/myproject/types"
)

func fail(err error) response {
	status := http.StatusInternalServerError
	// Add more error types here
	switch err.(type) {
	case *types.ValidationError, *jsonError:
		status = http.StatusBadRequest
	}

	return &jsonResponse{
		Status:  status,
		Success: status < 400,
		Data:    nil,
		Error:   err.Error(),
	}
}

func ok(data interface{}) response {
	return &jsonResponse{
		Status:  http.StatusOK,
		Success: true,
		Data:    data,
		Error:   "",
	}
}

func maybe(err error) response {
	if err != nil {
		return fail(err)
	}
	return ok(nil)
}

type jsonError struct {
	error
}

func jsonErr(err error) error {
	if err == nil {
		return nil
	}
	return &jsonError{err}
}
