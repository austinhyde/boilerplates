package jsonapi

import (
	"context"
	"net"
	"net/http"
	"time"

	"github.com/rs/zerolog"
)

func Serve(ctx context.Context, log *zerolog.Logger, hostport string, server *JsonAPIServer) error {
	// httpLogger will log requests and responses to the console
	logger := httpLogger(log)

	httpserver := http.Server{
		Addr:    hostport,
		Handler: logger(server.GetHandler()),

		// the context for the entire listener - just use the parent context
		BaseContext: func(net.Listener) context.Context {
			return ctx
		},

		// set some basic timeouts
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}
	return httpserver.ListenAndServe()
}
