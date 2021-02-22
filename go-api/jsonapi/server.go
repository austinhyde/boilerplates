package jsonapi

import (
	"net/http"

	"github.com/gorilla/mux"

	"github.com/rs/zerolog"

	"github.com/austinhyde/myproject/types"
)

type JsonAPIServer struct {
	log     *zerolog.Logger
	service types.Service
}

func NewServer(log *zerolog.Logger, service types.Service) *JsonAPIServer {
	return &JsonAPIServer{
		log:     log,
		service: service,
	}
}

func (s *JsonAPIServer) GetHandler() http.Handler {
	m := mux.NewRouter()

	m.Methods("GET").Path("/get_things").Handler(s.wrap(s.HandleGetThings))
	m.Methods("POST").Path("/do_thing").Handler(s.wrap(s.HandleDoThing))

	return m
}

func (s *JsonAPIServer) wrap(handler func(*http.Request) response) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		err := handler(r).WriteTo(w)
		if err != nil {
			s.log.Error().Err(err).Msg("error while writing response")
		}
	})
}
