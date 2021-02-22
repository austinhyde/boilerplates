package main

import (
	"context"
	"os"

	"github.com/alexflint/go-arg"
	"github.com/rs/zerolog"

	"github.com/austinhyde/myproject/jsonapi"
	"github.com/austinhyde/myproject/service"
)

func main() {
	var args struct {
		HostPort  string `arg:"positional,required"`
		IsDev     bool   `arg:"-d"`
		IsVerbose bool   `arg:"-v"`
	}
	arg.MustParse(&args)

	var logger zerolog.Logger
	if args.IsDev {
		logger = zerolog.New(zerolog.NewConsoleWriter()).With().Timestamp().Logger().Level(zerolog.DebugLevel)
	} else {
		logger = zerolog.New(os.Stdout).With().Timestamp().Logger().Level(zerolog.InfoLevel)
	}
	if args.IsVerbose {
		logger = logger.Level(zerolog.TraceLevel)
	}

	// the service is the core, it actually does everything
	service := service.NewService(&logger)
	// the server is responsible for converting json/http (in this case) to service calls
	// alternative implementations (TODO) could use GRPC or GraphQL or SOAP or whatever
	server := jsonapi.NewServer(&logger, service)

	ctx := context.Background()
	logger.Info().Str("hostport", args.HostPort).Msg("starting http server")
	logger.Warn().Err(jsonapi.Serve(ctx, &logger, args.HostPort, server)).Msg("http server shutdown")
}
