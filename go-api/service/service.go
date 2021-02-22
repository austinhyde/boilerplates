package service

import (
	"fmt"
	"time"

	"github.com/austinhyde/myproject/types"

	"github.com/rs/zerolog"
)

type Service struct {
	log *zerolog.Logger
}

// ensure it conforms to the interface
var _ types.Service = &Service{}

func NewService(log *zerolog.Logger) *Service {
	return &Service{
		log: log,
	}
}

func (s *Service) GetThings() ([]*types.Thing, error) {
	return []*types.Thing{
		&types.Thing{
			ID:        "123",
			Name:      "Thing One",
			CreatedAt: time.Now().Add(-10 * time.Minute),
		},
	}, nil
}

func (s *Service) DoThing(thing *types.Thing) error {
	return &types.ValidationError{fmt.Sprintf("Invalid thing name: %q", thing.Name)}
}
