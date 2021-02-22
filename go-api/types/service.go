package types

type Service interface {
	GetThings() ([]*Thing, error)
	DoThing(*Thing) error
}
