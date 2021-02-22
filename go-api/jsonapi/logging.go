package jsonapi

import (
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/zerolog"
)

type statusWriter struct {
	http.ResponseWriter
	firstByteAt time.Time
	statusCode  int
	bodyBytes   int
}

func (self *statusWriter) WriteHeader(statusCode int) {
	if self.firstByteAt.IsZero() {
		self.firstByteAt = time.Now()
	}
	self.statusCode = statusCode
	self.ResponseWriter.WriteHeader(statusCode)
}

func (self *statusWriter) Write(d []byte) (int, error) {
	n, err := self.ResponseWriter.Write(d)
	self.bodyBytes += n
	return n, err
}

func httpLogger(log *zerolog.Logger) mux.MiddlewareFunc {
	return func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			start := time.Now()
			sw := &statusWriter{ResponseWriter: w}
			h.ServeHTTP(sw, r)
			log.Info().
				Dur("total", time.Since(start)).
				Dur("ttfb", sw.firstByteAt.Sub(start)).
				Int("status", sw.statusCode).
				Int("body_bytes", sw.bodyBytes).
				Str("path", r.URL.Path).
				Msg("served request")
		})
	}
}
