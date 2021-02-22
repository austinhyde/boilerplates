package types

type ValidationError struct {
	Message string
}

func (err *ValidationError) Error() string {
	return err.Message
}
