package jsonapi

import (
	"encoding/json"
	"net/http"
)

type response interface {
	WriteTo(w http.ResponseWriter) error
}

type jsonResponse struct {
	Status  int         `json:"-"`
	Success bool        `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}

func (r *jsonResponse) WriteTo(w http.ResponseWriter) error {
	d, err := json.Marshal(r)
	if err != nil {
		return err
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(r.Status)
	_, err = w.Write(d)
	return err
}
