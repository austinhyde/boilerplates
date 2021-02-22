package jsonapi

import (
	"net/http"
)

func (s *JsonAPIServer) HandleGetThings(r *http.Request) response {
	things, err := s.service.GetThings()
	if err != nil {
		return fail(err)
	}
	return ok(OutputThingsFromSlice(things))
}

func (s *JsonAPIServer) HandleDoThing(r *http.Request) response {
	input, err := ReadInputThing(r)
	if err != nil {
		return fail(err)
	}
	return maybe(s.service.DoThing(input.ToThing()))
}
