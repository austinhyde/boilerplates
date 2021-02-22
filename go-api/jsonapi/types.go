package jsonapi

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/austinhyde/myproject/types"
)

type OutputThing struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	CreatedAt string `json:"created_at"`
}

func OutputThingFromThing(thing *types.Thing) OutputThing {
	return OutputThing{
		ID:        thing.ID,
		Name:      thing.Name,
		CreatedAt: thing.CreatedAt.Format(time.RFC1123Z),
	}
}

func OutputThingsFromSlice(things []*types.Thing) []OutputThing {
	out := make([]OutputThing, len(things))
	for i, thing := range things {
		out[i] = OutputThingFromThing(thing)
	}
	return out
}

type InputThing struct {
	Name string `json:"name"`
}

func ReadInputThing(r *http.Request) (InputThing, error) {
	t := InputThing{}
	err := json.NewDecoder(r.Body).Decode(&t)
	return t, jsonErr(err)
}

func (t *InputThing) ToThing() *types.Thing {
	return &types.Thing{
		Name: t.Name,
	}
}
